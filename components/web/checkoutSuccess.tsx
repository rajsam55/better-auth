import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) {
  const order = searchParams.orderId
    ? await prisma.order.findUnique({
        where: { id: searchParams.orderId },
        include: { items: { include: { document: true } } },
      })
    : null;

  if (!order) {
    return <main className="mx-auto max-w-md py-12">Order not found.</main>;
  }

  // Note: Stripe may take a moment to fire the webhook. If status is still
  // PENDING here, show a "processing" state and let the user refresh,
  // rather than treating it as failed.
  return (
    <main className="mx-auto max-w-md space-y-4 py-12">
      <h1 className="text-xl font-semibold">
        {order.status === "SUCCEEDED" ? "Payment successful 🎉" : "Processing your payment…"}
      </h1>
      {order.status === "SUCCEEDED" && (
        <ul className="space-y-2">
          {order.items.map((item) => (
            <li key={item.id}>
              <Link
                href={`/api/documents/${item.documentId}/download`}
                className="text-blue-600 underline"
              >
                Download {item.document.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
