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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 ">

      

      {posts.map((post) => (


        <div
          key={post.id}
          className="relative w-full h-100 md:h-110 lg:h-130 rounded-lg overflow-hidden flex flex-col justify-center items-center mx-auto 
           bg-muted hover:bg-muted/50 transition"
        >
          <p className="text-dark text-center text-3xl font-bold mt-4 ">
              {post.title}
            </p>
          

          <Link href= {`/dashboard/${post.id}`} className="block relative group">

          <img
            src={post.imageUrl}
            alt= {post.title}           
                     
            
            
            className="rounded-lg objectfit-cover w-[350px] h-[250px] transition group-hover:scale-105 mt-2"
            
            
          />
          <div className="group-hover:opacity-100 transition">
            <p className="font-semibold text-xl text-center mt-4">
              {post.content}
            </p>

            
            
          </div>
          </Link>
        </div>
      ))}
      
    </div>
    
  );
}