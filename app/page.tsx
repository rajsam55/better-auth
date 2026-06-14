"use server"


import { ImageFeed } from "@/components/web/card";
import Header from "@/components/web/header"
import SubHeaderPage from "@/components/web/SubHeader";
import SubHeader from "@/components/web/SubHeader";
import { TextFeed } from "@/components/web/TextCard";
import UpperHeader from "@/components/web/UpperHeaderSection";
import { VideoFeed } from "@/components/web/videoCard";
import { getHomePosts } from "@/lib/posts";














export default async function Home() {



  const { imagePosts, videoPosts } = await getHomePosts();




  









  return (


    <div className="flex flex-col justify-center items-center">

      <div className="bg-[#0066cc] ">   


        <Header/>




      </div>    
      

    


        <div className="bg-[#0066cc] mt-4">

          <ImageFeed posts = {imagePosts}/>       



        </div>     

        

        <div className="">

        <UpperHeader/>

          



        </div>

        <div className="">

        <SubHeaderPage/>

        
        </div>

        <div className="">

          videos


          
        </div>

        
        
        
        </div>





    
      
    
  );
}
