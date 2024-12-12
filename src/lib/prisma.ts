// src/lib/prisma.ts

import { PrismaClient } from '@prisma/client';

declare global {
    // Dette hindrer Prisma Client fra å bli opprettet flere ganger under utvikling
    var prisma: PrismaClient | undefined;
}

export const prisma =
    global.prisma ||
    new PrismaClient({
        log: ['query'],
    });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
