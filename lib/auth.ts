

import prisma from "@/lib/prisma";
import {Resend} from "resend"
import { nextCookies } from "better-auth/next-js";


import { headers } from "next/headers";


import {prismaAdapter}  from "better-auth/adapters/prisma"
import {admin}  from "better-auth/plugins"
import {betterAuth, User} from "better-auth"




const resend = new Resend(process.env.RESEND_API_KEY);


export const  auth = betterAuth({

  database: prismaAdapter(prisma, {

    provider: "postgresql",
  }),  
  
  
  emailAndPassword : {
    enabled: true,
  },

  

  

  


  // typed as any to accept whatever payload the library provides (avoid mismatch with SendResetEmailProps)

  // sendResetPassword: async ({ user, url }) => {
  //     await resend.emails.send({
  //       from: "better-english <onboarding@resend.dev>", // Replace with your verified domain
  //       to: user.email,
  //       subject: "Reset your password",

  //       react : forgotEmailPassword({name : user.name, resetUrl : url, userEmail : user.email}) 
  //     });

  //   },
  
            
          

  trustedOrigins: ["https://vercel.app", process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ""],

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
      },
    },
  },
});



