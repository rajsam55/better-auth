"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { signOut, useSession } from "@/lib/auth-client"
import UserDetails from "@/app/userProfile/userDetails/page"
import Home from "@/app/page"
import { HomeIcon, ShoppingCart, UserIcon } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"


const Navbar = () => {

  const { data:  session } = useSession()












  return (


    <div className = "flex justify-between items-center gap-5 mx-auto mt-4 bg-[#0066cc] h-20" w-120>


    <div className="">

    <Link href = "/">

    <Button variant = "ghost" className = "bg-[#0066cc] text-white">


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

    


    {session?.user?.id && 
      <Link href={`/userProfile/${session.user.id}`}>
        {session.user.image ? <Button className = "bg-[#0066cc] text-white ">

          <img src = {session.user.image} width ={32}  height = {32} />
         
          
        </Button> :  <UserIcon className ="text-white mt-1"/> }
        
        
      </Link>}

        
      { (session?.user as { role?: string })?.role === "ADMIN"  && 

      <>

      

      <span className = "text-white mt-1"> {session?.user.name}</span>

      </>         
          
        }

             
        
      


      
    


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