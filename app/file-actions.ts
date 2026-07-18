"use server"
import prisma from "@/lib/prisma"
import { uuid } from "better-auth"
import { randomUUID } from "crypto"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { v2 as cloudinary } from "cloudinary";










export async function fileActionForm (formData : FormData){



    const files =  await formData.getAll("media") as File[]

    const file = files[0];

    if (!file) {
      throw new Error("Media file is required.");
    }

    const name  = formData.get("name")  as string

    const urlString = formData.get("fileUrl")?.toString() || "";
    

    const priceInput = formData.get("price") as string

    


  // 2. Simple validation
  if(!priceInput){
    throw new Error ( "required fields are missing")
  }


  const priceInCents = Math.round(parseFloat(priceInput) * 100)
  // 3. Convert price to a number (Int or Float depending on your schema)
  // Converting to cents/integers (e.g., $10.99 -> 1099) prevents floating-point math issues.
  
  if (isNaN(priceInCents)) {
   throw new Error("Invalid price format.")
  }


    
    
    const session = await auth.api.getSession({

      headers: await headers(),

    


    })

    if(!session){

      redirect("/sign-in")

    }


  cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});




    const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const imageUrl = await new Promise((resolve, reject) => {
          // use 'auto' so various file types are accepted (matches cloudinary types)
          cloudinary.uploader.upload_stream({ resource_type: 'auto', folder: 'nextjs' }, (error, results) => {
            if (error) return reject(error);

            resolve(results);
          }).end(buffer);
        });

        

        const imageUrlString = (imageUrl as { secure_url: string }).secure_url;    

        
        









    await prisma.document.create({


        data: {
        id : Math.floor(Math.random() * 1000000),
        name : name as string || "",
        fileUrl: urlString || imageUrlString,
        imageUrl: imageUrlString,
        mediaType: "TEXT",
        userId : session.user.id ,
        createdAt: new Date(),
        updatedAt : new Date(),
        
        price: priceInCents

        }

    })  

     redirect("/"),
     revalidatePath("/")

}