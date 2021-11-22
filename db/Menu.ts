import { getItems } from "./Item";
import type { Item, ItemId } from "@db/Item";

export type IMenu = {
    types: { [itemType: string]: ItemId[] };
    itemMap: { [itemId: ItemId]: Item };
};

export const getMenu = async () => {
    const items = await getItems();

    return items.reduce(
        (map, item) => {
            const { id, type } = item;
            if (!map.types[type]) map.types[type] = [];
            map.types[type].push(id);
            map.itemMap[id] = item;

            return map;
        },
        { types: {}, itemMap: {} } as IMenu
    );
};

export const getMenuMap = async () => {
    const items = await getItems();
    return items.reduce((map, item) => {
        map[item.id] = item;
        return map;
    }, {} as { [itemId: ItemId]: Item });
};
