import prisma, { Order } from "@db/prisma";

export type OrderId = Order["id"];

export const getOrderById = async (id: OrderId) =>
    prisma.order.findUnique({
        where: { id },
        include: {
            items: {
                select: {
                    done: true,
                    item: {
                        select: {
                            name: true,
                            type: true,
                        },
                    },
                },
            },
        },
    });

export const getOpenOrders = async () =>
    prisma.order.findMany({
        where: {
            done: false,
        },
        include: {
            user: {
                select: {
                    name: true,
                },
            },
            items: {
                select: {
                    id: true,
                    done: true,
                    itemId: true,
                },
                orderBy: {
                    id: "desc",
                },
            },
        },
    });
