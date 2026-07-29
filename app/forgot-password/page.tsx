// app/auth/forgot-password/page.tsx
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client"; // Your Better Auth client instance

export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await authClient.requestPasswordReset({
            email,
            redirectTo: "/reset-password",
        });
        alert("If an account exists, a reset link has been sent.");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email" 
                required 
            />
            <button type="submit">Send Reset Link</button>
        </form>
    );
}
