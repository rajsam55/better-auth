"use server"

import { Input } from "@/components/ui/input"
import { useSession } from "@/lib/auth-client"
import prisma from "@/lib/prisma"
import { UserIcon } from "lucide-react"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { profile } from "node:console"
import { auth } from "@/lib/auth"








const UserData = async() => {

    

    const data = await prisma.user.findMany({

        select : {

            id : true,
            
            name: true,

            email : true,

            image : true,

            createdAt : true,

            updatedAt : true,

            
        },
                   
    })

    return data
    }

            

    




const UserDetails = async() => {


    


    const data = await UserData()

    const session = await auth.api.getSession({
    
          headers: await headers(),
    
        
    
    
        })
    
        if(!session){
    
          redirect("/sign-in")
    
        }

    








  return (




    <div className = "w-full h-screen flex justify-center items-center  ">



        <div className="w-1/2 h-1/2 bg-gray-100 rounded-lg shadow-lg flex flex-col justify-center items-center gap-6">



            <h1 className="text-3xl font-bold">User Details</h1>

            <p className="text-gray-600">This is where user details will be displayed.</p>

            <div className="w-full grid grid cols-1 md: grid-cols-2 lg:grid-cols-4 gap-12 w-full mx-auto bg-white shadow-md flex flex-col justify-center items-center gap-4">
                {data.map((user) => (

                    <div key={user.id} className="relative flex flex-col w-[150px] h-[180px] bg-gray-200 rounded-lg shadow-md gap-6">    

                        
                        <h2 className="text-sm text-gray-600">{user.name}</h2>

                        <p className="text-sm text-gray-600">{user.email}</p>

                        {session.user.image ?<img src={user.image} alt="blogImage" className="rounded-lg" width={32} height={32} />:

                        <UserIcon/>
                        
                        
                        
                        
                        }

                        
                    </div>

                ))} 

            </div>    
            

            
        </div> 




    </div>
                
  )
}

export default UserDetails