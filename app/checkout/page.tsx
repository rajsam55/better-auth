"use server"
import CheckoutForm from "../../components/web/checkoutForm";












export default async function PurchasePage({ documentId, name, price, userId, email, successUrl, cancelUrl }: { documentId: string } & { name: string } & { price: number } & { userId: string } & { email: string } & { successUrl: string } & { cancelUrl: string | null } ) {






  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <CheckoutForm documentId={documentId} name={name} price={price} userId={userId} email={email} successUrl={successUrl} cancelUrl={cancelUrl} />
    </main>
  );
}
