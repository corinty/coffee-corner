import prisma, { Item } from "@db/prisma";

export const getItems = async () => prisma.item.findMany();

export const getItemById = async (id: number) => prisma.item.findUnique({ where: { id } });

export const getItemByName = async (name: string) => prisma.item.findUnique({ where: { name } });

export const updateItem = async (id: number, data: Item) =>
    prisma.item.update({ where: { id }, data });
