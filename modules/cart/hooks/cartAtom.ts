import { atomWithImmer } from "jotai/immer";
import type { ItemId } from "@db/Item";

export type ICart = { itemId: ItemId; quantity: number };

export type ICartMap = Map<ItemId, ICart>;

const cartAtom = atomWithImmer(new Map() as ICartMap);

export default cartAtom;
