import prisma, { Item as PrismaItem } from "@db/prisma";

export type ItemId = Item["id"];
export type Item = PrismaItem;

export const getItems = async () => prisma.item.findMany();

export const getItemById = async (id: number) => prisma.item.findUnique({ where: { id } });

export const getItemByName = async (name: string) => prisma.item.findUnique({ where: { name } });

export const updateItem = async (id: number, data: Item) =>
    prisma.item.update({ where: { id }, data });
