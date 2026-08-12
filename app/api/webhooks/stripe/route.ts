// app/api/webhooks/stripe/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.accredited" as any,
});
const prisma = new PrismaClient();
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
    
    // Update order status in database
    const updatedOrder = await prisma.order.update({
      where: { stripePaymentId: paymentIntent.id },
      data: { status: "SUCCEEDED" },
      include: { product: true },
    });

    // TODO: Send PDF via Email or trigger a secure download link generation
    console.log(`Fulfill Order: Sending PDF ${updatedOrder.product.pdfUrl} to ${updatedOrder.userEmail}`);
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    
    await prisma.order.update({
      where: { stripePaymentIntentId: paymentIntent.id },
      data: { status: "FAILED" },
    });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}






