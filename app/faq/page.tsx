import prisma from "@/lib/prisma"; // Adjust this path based on your Prisma initialization file
import FaqItem from "../components/FaqItem";

// Opt into dynamic rendering if your FAQs change frequently without manual rebuilds
export const revalidate = 3600; // Revalidate data every hour

async function getFaqs() {
  return await prisma.faq.findMany({
    orderBy: {
      order: "asc",
    },
  });
}

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
        Frequently Asked Questions
      </h1>
      
      {faqs.length === 0 ? (
        <p className="text-gray-500">No questions available yet.</p>
      ) : (
        <div className="space-y-1">
          {faqs.map((faq) => (
            <FaqItem 
              key={faq.id} 
              question={faq.question} 
              answer={faq.answer} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
