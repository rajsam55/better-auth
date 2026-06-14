"use client"
import { PostItem } from "@/lib/posts";
import Link  from "next/link";
import Image from "next/image";


interface Props {
  posts: PostItem[];
}

export function ImageFeed({ posts }: Props) {

  if (!posts.length)
    return <p className="text-muted-foreground">No photos yet.</p>;
  

  return (

    <div className="grid grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-screen-200 gap-4 ">

      

      {posts.map((post) => (

        <div
          key={post.id}
          className=" h-100 flex flex-col justify-center items-center mx-auto gap-4"
        >
          <p className="text-white text-center text-2xl  text-bold ">
              {post.title}
            </p>
          

          <Link href= {`/dashboard/${post.id}`} className="block relative group">

          <img
            src={post.imageUrl}
            alt= {post.content}           
                     
            
            
            className=" transition group-hover:scale-105 rounded-lg object-cover mt-2" fill
            
            
          />
          <div className="group-hover:opacity-100 transition">
            

            <p className="text-white text-xl text-center mt-2 ">
              {post.content}
            </p>
            
          </div>
          </Link>
        </div>
      ))}
      
    </div>
    
  );
}