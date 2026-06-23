
"use server";



import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Initiates the reset pipeline by sending an email containing a temporary token.
 */
export async function requestPasswordResetAction(formData: FormData) {
    const email = formData.get("email") as string;
    
    if (!email) {
        return { error: "Email address is required." };
    }

    try {
        await auth.api.requestPasswordReset({
            headers: await headers(),
            body: {
                email,
                redirectTo: `${process.env.BETTER_AUTH_URL}/reset-password`,
            },
        });
        return { success: "If an account exists, a reset link has been dispatched." };
    } catch (error: any) {
        return { error: error.message || "An unexpected error occurred." };
    }
}

/**
 * Persists the new user password string to the database.
 */
export async function resetPasswordAction(formData: FormData) {
    const password = formData.get("password") as string;
    
    if (!password || password.length < 8) {
        return { error: "Password must be at least 8 characters long." };
    }

    try {
        await auth.api.resetPassword({
            headers: await headers(),
            body: {
                newPassword: password,
            },
        });
    } catch (error: any) {
        return { error: error.message || "Failed to update your password." };
    }

    // Redirect user back to authentication interface upon execution success
    redirect("/sign-in");
}


