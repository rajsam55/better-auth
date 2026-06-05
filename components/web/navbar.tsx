"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { signOut, useSession } from "@/lib/auth-client"
import { profile } from "console"
import UserDetails from "@/app/userProfile/userDetails/page"
import Home from "@/app/page"
import { HomeIcon, ShoppingCart } from "lucide-react"

const Navbar = () => {

  const { data: session } = useSession()












  return (


    <div className = " justify-between items-center mx-auto mt-4 bg-[#0066cc] h-25 flex flex-col sticky lg:flex-row">


    <div className="">

    <Link href = "/">

    <Button  className = "bg-[#0066cc] text-white">


      <HomeIcon size = {32}/>




    </Button>


    
    
    
    </Link>

    
    </div>


    <div className="">

    <Link href ="/create"><Button variant = "default" className = "bg-[#0066cc] text-white cursor-pointer">Create</Button></Link>

    <Link href ="/userProfile/createProfileImage/"><Button variant = "default" className = "bg-[#0066cc] text-white cursor-pointer">Profile </Button></Link>

    <Link href ="/userProfile/userDetails/"><Button variant = "default" className = "bg-[#0066cc] text-white cursor-pointer">Users </Button></Link>

    <Link href ="/files"><Button variant = "default" className = "bg-[#0066cc] text-white cursor-pointer">Files </Button></Link>

    <Link href ="/pdfConvert"><Button variant = "default" className = "bg-[#0066cc] text-white cursor-pointer">Pdf </Button></Link>



    



    </div>

    


    <div className="flex gap-2">

    <Link href="/contact">
          <Button variant = "default" className = "bg-green-400 p-4 text-white cursor-pointer">Contact Us</Button>
        </Link>


    {session && <Button className = "bg-[#0066cc] text-white ">{session.user?.name}</Button>}


    {session ? (
      <Button onClick={() => signOut()} className = "bg-[#0066cc] text-white cursor-pointer">Logout</Button>
    ) : (
      <>
        
        <Link href="/sign-in">
          <Button variant = "default" className = "bg-[#0066cc] text-white cursor-pointer">SignIn</Button>
        </Link>
        <Link href="/sign-up">
          <Button variant = "default" className = "bg-[#0066cc] text-white cursor-pointer">SignUp</Button>
        </Link>
      </>
    )}

    







    </div>













    </div>
  )
}

export default Navbar