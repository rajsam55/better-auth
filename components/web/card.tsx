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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">

      

      {posts.map((post) => (

        <div
          key={post.id}
          className="relative w-full h-48 md:h-64 lg:h-120 rounded-lg overflow-hidden flex flex-col justify-center items-center mx-auto 
           bg-muted hover:bg-muted/50 transition"
        >
          <p className="text-black/7 text-center text-bold ">
              {post.content}
            </p>
          

          <Link href= {`/dashboard/${post.id}`} className="block relative group">

          <img
            src={post.imageUrl}
            alt= {post.title}           
                     
            
            
            className="rounded-lg objectfit-cover w-[350px] h-[250px] transition group-hover:scale-105"
            
            
          />
          <div className="group-hover:opacity-100 transition">
            <p className="text-dark font-bold text-2xl text-center mt-4 font-medium truncate">
              {post.title}
            </p>

            <p className="text-black/7 text-center text-bold ">
              {post.content}
            </p>
            
          </div>
          </Link>
        </div>
      ))}
      
    </div>
    
  );
}