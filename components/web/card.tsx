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

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4 h-screen-160 mb-6 p-2 w-full max-w-7xl">

      

      {posts.map((post) => (
      

        <div
          key={post.id}
          className=" relative h-60 w-100 overflow-hidden mx-auto mt-2 mb-8 flex flex-col justify-center items-center gap-24"
        >
          <p className="text-white text-center text-xl text-bold ">
              {post.title}
            </p>

             <Image src= {post.imageUrl}  alt= "blog"     

          

          
          className = " p-2 mt-6 mb-4 object-cover"
          fill
            
            
          />

           

            
          

          <Link href= {`/dashboard/${post.id}`} >

          

          

          </Link>


          <div className="text-white line-clamp-1 w-full max-w-[100px]">{post.content}</div>


          
          
      


          </div>       
          
          
      
      
      ))}

      
    </div>
    
  );
}