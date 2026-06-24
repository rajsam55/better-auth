"use client"

import Image from "next/image";
import type { PostItem } from "@/lib/posts";
import Link from "next/link";
import { PlayIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio"






function fmtDuration(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}




interface Props {
  posts: PostItem[];
}

export  function VideoFeed({ posts }: Props) {



  if (!posts.length)
    return <p className="text-muted-foreground">No videos yet.</p>;






  

  
      




  return (


  //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto h-[600px] mt-4" w-full max-w-7xl>
  //     {posts.map((post) => (

  //       <div
  //         key={post.id}
  //         className="rounded-lg md:h-90 overflow-hidden bg-muted hover:bg-muted/50 transition mx-auto flex flex-col justify-center items-center "
  //       >

  //         <p className="mt-4 text-xl font-bold">{post.title}</p>

  //         <Link href= {`/videoDash/${post.id}`} className="block relative group">

          
          
  //         <video controls className=" rounded-lg mt-4 transition group-hover:scale-105 w-[350px] h-[250px]"  >
  //           <source src={post.imageUrl} type="video/mp4" />
  //         </video>  
  //         <p className="text-center font-light">{post.content}</p>
          


          
  //         </Link>

          
         
          
          
  //       </div>
  //     ))}
      
  //   </div>    



    
  // );








<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto bg-white-100 pb-4 mb-8 bg-[#0066cc] h-screen-200 w-full max-w-9xl">



  {posts.map(post=>(


    <div className="">

      <p className="text-center text-white">{post.title}</p>    


    

    <div className=" relative w-full h-48 flex flex-col justify-center items-center mt-2 ">


      
          

          <Link href = {`/videoDash/${post.id}`}>

          

          


        <Image src= "/videoplayer.png" alt="" fill

        className = "object-cover mt-2 mb-4"
        
        
        
        
        />
        

         
          
         </Link>


         

         </div>

         <p className="mx-auto text-white mt-4 text-[15px] line-clamp-1 w-full max-w-[100px]">{post.content}</p>    

         </div>












  ))}

  


      

         
      

</div>

      )

    }

  

    




