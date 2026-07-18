'use client';

import { createCheckoutSession, CreateCheckoutSessionParams } from '@/app/stripe';
import { useTransition } from 'react';
import {Stripe}  from "stripe"









export default function BuyButton({ documentId, name, price, userId, email, successUrl, cancelUrl }: { documentId: string } & { name: string } & { price: number } & { userId: string } & { email: string } & { successUrl: string } & { cancelUrl: string }) {
  const [isPending, startTransition] = useTransition();

  const handleBuy = () => {
    startTransition(async () => {
          try {
            await createCheckoutSession({ documentId, name, price, userId, email, successUrl, cancelUrl } as CreateCheckoutSessionParams);
      } catch (error) {
        console.error(error);
        alert('Something went wrong. Please try again.');
      }
    });
  };

  return (
    <button
      onClick={handleBuy}
      disabled={isPending}
      className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
    >
      {isPending ? 'Processing...' : 'Buy PDF Now'}
    </button>
  );
}