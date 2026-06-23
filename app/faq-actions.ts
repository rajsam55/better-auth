"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"



export async function faqAction (formData:FormData) {







    const question =  formData.get("question") as string

    const answer =  formData.get("answer") as string




    await prisma.faq.create({
        data: {
            question: question as string,
            answer: answer as string,
            order: Math.floor(Math.random() * 1000000),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    })


    redirect("/"),
    revalidatePath("/")




}