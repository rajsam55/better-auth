import React from 'react'
import { Button } from '../ui/button'
import { CircleCheckBig } from 'lucide-react'

import Link from "next/link"










const SubHeaderPage = () => {






  return (
    


    <div className="flex flex-col gap-4 justify-center items-center shadow-md p-4  mx-auto lg:w-[1300px] lg:h-[300px] bg-[#0066cc] border-[1px] mt-4">

      <CircleCheckBig className = "text-white"/>


      <h1 className="text-2xl font-bold text-white">We Guarantee Your Success</h1>

      <div className="mx-auto px-4 sm:px-6">

      <p className="text-white text-center">An Essay written so professional you might think it's from a published author!</p>

      </div>

      <Link href = "/essays"><Button variant= "ghost" className ="bg-green-500 hover:bg-green-600 text-white rounded-lg">Have a Look</Button></Link>


      


    


    </div>
    
 
    
    
  )
}

export default SubHeaderPage
