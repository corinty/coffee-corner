import { fulfillOrderItem } from "@db/OrderItem";
import prisma from "@db/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    if (!id) res.status(403).send("Missing OrderItem ID");
    try {
        const orderItem = await fulfillOrderItem(parseInt(id as string));
        res.json(orderItem);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
};

export default handler;
