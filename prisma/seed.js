const { Item, PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const items = [
    { name: "Cortado", type: "COFFEE", description: "" },
    { name: "Vanilla Latte", type: "COFFEE", description: "" },
    { name: "Japaneese Bean Bun", type: "BAKEDGOOD", description: "" },
    { name: "Americano", type: "COFFEE", description: "A nice black coffee" },
    { name: "Vanilla Wafffer", type: "BAKEDGOOD", description: "A yummy vanilla waffer" },
];

(async function () {
    await prisma.user.create({
        data: { name: "Corin McHargue Test", email: "corin.mchargue@test.com" },
    });

    await prisma.item.createMany({ skipDuplicates: true, data: items });

    await prisma.order.create({
        data: {
            user: {
                connect: {
                    email: "corin.mchargue@test.com",
                },
            },
            items: {
                createMany: {
                    skipDuplicates: true,
                    data: [{ itemId: 2 }, { itemId: 3 }, { itemId: 1 }],
                },
            },
        },
    });
})();
