import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth"; // your better-auth instance
import prisma  from "@/lib/prisma"; // your Prisma client singleton
import { createCheckoutSession } from "@/app/stripe";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { documentId } = await req.json();

    if (!documentId) {
      return NextResponse.json(
        { error: "documentId is required" },
        { status: 400 }
      );
    }

    const document = await prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    // Prevent repurchasing something already owned
    const existingPurchase = await prisma.purchase.findFirst({
      where: { documentId, userId: session.user.id, status: "COMPLETED" },
    });

    if (existingPurchase) {
      return NextResponse.json(
        { error: "You already own this document" },
        { status: 409 }
      );
    }

    const origin = req.nextUrl.origin;

    const checkoutSession = await createCheckoutSession({
      documentId,
            
      price: document.price,
      userId: session.user.id,
      email: session.user.email,
      successUrl: `${origin}/documents/${document.id}?purchase=success`,
      cancelUrl: `${origin}/documents/${document.id}?purchase=cancelled`,
    });

    // Record a pending purchase so the webhook has a row to update
    await prisma.purchase.create({
      data: {
        documentId,
        userId: session.user.id,
        stripeSessionId: checkoutSession.id,
        amountCents: document.price,
        status: "PENDING",
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout session error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}