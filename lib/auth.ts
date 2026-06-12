import { betterAuth, User } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { sendMailchimpResetEmail } from "./auth-emails";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },

  sendResetPassword: async ({ user, url }: { user: User; url: string }) => {
    await sendMailchimpResetEmail({
      email: user.email,
      resetUrl: url,
    });
  },

  trustedOrigins: ["https://vercel.app", process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ""],

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
      },
    },
  },
});