"use server"

import BlogPostCard from "@/components/web/card"
import prisma from "@/lib/prisma"
import type { Prisma } from "@/src/generated/prisma/client"

const postSelect = {
  id: true,
  title: true,
  content: true,
  imageUrl: true,
  userId: true,
} as const

type PostListItem = Prisma.PostGetPayload<{ select: typeof postSelect }>







const getData = async (): Promise<PostListItem[]> => {

  return prisma.post.findMany({ select: postSelect })
}



export default async function Home() {



  const posts =  await getData()









  return (


    <div className="py-12">


    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20">


    {posts.map((post)=>(



      <div className="flex flex-col justify-center items-center mx-auto  " key = {post.id}>


        <div className="flex flex-col gap-2 mt-4 justify-center items-center ">

        <BlogPostCard post={post} />


        </div>

        




      </div>







    ))}









    </div>
      
    </div>
  );
}
