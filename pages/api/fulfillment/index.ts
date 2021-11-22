import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { Item } from "@db/prisma";
import { getSession } from "next-auth/react";
import { getOpenOrders } from "@db/Order";
import { getMenuMap } from "@db/Menu";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    res.json({ orders: await getOpenOrders(), menuMap: await getMenuMap() });
};

export default handler;
