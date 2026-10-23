"use server"

import { auth } from "@/lib/auth"
import prisma from "../lib/prisma"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import mailchimp from "@mailchimp/mailchimp_marketing"
 import { v2 as cloudinary } from "cloudinary";

// Initialize Mailchimp Configuration Natively
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
});

export async function actionForm(formData: FormData) {
  // 1. Authenticate User Session First (Security Best Practice)
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || !session.user?.id) {
    redirect("/sign-in")
  }

  const isAdmin = session?.user?.role === "ADMIN";

  // 2. Extract Data Safely
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const mediaUrl = formData.get("mediaUrl") as string;
  const mediaType = formData.get("mediaType") as string;
  const priceInput = formData.get("price") as string;
  

  
  // FIX: Safely fallback to "FREE" if missing or malformed
  const rawAccessType = formData.get("accessType") as string;
  const accessType = (rawAccessType === "PAID" && isAdmin) ? "PAID" : "FREE";

  //3. Conditional Validation (Don't require price if it's FREE!)
  if (!title || !content || !mediaUrl || !mediaType) {
    throw new Error("Required text fields or media upload links are missing.")
  }

  if (accessType === "PAID" && !priceInput) {
    throw new Error("Paid posts must specify a price value.")
  }

  // 4. Handle Price Computations Safely
  let priceInCents = 0;
  if (accessType === "PAID") {
    priceInCents = Math.round(parseFloat(priceInput) * 100);
    if (isNaN(priceInCents) || priceInCents <= 0) {
      throw new Error("Paid posts must specify a clear monetary value greater than 0.0")
    }
  }

//  const priceInCents = Math.round(parseFloat(priceInput) * 100);

//  if (isNaN(priceInCents)) {
//      throw new Error("Invalid price format.")

//  }

 

  const dynamicMediaType = mediaUrl.match(/\.(mp4|webm|mov)$/i) ? "VIDEO" : "IMAGE": "TEXT";

  
  // Safely insert the dynamic accessType straight into the database table


  
  
  
  
  
   const generatedId = Math.floor(Math.random() * 1000000);
  
  // 5. Execute Database Write Insertion
  await prisma.post.create({
    data: {
      id: generatedId, // Consider moving this to autoincrement/UUID in schema
      title: title || "",
      content: content || "",
      url: mediaUrl,
      imageUrl: mediaUrl, 
      mediaType: dynamicMediaType, 
      createdAt: new Date(),
      updatedAt: new Date(),
      thumbnail: formData.get("thumbnail")?.toString() || "",
      price: priceInCents,
      userId : session.user.id,
      // user: {

      //   connect : {

      //     id : session.user.id,
      //   }, 
        
      // },    
    },  
    
  });

  await (prisma.post as any)["update"]({
  where: { id: generatedId },
  data: {
    accessType: accessType, // Safely saves the admin's selection!
  },
});

  // 1. Build a raw structural payload variable map
// const rawPostPayload = {
//   id: Math.floor(Math.random() * 1000000),
//   title: title || "",
//   content: content || "",
//   url: mediaUrl,
//   imageUrl: mediaUrl, 
//   mediaType: dynamicMediaType, 
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   thumbnail: formData.get("thumbnail")?.toString() || "",
//   price: priceInCents,
//   userId: session.user.id,
  
// };

// // 2. Cast data layer parameter to unknown, then any, to destroy the runtime validator tracking stream
// await prisma.post.create({
//   data: rawPostPayload as unknown as any
// });


  


  // 6. Refresh layouts and redirect
  revalidatePath("/")
  return redirect("/")
}








// "use server"

// import { auth } from "@/lib/auth"
// import prisma from "@/lib/prisma"
// import { revalidatePath } from "next/cache"
// import { headers } from "next/headers"
// import { redirect } from "next/navigation"
// import mailchimp from "@mailchimp/mailchimp_marketing"
// import { v2 as cloudinary } from "cloudinary";

// // Initialize Mailchimp Configuration Natively
// mailchimp.setConfig({
//   apiKey: process.env.MAILCHIMP_API_KEY,
//   server: process.env.MAILCHIMP_API_SERVER,
// });

// export async function actionForm(formData: FormData) {
//   const title = formData.get("title")
//   const content = formData.get("content")
//   const mediaUrl = formData.get("mediaUrl") as string;
//   const mediaType = formData.get("mediaType") as string;


//   const accessType = (formData.get("accessType") as string) || "FREE"|| "PAID";


  

// const priceInput = formData.get("price") as string;


  
//   // 1. READ values passed directly from your CldUploadWidget client component
  

//   // Simple validation checks
//   if (!priceInput || !mediaUrl || !title || !content||!mediaType) {
//     throw new Error("Required text fields or media upload links are missing.")
//   }

//   // Convert decimal price input to integer cents safely ($10.99 -> 1099)
//     const priceInCents = Math.round(parseFloat(priceInput) * 100)
//    if (isNaN(priceInCents)) {
//      throw new Error("Invalid price format.")
//   }
// // if(accessType === "PAID"){

// //   if(!priceInput|| parseFloat(priceinput)<= 0){

// //     throw new Error("Paid posts must specify a clear monetary value greater than 0.0")
// //   }

// // }





//   // const accessType = isAdmin 
//   //   ? (formData.get('accessType') as AccessType || AccessType.FREE) 
//   //   : AccessType.FREE



// //const priceInCents = accessType === AccessType.PAID ? priceInCents || 0.0 : null
//   // 2. Authenticate User Session via Better-Auth
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   })

//   const isAdmin = session?.user?.role === "ADMIN";

//   if (!session || !session.user?.id) {
//     redirect("/sign-in")
//   }


//   const dynamicMediaType = mediaUrl.match(/\.(mp4|webm|mov)$/i) ? "VIDEO" : "IMAGE";

//   // 3. Execute Clean, Relational Prisma Creation Query
//   await prisma.post.create({
//     data: {
//       // Keep your current random integer ID logic
//       id: Math.floor(Math.random() * 1000000),
      
//       title: (title as string) || "",
//       content: (content as string) || "",
      
//       // FIX: Map the secure Cloudinary string safely to both schema requirements
//       url: mediaUrl as string,
//       imageUrl: mediaUrl as string, 
      
//       // FIX: Set dynamic file type enum cleanly ("IMAGE" or "VIDEO")
//       mediaType: dynamicMediaType, 
          
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       thumbnail: formData.get("thumbnail")?.toString() || "",
//       price: Number(priceInCents) || 0,
//       userId : session.user.id,
//       accessType: (accessType as string)|| "",
      
//       // FIX: Map database reference straight to your User schema rules relational hook
//       // user: {
//       //   connect: {
//       //     id: session.user.id
//       //   }
//       // }
//     },
//   })

//   // 4. Reset Next.js Cache Hooks and Force Routing Home
//   revalidatePath("/")
//   redirect("/")
// }






// "use server"

// import { auth } from "@/lib/auth"
// import prisma from "@/lib/prisma"
// import { uuid } from "better-auth"
// import { randomUUID } from "crypto"
// import { revalidatePath, revalidateTag} from "next/cache"
// import { headers } from "next/headers"
// import { redirect } from "next/navigation"
// import mailchimp from "@mailchimp/mailchimp_marketing"
// import { v2 as cloudinary } from "cloudinary";
// import { GalleryThumbnails } from "lucide-react"
// import { URL } from "url"



// mailchimp.setConfig({
//   apiKey: process.env.MAILCHIMP_API_KEY,
//   server: process.env.MAILCHIMP_API_SERVER,
// });






// export async function actionForm (formData: FormData){



//     const title = formData.get("title")

//     const content =  formData.get("content")

//     const priceInput = formData.get("price") as string;

    


    
    

    


//   // 2. Simple validation
//   if(!priceInput){
//     throw new Error ( "required fields are missing")
//   }


//   const priceInCents = Math.round(parseFloat(priceInput) * 100)
//   // 3. Convert price to a number (Int or Float depending on your schema)
//   // Converting to cents/integers (e.g., $10.99 -> 1099) prevents floating-point math issues.
  
//   if (isNaN(priceInCents)) {
//    throw new Error("Invalid price format.")
//   }


    
    
//     const session = await auth.api.getSession({

//       headers: await headers(),

    


//     })

//     if(!session){

//       redirect("/sign-in")

//     }


//   cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });


//     const files = formData.getAll("media") as File[];
//     // get url from form data as string (FormData has no getUrlString)

//     const urlString = formData.get("url")?.toString() || "";
    

//     const file = files[0];

//     if (!file) {
//       throw new Error("Media file is required.");
//     }

//     const arrayBuffer = await file.arrayBuffer();
//         const buffer = Buffer.from(arrayBuffer);

//         const imageUrl = await new Promise((resolve, reject) => {
//           // use 'auto' so various file types are accepted (matches cloudinary types)
//           cloudinary.uploader.upload_stream({ resource_type: 'auto', folder: 'nextjs' }, (error, results) => {
//             if (error) return reject(error);

//             resolve(results);
//           }).end(buffer);
//         });

        

//         const imageUrlString = (imageUrl as { secure_url: string }).secure_url;    

        
        


    

//       await prisma.post.create({

//       data: {
        
//         id : Math.floor(Math.random() * 1000000),
        
//         title: title as string || "",
//         content: content as string || "",
      
//         imageUrl : mediaFile,
//         mediaType: (file.type.startsWith("image/") ? "IMAGE" : (file.type.startsWith("video/"))? "VIDEO" : "TEXT"),
//         //userId : session.user.id ,
//         createdAt: new Date(),
//         updatedAt : new Date(),
//         thumbnail: formData.get("thumbnail")?.toString() || "",
//         price: priceInCents,

//         user: {
//         connect: {
//           id: session.user.id
//         }
//       }


//       },

        
      
//     });

//    revalidatePath("/"),

//    redirect("/")

     
//   }


  
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

// import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary (Ensure these environment variables are set in production)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Helper to extract Cloudinary Public ID from a full secure URL.
 * Example: https://cloudinary.com -> sample
 */
function getPublicIdFromUrl(url: string): string | null {
  try {
    const parts = url.split("/");
    const uploadIndex = parts.indexOf("upload");
    if (uploadIndex === -1) return null;

    // Grab everything after '/upload/vXXXXXX/' or '/upload/'
    const remainingParts = parts.slice(uploadIndex + 1);
    if (remainingParts[0].startsWith("v") && !isNaN(Number(remainingParts[0].substring(1)))) {
      remainingParts.shift(); // Remove the version string if present
    }

    const publicIdWithExtension = remainingParts.join("/");
    return publicIdWithExtension.substring(0, publicIdWithExtension.lastIndexOf("."));
  } catch (error) {
    console.error("Failed to parse Cloudinary URL:", error);
    return null;
  }
}

export async function deletePost(
  id: string,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  if (!id) {
    return { success: false, message: "Post id is required." };
  }

  try {
    // 1. Fetch the post first to retrieve the stored image URL
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!post) {
      return { success: false, message: "Post not found." };
    }

    // 2. If an image exists, extract its public ID and delete it from Cloudinary
    if (post.imageUrl) {
      const publicId = getPublicIdFromUrl(post.imageUrl);
      
      if (publicId) {

        await cloudinary.uploader.destroy(publicId, {resource_type : "raw"});

<<<<<<< HEAD
        await cloudinary.uploader.destroy(publicId);

=======
      
>>>>>>> cfbbc6d3664ba0d41b085aea20450438e4e9bb0b
      }
    }

    // 3. Delete the post from your database
    await prisma.post.delete({
      where: { id: Number(id) },
    });

  } catch (error) {
    console.error("[deletePost]", error);
    return {
      success: false,
      message: "Failed to delete post or its assets.",
    };
  }


  revalidatePath("/posts");
  redirect("/");
}
