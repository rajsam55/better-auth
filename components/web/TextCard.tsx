"use client"
import { PostItem } from "@/lib/posts";
import Link  from "next/link";
import Image from "next/image";


interface Props {
  posts: PostItem[];
}

export function TextFeed({ posts }: Props) {
  if (!posts.length)
    
    return <p className="text-muted-foreground">No text files
    
    
     yet.</p>;

  return (
    <div className="grid sm:grid-cols-1 md: grid-cols-2 lg:grid-cols-3 gap-2 mx-auto p-4 rounded-lg ">

      {posts.map((post) => (

        <div
          key={post.id}
          className="rounded-lg overflow-hidden w-[350px] h-[450px] flex flex-col justify-center items-center gap-4"
        >

          <Link href= {`/textDash/${post.id}`} className="block relative group">

          <p className="text-dark font-bold  text-2xl text-center mb-4 font-medium truncate">
              {post.title}
          </p>




          <div className="">

          <embed

            src={post.imageUrl} type = "text/pdf" className = "cursor-pointer transition group-hover:scale-105 w-[550px] h-[250px]"
            
            
            
            
          />
          </div>


          <div className="group-hover:opacity-100 transition">
            
            <p className="text-black/70 text-center text-md mt-6">
              {post.content}
            </p>
          </div>
          </Link>
        </div>
      ))}
      
    </div>
  );
}

