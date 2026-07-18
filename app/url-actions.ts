
"use server"

import prisma  from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function uploadUrl(formData: FormData) {
  // Extract the URL field from the form
  const rawUrl = formData.get("url")
  
  // Server-side validation
  if (!rawUrl || typeof rawUrl !== "string") {
    return { error: "A valid URL string is required." }
  }

  try {
    // Basic validation to confirm format
    new URL(rawUrl) 
    
    // Save string directly to the Neon database
    await prisma.post.create({
      data: {
        url: rawUrl,
      },
    })

    // Bust the cache for the page displaying the links
    revalidatePath("/") 
    return { success: true }

  } catch (err) {
    return { error: "Invalid URL format or database connection error." }
  }
}
