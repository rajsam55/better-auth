import prisma from "@/lib/prisma";

const faqs = [
  {
    question: "What is this app?",
    answer: "This app helps you manage and track your projects in one place.",
    category: "General",
    order: 1,
  },
  {
    question: "How do I reset my password?",
    answer:
      "Go to Settings > Account > Reset Password, and follow the instructions sent to your email.",
    category: "Account",
    order: 1,
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes, we offer a free tier with limited features. Upgrade anytime from the Billing page.",
    category: "Billing",
    order: 1,
  },
  {
    question: "How do I contact support?",
    answer: "Email us at support@example.com or use the in-app chat widget.",
    category: "General",
    order: 2,
  },
];

async function main() {
  for (const faq of faqs) {
    await prisma.faq.create({ data: faq });
  }
  console.log(`Seeded ${faqs.length} FAQs`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });









