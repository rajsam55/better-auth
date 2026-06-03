"use client"
import Image from "next/image";








const Header = () => {










  return (


    <div className="  w-full mx-auto flex flex-col justify-center items-center p-4 bg-gray-100 rounded-lg shadow-md  ">


    <div className="relative w-full h-48 md:h-[300px] lg:h-[500px] flex flex-col justify-center items-center">




    <Image src= "/mainimage.avif" alt="Main Image" fill className = "objectfit-cover mt-10 rounded-lg" />


    </div>    

        


      
      
      
      <h1 className="text-3xl text-black tracking-tight
      
      text-center">Start Planning Your Career!!!</h1>   

      


    
    </div>


  
        
   
  )
}

export default Header