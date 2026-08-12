// app/actions/stripe.ts
"use server"

import {PrismaClient}  from "@/src/generated/prisma/client";
import Stripe from "stripe";
import { PrismaPg } from "@prisma/adapter-pg";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover" as any, // Use latest stable API version
});

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })


export async function createPaymentIntent(documentId: string, userEmail: string) {
  try {
    // 1. Fetch product securely from DB
    const document = await prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!document) throw new Error("document not found");

    // 2. Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount :document.price,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
      documentId: document.id,
      userEmail: userEmail,
      },
    });

    // 3. Create a pending order in Prisma
    await prisma.order.create({
      data: {
        id : Math.floor(Math.random() * 1000000),               
        stripePaymentIntentId: paymentIntent.id,
        status: "PENDING",
        userEmail: userEmail,
        documentId : document.id,
        totalAmount: document.price,
        amountInCents : document.price*100
        
        
      },
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    throw new Error(error.message || "Failed to initialize payment");
  }
}
