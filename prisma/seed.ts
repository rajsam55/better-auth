import { PrismaClient } from "@/src/generated/prisma/client";





const prisma = new PrismaClient()


async function main() {
  await prisma.faq.createMany({
    data: [
      { question: "Are all the videos free?", answer: "Most of our videos are free while some you need tp pay a small amount depending on the duration.",
         order: 1 },
      { question: "If I pay for a video is it forever?", answer: "yes you can watch any number of times as you wish any time.", order: 2 },
      { question: "How do I pay, card payment or bank transfer or any other method?", answer: "yes you can either pay through your card or bank transfer or by calling us to arrange an alternative way", order: 3},
      { question: "Do I need to login to access any resources?", answer: "No you don't need to login to watch free videos but paid ones are only accessible after signin & pay.", order: 2 },
      { question: "If I pay for a video is for ever?", answer: "yes you can watch any number of times as you wish any time.", order: 4 }
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
