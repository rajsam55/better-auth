"use server";

import { auth } from "@/lib/auth";

export async function requestPasswordResetAction(formData: FormData) {
    const email = formData.get("email") as string;

    if (!email) {
        return { success: false, error: "Email address is required." };
    }

    try {
        // Better Auth triggers your custom Mailchimp logic behind the scenes
        await auth.api.requestPasswordReset({
            body: { email },
        });

        return { success: true, message: "If that account exists, a reset link was sent!" };
    } catch (error: any) {
        return { success: false, error: error.message || "An unexpected error occurred." };
    }
}
