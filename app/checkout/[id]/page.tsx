// app/checkout/[id]/page.tsx
'use client'

import React, { useEffect, useState, use } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { createPaymentIntent } from '../../stripe'
import CheckoutForm from '@/components/web/checkoutForm'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  useEffect(() => {
    createPaymentIntent(resolvedParams.id)
    .then((res) => setClientSecret(res.clientSecret))
    .catch((err) => console.error(err))
  }, [resolvedParams.id])

  if (!clientSecret) return <p>Loading secure checkout...</p>

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm documentId={resolvedParams.id} />
    </Elements>
  )
}
