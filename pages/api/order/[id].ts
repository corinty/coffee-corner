import { ItemId } from "@db/Item";
import { getOrderById } from "@db/Order";
import prisma from "@db/prisma";
import { ICart } from "@modules/cart/hooks/useCartStore";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export type CreateCartBody = ICart[];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    if (!id) res.status(400);

    res.json(await getOrderById(parseInt(id as string)));
};

export default handler;
