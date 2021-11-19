import create from "zustand";
import { withImmer } from "common/withImmer";

import type { Item } from "@db/prisma";
type ItemId = Item["id"];

export const useCartStore = create(
    withImmer({ cart: new Map<ItemId, { id: ItemId; amount: number }>() }, (set) => ({
        add: (itemId: ItemId, amount: number) =>
            set((draft) => {
                draft.cart.set(itemId, { id: itemId, amount });
            }),
        remove: (itemId: ItemId) =>
            set((draft) => {
                draft.cart.delete(itemId);
            }),
        clear: () =>
            set((draft) => {
                draft.cart.clear();
            }),
    }))
);
