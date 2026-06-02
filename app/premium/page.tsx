"use server"



import { auth } from "@/lib/auth"
import { headers } from "next/headers"



const PremiumPage = async()=>{


    const session = await auth.api.getSession({

        headers : await headers()

    })

    

        


        if (!session) {
           return <div>Please subscribe to view this content</div>;
        }

        return <div className="">Welcome to the Premium Lounge!</div>
       

}

export default PremiumPage