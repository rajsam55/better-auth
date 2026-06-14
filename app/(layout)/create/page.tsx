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

    <div className="">

    <form action = {actionForm} className="flex flex-col items-center justify-center mx-auto">
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
          <Input name = "content" type="text" placeholder="Content" required />
          
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