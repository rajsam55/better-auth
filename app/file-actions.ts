"use server"

import prisma from "@/lib/prisma"
import { string, uuid } from "better-auth"
import { randomUUID } from "crypto"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { v2 as cloudinary } from "cloudinary";
import { id } from "zod/v4/locales"












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
        id : randomUUID(),
        name : name as string || "",
        fileUrl: urlString || imageUrlString,
        imageUrl: imageUrlString,
        mediaType: "TEXT",
        userId : session.user.id ,
        createdAt: new Date(),
        updatedAt : new Date(),
        
        price: priceInCents,

        }

    })  

     redirect("/"),
     revalidatePath("/")

}



export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

// ─── Update Doc ──────────────────────────────────────────────────────────────

export async function updateDocument(
  id : string,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = formData.get("name")?.toString().trim();
  
  const imageUrl = formData.get("imageUrl") === "true";

  // Validation
  const errors: Record<string, string[]> = {};

  if (!name || name.length < 3) {
    errors.name = ["Name must be at least 3 characters."];
  }
  if (name && name.length > 255) {
    errors.name = [...(errors.name ?? []), " Name must be under 255 characters."];
  }
  

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Validation failed.", errors };
  }

  try {
    await prisma.document.update({
      where: { id: String(id)},
      data: {
        name: name!,
        
        
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("[updateDocument]", error);
    return {
      success: false,
      message: "Failed to update Document. It may no longer exist.",
    };
  }

  revalidatePath("/docs");
  revalidatePath(`/docs/${id}`);

  return { success: true, message: "Documents updated successfully." };
}

// ─── Delete Doc ──────────────────────────────────────────────────────────────

export async function deleteDocument(

  id : string,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  
  if (!id) {
    return { success: false, message: "Document id is required." };
  }

  try {
     await prisma.document.delete({
      where : { id: String(id) },
    });

    
 
  } catch (error) {
    console.error("[deleteDocument]", error);
    return {
      success: false,
      message: "Failed to delete document. It may no longer exist.",
    };
  }

  revalidatePath("/docs");
  redirect("/");

  
}





