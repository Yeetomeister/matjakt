// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // Sørg for at denne banen er korrekt

const handler = NextAuth(authOptions);

// Eksporterer NextAuth handler som GET og POST
export { handler as GET, handler as POST };