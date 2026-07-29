// app/actions/payment.ts
'use server'

import { PrismaClient } from '@prisma/client'
import Stripe from 'stripe'

const prisma = new PrismaClient()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.acacia',
})

export async function createPaymentIntent(documentId: string) {
  // Fetch price from Neon DB via Prisma
  const document = await prisma.document.findUnique({
    where: { id: documentId },
  })

  if (!document) throw new Error('Document not found')

  // Price stored in database in dollars, convert to cents for Stripe
  const price = Math.round(document.price * 100)

  // Create a PaymentIntent with the calculated amount
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
    metadata: { documentId: document.id },
  })

  return { clientSecret: paymentIntent.client_secret }
}
























// app/actions/stripe.ts
// 'use server'

// import { prisma } from '@/lib/prisma' // Adjust path to your Prisma client instance
// import { redirect } from 'next/navigation'

// export async function createCheckoutSession(formData: FormData) {
//   const documentId = formData.get('documentId')?.toString()

//   if (!documentId) {
//     throw new Error('Missing document ID')
//   }

//   // Fetch price securely from Neon DB using Prisma
//   const doc = await prisma.document.findUnique({
//     where: { id: documentId },
//     select: { id: true, title: true, price: true },
//   })

//   if (!doc) {
//     throw new Error('Document not found')
//   }

//   // Here you would integrate your payment provider (e.g., Stripe) 
//   // using doc.price and doc.title, then redirect to their checkout URL.
//   // Example: redirect(stripeSession.url)

//   // For demonstration, we redirect back with query state or a mock success step
//   redirect(`/checkout/success?docId=${doc.id}&price=${doc.price}`)
// }
