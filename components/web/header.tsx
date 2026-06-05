"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import  Link  from "next/link";








const Header = () => {










  return (


    <div className="bg-[#0066cc] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 py-10 lg: h-[600px] lg:w-full sm: h-70 shadow-md mx-auto p-4 mb-6 flex sm:mx-auto  ">




      <div className="flex flex-col justify-center gap-8 mx-auto mb-6">

      <h1 className = "text-white text-3xl font-bold">Get essays that pass.<br/> Hassle-free Here!</h1>
      <p className="text-white line-height : 2">If you have got time, we can help you write better essays,<br/> to get you the best grades.</p>
      
      
      
      <p className="line-height :2 text-white">
        
        From saving you time, we've got you covered.<br/>
       We do it all here & treat you right!


     </p> 
      

      <div className="flex gap-4 mt-4 ">
        <Link href= "/get-started"><Button variant = "default" className = "bg-green-300 p-3">Get Started</Button></Link>
        <Link href="/learn-more"><Button variant = "outline">Learn More</Button></Link>
        
        
      </div>
    

    </div>


    <div className=" relative  h-[200px] sm: w-[400px] md:h-70 lg:h-105 ml-4 lg:w-[550px] rounded-lg overflow-hidden flex flex-col justify-center items-start mx-auto 
           bg-muted hover:bg-muted/50 transition px-4 mb-2">


      <Image src="/learn-english.jpg" alt="Header Image"  className="object-cover rounded-lg shadow-md" fill/>



    </div>
  



    



    </div>


  
        
   
  )
}

export default Header