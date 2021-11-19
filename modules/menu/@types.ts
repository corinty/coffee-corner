import type { Item, ItemId } from "@db/Item";

export type IMenu = {
    types: { [itemType: string]: ItemId[] };
    itemMap: { [itemId: ItemId]: Item };
};
