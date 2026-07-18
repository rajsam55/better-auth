// Place this file at: app/api/checkout/create-payment-intent/route.ts

// Place this file at: app/api/webhooks/stripe/route.ts
//
// Register this endpoint in the Stripe dashboard (or via `stripe listen`
// for local dev) and set STRIPE_WEBHOOK_SECRET to the signing secret it gives you.
// Subscribe at least to: payment_intent.succeeded, payment_intent.payment_failed

import { NextRequest, NextResponse } from "next/server";

import  prisma  from "@/lib/prisma";
import Stripe from "stripe";


const stripeApiKey = process.env.STRIPE_SECRET_KEY || "sk_test_51TuQDHQrnxO7EAwsvLaAT83QC68BKMGI2LQrEUCaqOi6DKggR6qhveOcAWGzvYP7ZA087NDMAqOyOWHUqoNHHYxZ00r7RfeDKM";

 export const stripe = new Stripe(stripeApiKey, {
   apiVersion: "2026-01-28.clover", // Use your specific Stripe API version
 typescript: true,
 });


// Required so Next.js doesn't parse the body — Stripe needs the raw bytes to verify the signature
export const config = { api: { bodyParser: false } };




export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const pi = event.data.object as Stripe.PaymentIntent;
      await prisma.order.update({
        where: { stripePaymentIntentId: pi.id },
        data: { status: "SUCCEEDED" },
      });
      // TODO: send confirmation email / grant download access notification here
      break;
    }
    case "payment_intent.payment_failed": {
      const pi = event.data.object as Stripe.PaymentIntent;
      await prisma.order.update({
        where: { stripePaymentIntentId: pi.id },
        data: { status: "FAILED" },
      });
      break;
    }
    default:
      // Unhandled event types are fine to ignore
      break;
  }

  return NextResponse.json({ received: true });
}
