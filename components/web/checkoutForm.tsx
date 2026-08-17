// app/components/CheckoutForm.tsx
"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {redirect}  from  "next/navigation"
import { createPaymentIntent } from "@/app/stripe";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutProps {
  documentId: string;
  
  userEmail: string;
}

export default function CheckoutWrapper({ documentId, userEmail }: CheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // Call server action to get client secret
    createPaymentIntent(documentId, userEmail)
      .then((res) => setClientSecret(res.clientSecret))
      .catch((err) => console.error(err));
  }, [documentId, userEmail]);

  if (!clientSecret) return <div>Loading Payment Gateway...</div>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <Form />
    </Elements>
  );
}

function Form() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!stripe || !elements) return;

  setIsProcessing(true);

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Redirect here for synchronous fallback confirmation
      return_url: `${window.location.origin}/checkout/success`,
    },
  });

  if (error) {
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message ?? "An unexpected error occurred.");
    } else {
      setMessage("An unexpected error occurred.");
    }
  }


  setIsProcessing(false)
}


  return  (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <PaymentElement />
      <button
        disabled={isProcessing || !stripe || !elements}
        className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
      {message && <div className="text-red-500 mt-2">{message}</div>}
    </form>
  );
  
}



// // components/CheckoutForm.tsx
// "use client";

// import { useState } from "react";
// import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

// export default function CheckoutForm({ clientSecret }: { clientSecret: string }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [message, setMessage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;

//     setIsLoading(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         // Redirect to download page on completion
//         return_url: `${window.location.origin}/textDash/${document.id}`,
//       },
//     });

//     if (error.type === "card_error" || error.type === "validation_error") {
//       setMessage(error.message ?? "An error occurred.");
//     } else {
//       setMessage("An unexpected error occurred.");
//     }

//     setIsLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
//       <PaymentElement />
//       <button
//         disabled={isLoading || !stripe || !elements}
//         className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
//       >
//         {isLoading ? "Processing..." : "Pay & Download PDF"}
//       </button>
//       {message && <div className="text-red-500 mt-2 text-sm">{message}</div>}
//     </form>
//   );
// }
//}


































// import React, { useState } from 'react'
// import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
// import EmbeddedCheckoutFunction from "./EmbeddedCheckoutForm"




// export default function CheckoutForm({ documentId }: { documentId: string }) {
//   const stripe = useStripe()
//   const elements = useElements()
//   const [errorMessage, setErrorMessage] = useState<string | null>(null)
//   const [isProcessing, setIsProcessing] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!stripe || !elements) return

//     setIsProcessing(true)

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: `${window.location.origin}/success?doc=${documentId}`,
//       },
//     })

//     if (error) {
//       setErrorMessage(error.message ?? 'An unexpected error occurred.')
//       setIsProcessing(false)
//     }
//   }

//   return (

//     <div>

  
    
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
//       <PaymentElement />      
      
//       {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
//       <button
//         disabled={isProcessing || !stripe || !elements}
//         className="w-full bg-black text-white p-2 rounded font-medium disabled:opacity-50"
//       >
//         {isProcessing ? 'Processing...' : 'Pay Now'}
//       </button>
      
      
//     </form>

    

//     <EmbeddedCheckoutFunction/>

//     </div>
    

    
    
    
    
    

    
//   )
