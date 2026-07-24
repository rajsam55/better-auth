

import prisma from "@/lib/prisma";
import { sendMailchimpResetEmail } from "./auth-emails";
import { nextCookies } from "better-auth/next-js";
import mailchimpTransactional from "@mailchimp/mailchimp_transactional";

import { headers } from "next/headers";


import {prismaAdapter}  from "better-auth/adapters/prisma"
import {admin}  from "better-auth/plugins"
import {betterAuth, User} from "better-auth"




const mailchimp = mailchimpTransactional(process.env.MAILCHIMP_TRANSACTIONAL_API_KEY || "")



export const  auth = betterAuth({

  database: prismaAdapter(prisma, {

    provider: "postgresql",
  }), 

  

 
 
  
  
  emailAndPassword : {
    enabled: true,
  },

  // typed as any to accept whatever payload the library provides (avoid mismatch with SendResetEmailProps)
  sendResetPassword: async ({ user, url }: { user: User; url: string; resetToken?: string }) => {

    await mailchimp.messages.send({

      message : {

        from_email : "onboarding@super-english.vercel.com",

        subject : "reset your password",

        html : `<a href="${url}">to reset your password</a>`,

        to : [{email : user.email, type : "to"}]


      }

    })    
    
  },  

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



