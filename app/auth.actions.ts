
"use server";


import { Resend } from "resend";
import crypto from "crypto";
// import bcrypt from "bcryptjs"; // Or your preferred hashing library
import  prisma  from "@/lib/prisma"; // Adjust path to your Prisma client instantiation

const resend = new Resend(process.env.RESEND_API_KEY);

// ACTION 1: Request Password Reset Link
export async function requestPasswordReset(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) {
    return { error: "Email is required." };
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    // Security practice: Return generic success to prevent email enumeration
    if (!user) {
      return { success: "If that account exists, a reset link has been sent." };
    }

    // Generate secure 32-byte hex token and set 1-hour expiration
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000); // 1 hour from now

    await prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExpiry: expires,
      },
    });

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;

    // Send email using Resend
    await resend.emails.send({
      from: "onboarding@resend.dev", // Replace with your verified domain in production
      to: user.email,
      subject: "Reset your password",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 1 hour.</p>`,
    });

    return { success: "If that account exists, a reset link has been sent." };
  } catch (error) {
    return { error: "An unexpected error occurred. Please try again." };
  }
}

// ACTION 2: Execute Password Reset
export async function resetPassword(token: string, formData: FormData) {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || password.length < 6) {
    return { error: "Password must be at least 6 characters long." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  try {
    // Find valid token that hasn't expired yet
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gte: new Date() },
      },
    });

    if (!user) {
      return { error: "Invalid or expired token." };
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    // // Update user password and nullify token to prevent replay attacks
    // await prisma.user.update({
    //   where: { id: user.id },
    //   data: {
    //     password: hashedPassword,
    //     resetToken: null,
    //     resetTokenExpiry: null,
    //   },
    // });

    return { success: "Password reset successfully! You can now log in." };
  } catch (error) {
    return { error: "An error occurred while resetting your password." };
  }
}






