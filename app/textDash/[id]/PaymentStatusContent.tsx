// app/textDash/[id]/PaymentStatusContent.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PaymentStatusContent({ documentId }: { documentId: string }) {
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get("payment_intent_client_secret");
  const redirectStatus = searchParams.get("redirect_status");

  useEffect(() => {
    if (redirectStatus === "succeeded") {
      console.log("Payment succeeded for document:", documentId);
      // Optional: trigger a client-side refresh or notify your server
    }
  }, [redirectStatus, documentId]);

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Document Dashboard: {documentId}</h1>
      {redirectStatus === "succeeded" ? (
        <div className="p-4 bg-green-100 text-green-800 rounded">
          Payment successful! Your order is being processed.
        </div>
      ) : redirectStatus === "failed" ? (
        <div className="p-4 bg-red-100 text-red-800 rounded">
          Payment failed. Please try again.
        </div>
      ) : (
        <div className="p-4 bg-gray-100 text-gray-800 rounded">
          Verifying payment status...
        </div>
      )}
    </div>
  );
}
