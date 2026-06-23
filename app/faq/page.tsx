"use server"

import { FaqSection } from "@/components/web/faqItem";
import prisma from "@/lib/prisma"; // Adjust this path based on your Prisma initialization file
import { JSX } from "react";

type FaqSectionProps = {
  question: string;
  answer: string;
};

async function getFaqs() {
  return await prisma.faq.findMany({
    orderBy: {
      order: "asc",
    },
  });
}

// Cast imported component to any to avoid TSX prop typing issues from the imported module
const FaqSectionAny = FaqSection as any;

async function FaqSectionPage(): Promise<JSX.Element> {

  const faqs = await getFaqs()





  


// Opt into dynamic rendering if your FAQs change frequently without manual rebuilds
 // Revalidate data every hour





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
            <FaqSectionAny
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


export default FaqSectionPage