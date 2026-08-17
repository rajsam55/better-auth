"use client"

import React from 'react'
import Link from "next/link"
import {DocItem} from "@/lib/docs"
import {Button}  from "@/components/ui/button"
import {useFormStatus}  from "react-dom"













const SuccessPage = ({documents} : Props) => {








  









  return (


    <div className = "h-50">

    <h1 className = "bg-gray-500 text-[12px]">Payment Successful</h1>

    

      <div key = {document.id} className = "">

      <p className = "bg-red-500">{document.name}</p>


      <Link href =  {`/textDash/${document.id}`} >

      Download
      
      </Link>



      </div>
        
    
    
    
    
    </div>
  )
}

export default SuccessPage