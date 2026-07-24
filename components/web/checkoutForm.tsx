// components/CheckoutForm.tsx
'use client'

import React, { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'

export default function CheckoutForm({ documentId }: { documentId: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsProcessing(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success?doc=${documentId}`,
      },
    })

    if (error) {
      setErrorMessage(error.message ?? 'An unexpected error occurred.')
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
      <PaymentElement />
      {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
      <button
        disabled={isProcessing || !stripe || !elements}
        className="w-full bg-black text-white p-2 rounded font-medium disabled:opacity-50"
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  )
}
