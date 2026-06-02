"use server"


import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { v2 as cloudinary } from "cloudinary";










export async function profileActionForm (formData: FormData){



    const session = await auth.api.getSession({

      headers: await headers(),

    


    })

    if (!session) {
      redirect("/sign-in");
      
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

        const profileImageurl = await new Promise((resolve, reject) => {
          // use 'auto' so various file types are accepted (matches cloudinary types)
          cloudinary.uploader.upload_stream({ resource_type: 'auto', folder: 'nextjs' }, (error, results) => {
            if (error) return reject(error);

            resolve(results);
          }).end(buffer);
        });

        

        const profileImageUrlString = (profileImageurl as { secure_url: string }).secure_url;    
        


    

      await prisma.profile.updateMany({

      data: {

        profileImageUrl: profileImageUrlString,        
        
      },

      where: {
        userId: session.user.id,
      }
    });

     redirect("/userProfile/userDetails")
     

     
  }
