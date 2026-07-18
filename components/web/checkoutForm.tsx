"use client";

import { useState, FormEvent } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

export default function CheckoutForm({ orderId }: { orderId: int }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return; // Stripe.js hasn't loaded yet

    setIsSubmitting(true);
    setMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Stripe redirects here after payment (required for redirect-based methods)
        return_url: `${window.location.origin}/checkout/success?orderId=${orderId}`,
      },
    });

    // If we get here, it's an immediate error (e.g. card declined before redirect).
    // On success, the browser redirects to return_url and this code doesn't run.
    if (error) {
      setMessage(error.message ?? "Payment failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || isSubmitting}
        className="w-full rounded-md bg-black py-2 text-white disabled:opacity-50"
      >
        {isSubmitting ? "Processing…" : "Pay now"}
      </button>
      {message && <p className="text-sm text-red-600">{message}</p>}
    </form>
  );
}
