// src/app/api/products/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Uautorisert" }, { status: 401 });
    }

    try {
        const products = await prisma.product.findMany();
        return NextResponse.json(products);
    } catch (error: any) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { error: "Feil ved henting av produkter" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Uautorisert" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { name } = body;

        if (!name) {
            return NextResponse.json({ error: "Navn er påkrevd" }, { status: 400 });
        }

        const newProduct = await prisma.product.create({
            data: { name },
        });

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error: any) {
        console.error("Error creating product:", error);
        return NextResponse.json(
            { error: "Feil ved oppretting av produkt" },
            { status: 500 }
        );
    }
}
