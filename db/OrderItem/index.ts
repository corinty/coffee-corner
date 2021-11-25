export type { OrderItem } from "@db/prisma";

import prisma from "@db/prisma";
import type { OrderItem } from "@db/prisma";

export type OrderItemId = OrderItem["id"];

export const fulfillOrderItem = async (id: OrderItemId) => {
    const { order, ...orderItem } = await prisma.orderItem.update({
        where: {
            id,
        },
        data: {
            done: true,
        },
        include: {
            order: {
                include: {
                    items: {
                        where: {
                            done: false,
                        },
                    },
                },
            },
        },
    });
    if (order.items.length == 0) {
        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                done: true,
            },
        });
    }
    return orderItem;
};
