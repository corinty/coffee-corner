import { getOpenOrders } from "@db/Order";
import { ICart } from "@modules/cart/hooks/cartAtom";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    res.json(await getOpenOrders());
};

export default handler;
