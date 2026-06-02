"use server"

import { Input } from "@/components/ui/input"
import prisma from "@/lib/prisma"

import Image from "next/image"






const UserData = async() => {

    const data = await prisma.user.findMany({

        select : {

            id : true,
            
            name: true,

            email : true,

            createdAt : true,
        },
                   
    })

    return data
    }

            

    




const UserDetails = async() => {


    const data = await UserData()








  return (




    <div className = "w-full h-screen flex justify-center items-center">



        <div className="w-1/2 h-1/2 bg-gray-100 rounded-lg shadow-lg flex flex-col justify-center items-center gap-6">



            <h1 className="text-3xl font-bold">User Details</h1>

            <p className="text-gray-600">This is where user details will be displayed.</p>

            <div className="w-full grid grid cols-1 md: grid-cols-2 lg:grid-cols-3 gap-4 w-full mx-4 bg-white shadow-md flex flex-col justify-center items-center gap-4 overflow-y-auto">
                {data.map((user:any) => (

                    <div key={user.id} className="relative flex flex-col justify-center items-center w-[30px] h-[30px] bg-gray-200 rounded-lg shadow-md gap-6">    

                        
                        <p className="text-sm text-gray-600">{user.name}</p>

                        
                    </div>

                ))} 

            </div>    
            

            
        </div> 




    </div>
                
  )
}

export default UserDetails