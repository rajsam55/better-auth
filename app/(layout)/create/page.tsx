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










const CreatePost = () => {









  return (

    <div className="">

    <form action = {actionForm}className="flex flex-col min-h-svh w-full max-w-xl items-center justify-center mx-auto p-6 md:p-10">
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
          <FieldLabel htmlFor="password">ImageUrl</FieldLabel>
          <Input type ="text" name = "imageUrl"  required />
          <FieldDescription>
            Image
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