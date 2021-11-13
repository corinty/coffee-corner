// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
export * from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    console.log("in Prisma loop");

    if (!global.prisma) {
        console.log("creating new prisma");

        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;
