



import  {MediaType}  from "@prisma/client";



import prisma from "@/lib/prisma";








export const docSelect = {
  id: true,
  name: true,
  imageUrl: true,
  mediaType: true,
  userId :true,
  fileUrl : true,  
  createdAt: true,
  updatedAt : true,  
  postId : true,
  price : true,
  
  
  
  
} as const;

/** Two parallel queries run via Promise.all — one round-trip */
export async function getHomeDocuments() {
  const [textDocuments] = await Promise.all([

    

  

  prisma.document.findMany({
      where: ({ mediaType: MediaType.TEXT } as any),
      
      select: docSelect,
    }),

    


  ]);



  return { textDocuments };

}


/** Type inference from the Prisma select shape */
export type DocItem = Awaited<
  ReturnType<typeof prisma.document.findMany>>[number]

  

