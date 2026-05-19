"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { signOut, useSession } from "@/lib/auth-client"

const Navbar = () => {
  const { data: session } = useSession()












  return (


    <div className = "w-full max-w-[1200px] mx-4 flex justify-between items-center mx-auto mt-4 ">


    <div className="">

    <Link href = "/">

    <Button variant = "default">


        Home




    </Button>


    
    
    
    </Link>

    
    </div>


    <div className="">

    <Link href ="/create"><Button variant = "default">Create</Button></Link>

    



    </div>



    <div className="flex gap-2">

    {session && <Button>{session.user?.name}</Button>}


    {session ? (
      <Button onClick={() => signOut()}>Logout</Button>
    ) : (
      <>
        <Link href="/sign-in">
          <Button variant = "default">SignIn</Button>
        </Link>
        <Link href="/sign-up">
          <Button variant = "default">SignUp</Button>
        </Link>
      </>
    )}

    







    </div>













    </div>
  )
}

export default Navbar