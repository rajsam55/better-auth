"use client"
import Image from "next/image";








const Header = () => {










  return (


    <div className=" w-full max-w-7xl mt-2 gap-4 ">





    <div className = "relative w-full h-48 relative w-full h-48 mt-8 max-w-3xl w-[300px] sm:w-[300px] sm:h-64 md:w-[600px] md:h-[400px] lg:w-[1200px] lg:h-[500px  rounded-lg p-4 bg-gray-100 shadow-md mx-auto overflow-hidden">

    <Image src="/mainimage.avif" alt="Main Image" className=" ]"  fill/>
        
        
        
    </div >

    <div className=" rounded-lg py-6 bg-[#f0f0f0] mx-auto flex justify-center items-center">
      
      
      
      <h1 className="text-3xl  text-black tracking-tight mb-6 h-auto ] text-center">Start Planning Your Journey !</h1>      



    </div>
  
        
   </div>
  )
}

export default Header