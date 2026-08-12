// app/api/checkout/route.ts
// app/api/checkout/route.ts
// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import Stripe from "stripe";

// // Create a safe single instance helper for Prisma
// const globalForPrisma = global as unknown as { prisma: PrismaClient };
// const prisma = globalForPrisma.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export async function POST(req: Request) {
//   console.log("▶️ REQ RECEIVED BY NEXT.JS INTERNAL ENGINE");

//   try {
//     // 1. Safe parsing of body
//     const body = await req.json().catch(() => null);
//     if (!body || !body.documentId) {
//       return NextResponse.json({ error: "Missing documentId in request body" }, { status: 400 });
//     }

//     // 2. Validate Stripe Environment Keys
//     const secretKey = process.env.STRIPE_SECRET_KEY;
//     if (!secretKey) {
//       return NextResponse.json({ error: "CRITICAL: STRIPE_SECRET_KEY is missing from your .env.local file" }, { status: 500 });
//     }

//     // 3. Move Stripe client instantiation inside the execution frame to prevent global initialization crashes
//     const stripe = new Stripe(secretKey, {
//       apiVersion: "2025-11-20" as any, 
//     });

//     // 4. Temporary bypass database query to test connection independently
//     let documentPrice = 1000; // default to $10.00 fallback for validation
//     try {
//       const dbDoc = await prisma.document.findFirst();
//       if (dbDoc) {
//         documentPrice = dbDoc.price;
//       }
//     } catch (dbError: any) {
//       return NextResponse.json({ 
//         error: `Database connection error. Check your DATABASE_URL value. Details: ${dbError.message}` 
//       }, { status: 500 });
//     }

//     // 5. Generate Intent
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: documentPrice,
//       currency: "usd",
//       automatic_payment_methods: { enabled: true },
//     });

//     return NextResponse.json({ clientSecret: paymentIntent.client_secret });

//   } catch (error: any) {
//     return NextResponse.json({ error: `Internal Engine Error: ${error.message}` }, { status: 500 });
//   }
// }





import { NextResponse } from "next/server";
import {PrismaClient}  from "@/src/generated/prisma/client";
import Stripe from "stripe";
import { PrismaPg } from '@prisma/adapter-pg'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-20" as any, // Use latest API version
});

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({adapter});

export async function POST(req: Request) {
  try {
    const { documentId, userId } = await req.json();

    // 1. Fetch document from DB
    const document = await prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    // 2. Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: document.price,
      currency: "usd",
      metadata: { documentId, userId },
      automatic_payment_methods: {
    enabled: true,
    },
    });

    // 3. Track pending purchase in Prisma
    await prisma.purchase.create({
      data: {
        userId,
        documentId,
        stripeIntentId: paymentIntent.id,
        status: "PENDING",
      },
    });

    // 4. Return clientSecret to the frontend
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}




