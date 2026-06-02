"use server"

import { auth } from "@/lib/auth"
import  prisma  from "@/lib/prisma"
import { email, property } from "better-auth"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import mailchimp from "@mailchimp/mailchimp_marketing"
import { v2 as cloudinary } from "cloudinary";




mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
});





export async function actionForm (formData: FormData){



    const title = formData.get("title")

    const content =  formData.get("content")

    
    
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
        id: Math.floor(Math.random() * 1000000),
        title
        : title as string || "",
        content: content as string || "",
        imageUrl: imageUrlString,
        thumbnail: imageUrlString,
        mediaType: file.type.startsWith("image/") ? "IMAGE" : (file.type.startsWith("video/") ? "VIDEO" : "TEXT"),
        userId : session.user.id ,
        createdAt: new Date(),
        updatedAt : new Date(),
      },

      
    });

     redirect("/"),
     revalidatePath("/")
     
  }



// ─── Types ────────────────────────────────────────────────────────────────────

export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

// ─── Newsletter Subscription ──────────────────────────────────────────────────

export type SubscribeResult = {
  error?: string;
  success?: boolean;
};

export async function subscribeNewsletter(
  prevState: SubscribeResult | undefined,
  formData: FormData
): Promise<SubscribeResult> {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return { error: "Valid email is required" };
  }

  try {
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const server = process.env.MAILCHIMP_API_SERVER;

    if (!audienceId || !apiKey || !server) {
      // If Mailchimp is not configured, simulate success for development
      if (process.env.NODE_ENV === "development") {
        return { success: true };
      }
      return { error: "Newsletter service is not configured" };
    }

    const response = await fetch(
      `https://${server}.list-manage.com/api/3.0/lists/${audienceId}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `apikey ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
        }),
      }
    );

    if (response.status >= 400) {
      const data = await response.json();
      return { error: data.title || "Failed to subscribe" };
    }

    return { success: true };
  } catch (err) {
    console.error("[subscribeNewsletter]", err);
    return { error: "Internal Server Error" };
  }
}

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


