import type { ItemId } from "@db/Item";
import { useCartStore } from "./useCartStore";

export const useInCart = (id: ItemId) => {
    const { cartMap } = useCartStore();
    return cartMap.has(id);
};
