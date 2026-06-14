import React from 'react'
import { Button } from '../ui/button'
import { CircleCheckBig } from 'lucide-react'

import Link from "next/link"










const SubHeaderPage = () => {






  return (
    


    <div className="flex flex-col justify-center items-center h-60">

      <CircleCheckBig className = "text-blue-500"/>


      <h1 className="text-2xl font-bold text-black mt-4">We Guarantee Your Success</h1>

      


      <div className="flex flex-col justify-center mx-auto ">

      <p className="text-black text-center mt-2">An Essay written so professional you might think it's from a published author!</p>

    




      </div>

      <Link href = "/essays"><Button variant= "ghost" className = "mt-4">Have a Look</Button></Link>


      


    


    </div>
    
 
    
    
  )
}

export default SubHeaderPage
