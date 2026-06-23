"use client"



import { requestPasswordResetAction } from "@/app/auth.actions";
import { useActionState } from "react";

export default function ForgotPasswordPage() {
    const [state, formAction, isPending] = useActionState(
        async (prevState: any, formData: FormData) => {
            return await requestPasswordResetAction(formData);
        },
        null
    );

    return (
        <main className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-sm">
            <h1 className="text-xl font-bold mb-4">Forgot Password</h1>
            <form action={formAction} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input 
                        type="email" 
                        name="email" 
                        required 
                        className="w-full border p-2 rounded"
                    />
                </div>
                {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
                {state?.success && <p className="text-green-500 text-sm">{state.success}</p>}
                <button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full bg-blue-600 text-white p-2 rounded disabled:bg-blue-400"
                >
                    {isPending ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
        </main>
    );
}
