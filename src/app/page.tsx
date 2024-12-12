// src/app/page.tsx

"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Laster...</p>;
    }

    if (!session) {
        return (
            <div>
                <h1>Velkommen til Matjakt</h1>
                <p>Du er ikke logget inn.</p>
                <button onClick={() => signIn()}>Logg inn</button>
            </div>
        );
    }

    return (
        <div>
            <h1>Velkommen, {session.user?.name}</h1>
            <button onClick={() => signOut()}>Logg ut</button>
            <br/>
            <br/>
            <Link href="/api/products/">
                <button> Gå til produkter</button>
            </Link>
        </div>
    );
}
