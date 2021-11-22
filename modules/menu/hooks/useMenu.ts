import { atom, useAtom } from "jotai";
import { IMenu } from "@db/Menu";

const menuAtom = atom<IMenu>({ itemMap: {}, types: {} } as IMenu);
export const useMenu = () => useAtom(menuAtom);
