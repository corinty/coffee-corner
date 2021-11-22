import { ItemId } from "@db/Item";
import prisma from "@db/prisma";
import { ICart } from "@modules/cart/hooks/cartAtom";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export type CreateCartBody = ICart[];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body) return res.status(400).send("Missing Body");
    const cart = req.body.reduce((acc, cur) => {
        const { itemId, quantity } = cur;

        for (let i = 0; i < quantity; i++) {
            acc.push({ itemId });
        }

        return acc;
    }, [] as { itemId: ItemId }[]);

    const newOrder = await prisma.order.create({
        data: {
            user: {
                connect: {
                    email: "corin.mchargue@test.com",
                },
            },
            items: {
                createMany: {
                    data: cart,
                },
            },
        },
        include: {
            _count: {
                select: { items: true },
            },
            items: {
                select: {
                    itemId: true,
                    done: true,
                },
            },
        },
    });

    res.json(newOrder);
};

export default handler;
