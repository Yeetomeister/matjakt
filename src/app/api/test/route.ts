// src/app/api/test/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    // Opprett et nytt produkt uten å tildele det til en variabel
    await prisma.product.create({
        data: {
            name: "Test Product"
        }
    });

    // Hent ut alle produkter
    const products = await prisma.product.findMany();

    // Returner produktene i responsen
    return NextResponse.json(products);
}
