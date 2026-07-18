import { MediaType } from "@/src/generated/prisma/browser";
import prisma from "./prisma";








export const docSelect = {
  id: true,
  name : true,
  imageUrl: true,  
  mediaType: true,  
  userId :true,  
  fileUrl : true,  
  createdAt: true,
  updatedAt : true,  
  price : true,
  
  
  
  
} as const;

/** Two parallel queries run via Promise.all — one round-trip */
export async function getHomeDocs() {
  const [ textDocs] = await Promise.all([

    

  prisma.document.findMany({


     where :   ({ mediaType: MediaType.TEXT } as any),
      
      
      select: docSelect,
    }),

    


  ]);



  return {textDocs };

}


/** Type inference from the Prisma select shape */
export type DocItem = Awaited<
  ReturnType<typeof prisma.document.findMany>>[number]

  

