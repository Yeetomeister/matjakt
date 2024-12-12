// src/app/auth/signin/page.tsx

"use client";

import { signIn, SignInResponse } from "next-auth/react";
import { useState } from "react";
import {Sign} from "node:crypto";

export default function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res : SignInResponse | undefined = await signIn("credentials", {
            redirect: false,
            username,
            password,
        });

        if (res?.error) {
            setError(res.error);
        } else {
            window.location.href = "/";
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
            <h1>Logg inn</h1>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div>
                    <label htmlFor="username">Brukernavn</label>
                    <input
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Passord</label>
                    <input
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Logg inn</button>
            </form>
        </div>
    );
}
