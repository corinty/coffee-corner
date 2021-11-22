import type { Item, ItemId } from "@db/Item";
import { useAtom } from "jotai";
import cartAtom from "./cartAtom";

export const useCartStore = () => {
    const [cart, set] = useAtom(cartAtom);
    return {
        cart: Array.from(cart.values()),
        cartMap: cart,
        add: (itemId: ItemId, quantity: number) =>
            set((cart) => {
                cart.set(itemId, { itemId, quantity });
            }),
        remove: (itemId: ItemId) =>
            set((cart) => {
                cart.delete(itemId);
            }),
        clear: () =>
            set((cart) => {
                cart.clear();
            }),
    };
};
