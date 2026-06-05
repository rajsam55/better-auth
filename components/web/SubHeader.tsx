import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeftCircleIcon, CircleCheckBig } from 'lucide-react'










const SubHeaderPage = () => {






  return (
    


    <div className="flex flex-col gap-4 justify-center items-center bg-blue-500 shadow-md p-4 overflow-hidden mx-auto lg:w-[1300px]">

      <CircleCheckBig className = "text-white"/>


      <h1 className="text-2xl font-bold text-white">We Guarantee Your Success</h1>

      <div className="mx-auto px-4 sm:px-6">

      <p className="text-white text-center">An Essay written so professional you might think it's from a published author!</p>

      </div>

      <Button variant= "ghost" className ="bg-green-500 hover:bg-green-600 text-white rounded-lg">Have a Look</Button>


      


    


    </div>
    
 
    
    
  )
}

export default SubHeaderPage
