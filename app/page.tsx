"use server"


import { ImageFeed } from "@/components/web/card";
import {FaqSection} from "@/components/web/faqItem";
import {Header} from "@/components/web/header"
import SubHeaderPage from "@/components/web/SubHeader";
import SubHeader from "@/components/web/SubHeader";
import { TextFeed } from "@/components/web/TextCard";
import UpperHeader from "@/components/web/UpperHeaderSection";
import { VideoFeed } from "@/components/web/videoCard";
import { getHomePosts } from "@/lib/posts";



import { Hero5 } from "@/components/ui/hero-5";
















export default async function Home() {



  const { imagePosts, videoPosts, textPosts } = await getHomePosts();



  








  return (


    <div className=" w-full max-w-7xl">

      <div className="bg-gray300 ">   


        <Header/>




      </div>    
      

    


        <div className="bg-white mt-4 w-full max-w-7xl">

          <ImageFeed posts = {imagePosts} />       



        </div>

        <div className="mt-2">

        <SubHeaderPage/>

        
        </div>

        

        


        <div className="w-full max-w-7xl">

      <TextFeed posts = {textPosts} />


        </div>


        

        

        
        <div className="w-full max-w-7xl">

        <UpperHeader/>

          



        </div>

        <div className="">

        <VideoFeed  posts = {videoPosts}/>


          
        </div>

        <div className="">

        <FaqSection/>

        

          
        </div>

        
        


        
        
        
        </div>





    
      
    
  );
}
