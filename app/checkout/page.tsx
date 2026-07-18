"use server"

import StripeCheckout from  "@/components/web/stripeCheckout";
import  prisma  from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function CheckoutPage({
  params,
}: {
  params: { documentId: string };
}) {
  const document = await prisma.document.findUnique({
    where: { id: params.documentId},
  });

  if (!document) return notFound();

  return (
    <main className="mx-auto max-w-md py-12">
      <h1 className="text-xl font-semibold">{document.name}</h1>
      <p className="mb-6 text-gray-600">
        ${(document.price / 100).toFixed(2)} 
      </p>
      <StripeCheckout documentIds={[document.id]} />
    </main>
  );
}
