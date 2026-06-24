"use client"

import Link from "next/link"
import { Button } from "../ui/button"

import { HomeIcon, Menu, UserIcon, X } from "lucide-react"


import {signOut, useSession}  from "@/lib/auth-client"












const Navbar = () => {
  
  const {data : session}   = useSession()
  
   










  return (
    

    <div className="flex justify-between mt-6 h-20 items-center
     mx-auto bg-[#0066cc] w-full max-w-9xl">


      <div className="">

        <Link href= "/">

        <HomeIcon size ={18} className = "text-white mx-2"/>

        </Link>

        </div>      


        {(session?.user as { role?: string } | undefined)?.role === "ADMIN" ?


<div className=""> 


     <Link href="/create">
      <Button variant="default" className = "bg-[#0066cc]" >
        Create
      </Button>
    </Link>

    <Link href="/faq-create">
      <Button variant="default" className = "bg-[#0066cc]" >
        Faq
      </Button>
    </Link>


    <Link href="/userProfile/createProfileImage/">
      <Button variant="default" className = "bg-[#0066cc]" >
        Profile
      </Button>
    </Link>
    <Link href="/userProfile/userDetails/">
      <Button variant="default" className="bg-[#0066cc]">
        Users
      </Button>
    </Link>
    <Link href="/files">
      <Button variant="default" className="bg-[#0066cc]">
        Files
      </Button>
    </Link>
    <Link href="/pdfConvert" >
      <Button variant="default" className="bg-[#0066cc]">
        Pdf
      </Button>
    </Link>

    </div>  
    
    : 

    <div className="">

    <Link href="/essays">
      <Button variant="default" className="bg-[#0066cc]">
        Essay
      </Button>
    </Link>

    <Link href="/contact">
      <Button variant="default" className="bg-[#0066cc]">
        Contact
      </Button>
    </Link>

    </div>


        
        } 

      


    <div className="flex gap-2">

      {session?.user?.id && (
      <Link href={`/userProfile/${session.user.id}`} >
        {session.user.image ? (
          <Button className="bg-[#0066cc] text-white ">
            <img
              src={session.user.image}
              width={32}
              height={32}
              alt={session.user.name ?? "User"              
              }
              className = ""
            />
          </Button>
        ) : (
          <UserIcon className="mt-1 text-white" />
        )}
      </Link>
    )}
  


    

    {(session?.user as { role?: string } | undefined)?.role === "ADMIN" && (
      <span className="mt-1 text-white">{session?.user.name}</span>
    )}

    {session ? (
      <Button variant = "default" className = "bg-[#0066cc]"
        onClick={() => {
          
          signOut()
        }}
      
        
      >
        Logout
      </Button>
    ) : (
      <>
        <Link href="/sign-in">
          <Button className = "bg-[#0066cc]">
            SignIn
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button variant="default" className = "bg-[#0066cc]" >
            SignUp
          </Button>
        </Link>
      </>
    )}

    </div>
      
  


    </div>

  )

}

  

export default Navbar
