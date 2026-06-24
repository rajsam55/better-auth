"use client"
import { PostItem } from "@/lib/posts";
import Link  from "next/link";
import Image from "next/image"



interface Props {
  posts: PostItem[];
}

export function ImageFeed({ posts }: Props) {

  if (!posts.length)
    return <p className="text-muted-foreground">No photos yet.</p>;
  

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-4  h-screen-160 mb-6  w-full max-w-9xl">

      

      {posts.map((post) => (
      

        <div
          key={post.id}
          className=" relative h-62 w-100 overflow-hidden mx-auto mt-2 mb-4 flex flex-col justify-center items-center "
        >

          <Link href= {`/dashboard/${post.id}`} >

          <div className="h-62 w-100 relative mt-4">
          <p className="text-white text-center text-xl text-bold ">
              {post.title}
            </p>

            <Image src ={post.imageUrl} alt= "" fill/>

            






            <p className="text-white text-center text-xl text-bold ">
              {post.content}
            </p>       
            </div>
  

          

          </Link>     


          </div>             
      
      ))}

      
    </div>
    
  );
}