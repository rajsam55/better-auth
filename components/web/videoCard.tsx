"use client"

import Image from "next/image";
import type { PostItem } from "@/lib/posts";
import Link from "next/link";


function fmtDuration(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

interface Props {
  posts: PostItem[];
}

export function VideoFeed({ posts }: Props) {


  if (!posts.length)
    return <p className="text-muted-foreground">No videos yet.</p>;

 
      




  return (


    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto h-100w-full ">
      {posts.map((post) => (

        <div
          key={post.id}
          className="rounded-lg overflow-hidden bg-muted hover:bg-muted/50 transition mx-auto flex flex-col justify-center items-center "
        >

          <Link href= {`/videoDash/${post.id}`} className="block relative group">

          <video controls className=" rounded-lg mt-4 transition group-hover:scale-105 w-[350px] h-[250px]">
            <source src={post.imageUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          
          

        

          


          
          </Link>
          
          
          
          
        </div>
      ))}
      
    </div>    



    
  );
}


// {post.thumbnail && (
//               <Image
//                 src={post.thumbnail}
//                 alt=""
//                 fill
//                 className="object-cover"
//                 sizes="160px"
//               />
//             )}


{/* <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-[1200px] mx-auto bg-white-100 p-4 rounded-lg">
      {posts.map((post) => (
        <article
          key={post.id}
          className="flex flex-col justify-center items-center gap-4 items-start rounded-xl p-3 hover:bg-muted transition group w-[350px] h-[150px]"
        >

          <Link href={`/videoDash/${post.id}`} className="block relative group">     
          {/* Thumbnail with play badge */}



//           <div className="relative shrink-0 w-40 aspect-video rounded-lg overflow-hidden bg-muted ">

//           <h2 className="text-center">{post.title}</h2>

//             {post.thumbnail ? (
//               <Image
//                 src={post.thumbnail} fill />
//             ) : (
//               <div className="flex items-center justify-center w-full h-full bg-muted">
//                 <span className="text-sm text-muted-foreground">No thumbnail</span>
//               </div>
//             )}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-80">
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M5.633 7.633a9 9 0 1 0 10.737 10.737L5.633 7.633zm5.205 0a2.25 2.25 0 1 1-3.182 3.182l3.182-3.182z" />
//                 </svg>
//               </div>

//               </div>

//               <div className="">

//                 <p className="text-sm text-muted-foreground">{fmtDuration(post.duration)}</p>   

                

//                 </div>

//                 <div className="">

//                 <video controls className="w-full h-auto rounded-lg">
//                   <source src={post.imageUrl} type="video/mp4" />
//                   Your browser does not support the video tag.
//                 </video>

                



//                 </div>

//                 <p className="text-sm  text-red-500">{post.content}</p>


          

                


//             </div>
//           </Link>        
    
//     </article>


        
//       ))}

      
//     </div>
//  */}

