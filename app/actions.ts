"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { uuid } from "better-auth"
import { randomUUID } from "crypto"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import mailchimp from "@mailchimp/mailchimp_marketing"
import { v2 as cloudinary } from "cloudinary";
import { GalleryThumbnails } from "lucide-react"
import { URL } from "url"



mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
});






export async function actionForm (formData: FormData){



    const title = formData.get("title")

    const content =  formData.get("content")

    





  


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


    const files = formData.getAll("media") as File[];
    // get url from form data as string (FormData has no getUrlString)

    const urlString = formData.get("url")?.toString() || "";
    

    const file = files[0];

    if (!file) {
      throw new Error("Media file is required.");
    }

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

        
        


    

      await prisma.post.create({

      data: {
        
        id : Math.floor(Math.random() * 1000000),
        
        title: title as string || "",
        content: content as string || "",
        url: urlString || imageUrlString,
        imageUrl: imageUrlString,
        mediaType: (file.type.startsWith("image/") ? "IMAGE" : (file.type.startsWith("video/"))? "VIDEO" : "TEXT"),
        userId : session.user.id ,
        createdAt: new Date(),
        updatedAt : new Date(),
        thumbnail: formData.get("thumbnail")?.toString() || "",
        price: priceInCents
        
        
        
        
        
        
         
        



        },

      
    });

     redirect("/"),
     revalidatePath("/")

     
  }


  
// Utility to get a thumbnail URL from a video/image URL. Accepts an optional
// imageUrlString so it doesn't rely on an undefined `post` variable.

  







// ─── Types ────────────────────────────────────────────────────────────────────

export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

// ─── Update Post ──────────────────────────────────────────────────────────────

export async function updatePost(
  id : string,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const title = formData.get("title")?.toString().trim();
  const content = formData.get("content")?.toString().trim();
  const imageUrl = formData.get("imageUrl") === "true";

  // Validation
  const errors: Record<string, string[]> = {};

  if (!title || title.length < 3) {
    errors.title = ["Title must be at least 3 characters."];
  }
  if (title && title.length > 255) {
    errors.title = [...(errors.title ?? []), "Title must be under 255 characters."];
  }
  if (!content || content.length < 10) {
    errors.content = ["Content must be at least 10 characters."];
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Validation failed.", errors };
  }

  try {
    await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title: title!,
        content: content!,
        
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("[updatePost]", error);
    return {
      success: false,
      message: "Failed to update post. It may no longer exist.",
    };
  }

  revalidatePath("/posts");
  revalidatePath(`/posts/${id}`);

  return { success: true, message: "Post updated successfully." };
}

// ─── Delete Post ──────────────────────────────────────────────────────────────

export async function deletePost(

  id : string,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  
  if (!id) {
    return { success: false, message: "Post id is required." };
  }

  try {
    await prisma.post.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    console.error("[deletePost]", error);
    return {
      success: false,
      message: "Failed to delete post. It may no longer exist.",
    };
  }

  revalidatePath("/posts");
  redirect("/");
  
}


