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
import { getHomeDocuments } from "@/lib/docs";



import { Hero5 } from "@/components/ui/hero-5";
















export default async function Home() {



  const { imagePosts, videoPosts, textPosts } = await getHomePosts();

  const { textDocuments } = await getHomeDocuments();



  








  return (


    <div className=" w-full max-w-9xl">

      <div className="bg-gray300 ">   


        <Header/>




      </div>    
      

    


        <div className="bg-white mt-4 w-full max-w-9xl">

          <ImageFeed posts = {imagePosts} />       



        </div>

        <div className="mt-2 w-full max-w-9xl">

        <SubHeaderPage/>

        
        </div>

        

        


        <div className="w-full max-w-9xl">

      <TextFeed  documents = {textDocuments}/>


        </div>


        

        

        
        <div className="w-full max-w-9xl">

        <UpperHeader/>

          



        </div>

        <div className="w-full max-w-9xl">

        <VideoFeed  posts = {videoPosts}/>


          
        </div>

        <div className="w-full max-w-9xl">

        <FaqSection/>

        

          
        </div>

        
        


        
        
        
        </div>





    
      
    
  );
}
