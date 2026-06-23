"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import  Link  from "next/link";








const Header = () => {










  return (


    <div className="bg-[#0066cc] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-4 lg: h-[600px] shadow-md mx-auto mb-6 w-full max-w-7xl">




      <div className="flex flex-col justify-center items-start gap-4 mx-auto mb-6 ">

      <h1 className = "text-white text-3xl font-bold">Get essays that pass.<br/> Hassle-free Here!</h1>
      <p className="text-white line-height : 2 mx-2">If you have got time, we can help you write better essays,<br/> to get you the best grades.</p>
      
      
      
      <p className="line-height :2 text-white">
        
        From saving you time, we've got you covered.<br/>
       We do it all here & treat you right!


     </p> 

     
      
        <div className="flex gap-2">
        <Link href= "/get-started"><Button variant = "default" className = "bg-green-300 p-3">Get Started</Button></Link>
        <Link href="/learn-more"><Button variant = "outline">Learn More</Button></Link>
        </div>







      </div>

  
        
        
      
    

    
    <div className = " py-4 ">

    <div className=" relative h-62 w-100 mt-8 lg:h-90 md:h-70 rounded-lg overflow-hidden mx-auto bg-muted hover:bg-muted/50 transition  mb-2 flex flex-col justfy-center items-center ">


      <Image src="/learn-english.jpg" alt="Header Image" 

      className="object-cover rounded-lg shadow-md " 
      
      
      
      fill/>






    </div>
    </div>

    


    </div>  


  
        
   
  )
}

export default Header