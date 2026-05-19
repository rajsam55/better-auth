"use server"

import prisma from "@/lib/prisma"
import { createAuthClient } from "better-auth/react"



export async function actionForm (formData : FormData){



    const title = formData.get("title")

    const content = formData.get("title")


    const file = formData.get("file") as File


    const session =  createAuthClient()



    const data = await prisma.post.create({


        data : {


            title : title as string,

            content : content as string,

            file : File as unknown as string,

            authorId : user.id,

            authorName : authorName as given_name
        }








    })





}