
"server only"

import Stripe from "stripe"





const stripeApiKey = process.env.STRIPE_SECRET_KEY || "sk_test_51TtVAxLMHKpBT2DogKYGVANKDFEK0htaPDUrROM9HRQ6lQZAlnqZgGVJFlJutQr6H7jssooTJfEsAACFiLvwiHXp00bQBgFX3Q";

export const stripe = new Stripe(stripeApiKey, {
  apiVersion: "2026-06-24.dahlia", // Use your specific Stripe API version
  typescript: true,
});




 
// Single shared Stripe client for the app





// Single shared Stripe client for the app
  
export type CreateCheckoutSessionParams = {
  documentId: string;
  name: string;  
  price: number; // e.g. 999 = $9.99
  currency?: string; // defaults to "usd"
  userId: string;
  email: string;
  successUrl: string; // e.g. `${origin}/documents/${documentId}?purchase=success`
  cancelUrl: string; // e.g. `${origin}/documents/${documentId}?purchase=cancelled`
};

/**
 * Creates a Stripe Checkout Session for a one-time PDF purchase.
 * Metadata carries the documentId + userId so the webhook can
 * reconcile the payment with your Prisma models after payment succeeds.
 */
export async function createCheckoutSession({
  documentId,
  name,  
  price : priceInCents,
  currency = "usd",
  userId,
  email : userEmail,
  successUrl,
  cancelUrl,
}: CreateCheckoutSessionParams): Promise<Stripe.Checkout.Session> {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: userEmail,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency,
          unit_amount: priceInCents,
          document_data: {
            name: name,
          },
        },
      },
    ],
  });
  return session;
}
/**
 * Verifies and parses an incoming Stripe webhook request body.
 * Throws if the signature is invalid.
 */
export async function constructWebhookEvent(
  rawBody: string | Buffer,
  signature: string
): Stripe.Event {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("Missing STRIPE_WEBHOOK_SECRET environment variable");
  }

  return stripe.webhooks.constructEvent(
    rawBody,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );
}