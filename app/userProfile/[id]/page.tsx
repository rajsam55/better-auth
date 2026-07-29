"use server"

import prisma from "@/lib/prisma"
import {notFound} from "next/navigation"



interface  Props{

    
  
  params : Promise<{id : string}>
}








const ProfilePage = async({params}: Props) => {

    
  const {id}=  await params; 
    

    const user = await prisma.user.findUnique({

      where: {id},
      
      select: {
        id: true,
        image : true,
        
        name: true,
        email: true,
      },
    })

  if(!user){
    notFound()
  }











  return (


    <div className = "bg-white ">

    <h3 className="">Profile Image</h3>

    {user.image && (
      <img  src= {user.image} alt = "userImg" width ={32}  height = {32}/>
    )}  

    <h2 className="">{user.name}</h2>
    



     </div>
  )
}

export default ProfilePage









