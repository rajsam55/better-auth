"use server"


import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { v2 as cloudinary } from "cloudinary";

const allowedAvatarUrls = [
  "/avatars/english-teacher-amelia.svg",
  "/avatars/english-teacher-ben.svg",
  "/avatars/english-teacher-clara.svg",
  "/avatars/english-teacher-daniel.svg",
  "/avatars/english-teacher-eva.svg",
  "/avatars/english-teacher-finn.svg",
];










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

const avatarUrl = formData.get("avatarUrl");

if (typeof avatarUrl === "string" && allowedAvatarUrls.includes(avatarUrl)) {
  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      image: avatarUrl,
    },
  });

  redirect("/userProfile/userDetails");
}

const files = formData.getAll("media") as File[];

const file = files[0]

if (!file || file.size === 0) {
  redirect("/userProfile/createProfileImage");
}

const arrayBuffer = await file.arrayBuffer();
const buffer = Buffer.from(arrayBuffer);

const image = await new Promise((resolve, reject) => {
  // use 'auto' so various file types are accepted (matches cloudinary types)
  cloudinary.uploader.upload_stream({ resource_type: 'auto', folder: 'nextjs' }, (error, results) => {
    if (error) return reject(error);

    resolve(results);
  }).end(buffer);
});



const imageUrlString = (image as { secure_url: string }).secure_url;    






    
    

      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          image: imageUrlString,
        },
      });  

     redirect("/userProfile/userDetails");
     
  }
