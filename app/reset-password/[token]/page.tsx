// app/auth/reset-password/page.tsx
"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ResetPassword() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [newPassword, setNewPassword] = useState("");
    
    const token = searchParams.get("token");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return alert("Missing or expired reset token.");

        const { error } = await authClient.resetPassword({
            newPassword,
            token,
        });

        if (error) {
            alert(error.message || "Something went wrong.");
        } else {
            alert("Password updated successfully!");
            router.push("/sign-in");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                placeholder="Enter new password" 
                required 
            />
            <button type="submit">Update Password</button>
        </form>
    );
}
