import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { Item } from "@db/prisma";
import { getSession } from "next-auth/react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const orders = await prisma.order.findMany({
        include: {
            user: {
                select: {
                    name: true,
                },
            },
            items: {
                select: {
                    item: {
                        select: {
                            name: true,
                            type: true,
                        },
                    },
                },
                where: {
                    done: true,
                },
            },
        },
    });

    switch (req.method) {
        case "POST": {
            const session = await getSession({ req });
            if (!session || !session?.user?.email) return res.status(400);

            const items = req.body.items.map((item: Item) => ({ itemId: item.id }));
            const order = await prisma.order.create({
                data: {
                    user: {
                        connect: {
                            email: session.user.email,
                        },
                    },
                    items: {
                        createMany: {
                            data: items as any,
                        },
                    },
                },
            });
            res.status(200).json(order);
        }
    }
};

export default handler;
