// app/checkout/[id]/page.tsx
// app/checkout/[id]/page.tsx
// app/checkout/[id]/page.tsx



// app/checkout/[id]/page.tsx
// "use client";

// import { useEffect, useState, use } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "@/components/web/checkoutForm";

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// export default function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
//   const resolvedParams = use(params); 
//   const documentId = resolvedParams.id;

//   const [clientSecret, setClientSecret] = useState<string | null>(null);
//   const [apiError, setApiError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!documentId) return;

//     fetch("/api/checkout", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ 
//         documentId: documentId, 
//         userId: "test-user-id" // Explicit placeholder for diagnostic isolation
//       }), 
//     })
//       .then((res) => {
//         // If the endpoint hit a 404/500 but returned text/html instead of JSON
//         if (!res.ok) {
//           throw new Error(`Server returned status code: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         if (data.clientSecret) {
//           setClientSecret(data.clientSecret);
//         } else {
//           setApiError(data.error || "The API response didn't contain a clientSecret property.");
//         }
//       })
//       .catch((err) => {
//         setApiError(err.message || "Network call failed completely.");
//       });
//   }, [documentId]);

//   // Visual error fallback instead of silent freezing
//   if (apiError) {
//     return (
//       <div className="p-8 text-center text-red-600 font-medium">
//         <p>Failed to initialize Checkout Setup:</p>
//         <p className="text-sm text-gray-500 mt-1 bg-gray-100 p-2 rounded inline-block">{apiError}</p>
//       </div>
//     );
//   }

//   // If there's no error but clientSecret isn't set, show the loading text
//   if (!clientSecret) {
//     return <div className="p-8 text-center text-gray-500">Communicating with backend route...</div>;
//   }

//   return (
//     <div className="p-8 max-w-md mx-auto">
//       <h1 className="text-2xl font-bold mb-6 text-center">Complete Your Purchase</h1>
//       <Elements stripe={stripePromise} options={{ clientSecret }}>
//         <CheckoutForm clientSecret={clientSecret} />
//       </Elements>
//     </div>
//   );
// }



"use server"
// app/checkout/[id]/page.tsx
import { notFound } from "next/navigation";
import  prisma  from "@/lib/prisma";
import { auth } from "@/lib/auth"; // Better-Auth server instance
import { headers } from "next/headers";
import CheckoutWrapper from "@/components/web/checkoutForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CheckoutPage({ params }: PageProps) {
  // 1. Await the dynamic route parameters
  const { id: documentId } = await params;

  // 2. Fetch user session securely via Better-Auth
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Optional: Force login before allowing checkout
  if (!session?.user?.email) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
        <p className="text-gray-600 mb-4">Please log in to purchase this PDF document.</p>
        <a href="/sign-in" className="bg-blue-600 text-white px-4 py-2 rounded">Sign In</a>
      </div>
    );
  }

  // 3. Fetch product data from Prisma
  const document = await prisma.document.findUnique({
    where: { id: documentId },
  });

  // Handle invalid IDs gracefully
  if (!document) {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <div className="border rounded-lg p-6 bg-white shadow-sm mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-2">Secure Checkout</h1>
        <div className="flex justify-between items-center border-t pt-4 mt-4">
          <div>
            <p className="font-medium text-gray-900">{document.name}</p>
            
          </div>
          <p className="text-xl font-bold">
            ${(document.price/100).toFixed(2)}
          </p>
        </div>
      </div>

      {/* 4. Pass data into the Stripe Elements Client Wrapper */}
      <div className="bg-gray-50 rounded-lg p-6 border">
        <CheckoutWrapper 
          documentId={document.id} 
          userEmail={session.user.email} 
        />
      </div>
    </main>
  );
}








// "use client";

// import { useEffect, useState, use } from "react";
// import { useSession } from "@/lib/auth-client"; // 1. Import useSession
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "@/components/web/checkoutForm";



// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);


// export default function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {

  
//   const resolvedParams = use(params); 
//   const documentId = resolvedParams.id;

//   const { data: session, status } = useSession(); // 2. Get session data
//   const [clientSecret, setClientSecret] = useState("")

//   useEffect(() => {
//     // 3. Only fetch if the user is authenticated and session is loaded
//     if (status !== "authenticated" || !session?.user?.id) return;

//     fetch("/api/checkout", {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ 
//         documentId: documentId, 
//         userId: session.user.id,
//       })
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret));
//   }, [documentId, session, status]);


//   if (status === "loading" || !clientSecret) return <div>Loading payment details...</div>;
  
//   if (status === "unauthenticated") return <div>Please log in to purchase.</div>;
  

//   return (
//     <div className="p-8">
//       <Elements stripe={stripePromise} options={{ clientSecret }}>

//         <CheckoutForm clientSecret={clientSecret} />

//       </Elements>
//     </div>
//   );
// }




// app/checkout/[id]/page.tsx
// 

// 'use client';

// import { useEffect, useState } from 'react';
// import { loadStripe}  from '@stripe/stripe-js';
// import { Elements}  from '@stripe/react-stripe-js';
// import { createPaymentIntent } from '@/app/stripe';
// import CheckoutForm from "@/components/web/checkoutForm"; 

// // Your inner form with the submit button

// // Initialize Stripe outside of the render cycle
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// export default function CheckoutPage({ documentId }: { documentId: string }) {
//   const [clientSecret, setClientSecret] = useState<{client_secret: string |  null}>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     // 1. Double check we actually have the text string ID from props

    
//     if (!documentId) return;

    

//     // 2. Safely invoke the Next.js Server Action
//     createPaymentIntent(documentId)  

//       .then((res) => {
//         if (res?.clientSecret) {
//           setClientSecret(res.clientSecret);
//         }
//       })    
      
//       .catch((err) => {
//         console.error(err);
//         setError("Could not load payment records.");
//       });
      
//       createPaymentIntent()
//   }, [documentId]);
  

//   if (error) return <div className="text-red-500">{error}</div>;
  
//   // 3. DO NOT render Elements until clientSecret exists! Prevents the crash.
//   if (!clientSecret) return <div>Loading secure checkout...</div>;

  

    

    

//   return (

//     <div>
//     <Elements stripe={stripePromise} options={{ clientSecret }}>
//         <CheckoutForm />
//       </Elements>
  

     
  
  

// </div>
    
//   );
// }
