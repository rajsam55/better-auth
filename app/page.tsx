"use server"


import { ImageFeed } from "@/components/web/card";
import Header from "@/components/web/header"
import SubHeader from "@/components/web/SubHeader";
import { TextFeed } from "@/components/web/TextCard";
import { VideoFeed } from "@/components/web/videoCard";
import { getHomePosts } from "@/lib/posts";













export default async function Home() {



  const { imagePosts, videoPosts } = await getHomePosts();




  









  return (


    <div className="py-8">

      <Header/>


    <div className="">


      <div className="flex flex-col justify-center items-center gap-12">


        <div className=" border-[1px] border-gray-100 rounded-lg">

        <ImageFeed  posts ={imagePosts} />



        </div>

        <div className="">

        <SubHeader/>



        </div>

        

        <div className="mt-4 border-[1px] border-gray-300 rounded-lg">

          <VideoFeed posts = {videoPosts}/>



        </div>
        
        
        </div>





    </div>
      
    </div>
  );
}
