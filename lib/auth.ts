import { betterAuth, boolean } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["https://vercel.app",process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ""], 







});