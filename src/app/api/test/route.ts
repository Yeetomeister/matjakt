import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    const newProduct = await prisma.product.create({
        data: {
            name: "Test Product"
        }
    });

    const products = await prisma.product.findMany();
    return NextResponse.json(products);
}
