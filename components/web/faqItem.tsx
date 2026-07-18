
// components/faq-section.tsx
// Requires shadcn/ui Accordion: npx shadcn@latest add accordion
// Usage: <FaqSection /> anywhere in a server or client page

"use server";


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import prisma from "@/lib/prisma";

type Faq = {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  order: number;
};




export async function getData (){


  const faqs = await prisma.faq.findMany({

    select : {

      id : true,

      question : true,

      answer : true,

      order : true,

      category : true



    }

  })

  return faqs


}

export  async function FaqSection() {


  const faqs = await getData()





  
  

  

  

  

  // Group by category
  

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 items-center ">

      <h1 className="text-center py-4 font-bold text-2xl mt-4">Frequently Asked Questions</h1>
      <div className = "text-center flex flex-col justify-center items-center mx-auto text-xl">
          
          <Accordion type="single" collapsible className="w-full text-center">
            {faqs.map((faq:any) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        
      
    </div>
    </div>
  );
}

