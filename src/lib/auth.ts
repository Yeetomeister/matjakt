import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Brukernavn", type: "text", placeholder: "admin" },
                password: { label: "Passord", type: "password" },
            },
            async authorize(credentials) {
                const adminUsername = process.env.ADMIN_USERNAME;
                const adminPassword = process.env.ADMIN_PASSWORD;

                console.log("Attempting login");
                if (
                    credentials?.username === adminUsername &&
                    credentials?.password === adminPassword
                ) {
                    console.log("Authorized");
                    return { id: "1", name: "Admin" };
                }

                console.log("Unauthorized");
                return null;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
    },
};