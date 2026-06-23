import React from 'react'

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { actionForm } from '@/app/actions'
import { useSession } from '@/lib/auth-client'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'










const CreatePost = async() => {



  const session = await auth.api.getSession({
      
            headers: await headers(),
      
          
      
      
          })
      
          if (!session || session.user.role !== "ADMIN") {


          redirect("/unauthorized");
          
          }


  









  return (

    <div className="flex flex-col mx-auto justify-center items-center h-120">

    <form action = {actionForm} className="flex flex-col items-center justify-center lg:w-[500px] w-80">
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your Post</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Create Post
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Title</FieldLabel>
          <Input name ="title" type="text" placeholder="Title" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Content</FieldLabel>
          <textarea name = "content" placeholder="Content" required className = "text-sm line-clamp-3" ></textarea>
          
        </Field>
        <Field>
          <FieldLabel htmlFor="">File</FieldLabel>
          <Input type ="file" name = "media"  accept = "image/*,video/*, .text/*, .pdf" multiple required />
          <FieldDescription>
            Upload an image or video for your post.
          </FieldDescription>
        </Field>
        
        <Field>
          <Button type="submit">Create Post</Button>
        </Field>
        
        
      </FieldGroup>
    </form>
    </div>



    
     

    
  )
}

export default CreatePost