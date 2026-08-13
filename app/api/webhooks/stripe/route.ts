// app/api/webhooks/stripe/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@/src/generated/prisma/client";
import Stripe from "stripe";
import { PrismaPg } from "@prisma/adapter-pg";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acasia" as any,
});

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({adapter});
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    if (!signature) throw new Error("Missing stripe signature");
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the specific payment intent success event
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    const order = await prisma.order.findFirst({
      where: { stripePaymentIntentId: paymentIntent.id },
    });

    if (order) {
      await prisma.order.update({
        where: { id: order.id },
        data: { 
          status: "SUCCESS" // Update to your paid status field value
        },
      });
    }
    // TODO: Send PDF via Email or trigger a secure download link generation
  } 
  
  // Handle failure event separately at the top level scope
  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    
    const failedOrder = await prisma.order.findFirst({
      where: { stripePaymentIntentId: paymentIntent.id },
    });

    if (failedOrder) {
      await prisma.order.update({
        where: { id: failedOrder.id },
        data: { status: "FAILED" },
      });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

