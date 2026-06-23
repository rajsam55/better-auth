// @/app/reset-password/page.tsx
"use client";

import { resetPasswordAction } from "@/app/auth.actions";
import { useActionState } from "react";

export default function ResetPasswordPage() {
    const [state, formAction, isPending] = useActionState(
        async (prevState: any, formData: FormData) => {
            return await resetPasswordAction(formData);
        },
        null
    );

    return (
        <main className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-sm">
            <h1 className="text-xl font-bold mb-4">Set New Password</h1>
            <form action={formAction} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">New Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        required 
                        className="w-full border p-2 rounded"
                    />
                </div>
                {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
                <button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full bg-green-600 text-white p-2 rounded disabled:bg-green-400"
                >
                    {isPending ? "Updating Password..." : "Update Password"}
                </button>
            </form>
        </main>
    );
}
