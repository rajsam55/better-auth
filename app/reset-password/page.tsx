// app/reset-password/page.tsx
"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient();

export default function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
    // Resolve search parameters via React.use() in Next 15+ environments
    const params = use(searchParams);
    const token = params.token;
    
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) {
            setMessage("Invalid or missing reset token.");
            return;
        }
        
        setLoading(true);
        setMessage("");

        const { error } = await authClient.resetPassword({
            newPassword: password,
            token: token,
        });

        setLoading(false);
        if (error) {
            setMessage(error.message || "Failed to update password.");
        } else {
            setMessage("Password successfully reset! Redirecting...");
            setTimeout(() => router.push("/login"), 2000);
        }
    };

    if (!token) {
        return <div className="p-8 text-red-500">Error: Missing security token.</div>;
    }

    return (
        <form onSubmit={handleReset} className="flex flex-col gap-4 max-w-sm p-4 mx-auto mt-20">
            <h2 className="text-xl font-bold">Set New Password</h2>
            <input 
                type="password" 
                placeholder="Enter new password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="border p-2 rounded text-black"
            />
            <button type="submit" disabled={loading} className="bg-green-600 text-white p-2 rounded">
                {loading ? "Updating..." : "Update Password"}
            </button>
            {message && <p className="text-sm mt-2">{message}</p>}
        </form>
    );
}







