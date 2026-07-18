"use client"

import { useState}  from 'react'

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













const CreatePost = () => {

  const [price, setPrice] = useState("")

  const handlePriceChange = (value: string) => {
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setPrice(value);
    }
  }
   




  return (

    <div className="flex flex-col mx-auto justify-center items-center h-160">

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
          <FieldLabel htmlFor="name">Price</FieldLabel>
          <Input  placeholder = "0.00" name = "price" type = "number"
           mode = "decimal" id = "price" value= {price}

          onChange = {(e)=>setPrice(e.target.value)}

          required
          
          
          
          
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="name">Url</FieldLabel>
          <Input name ="url" type="url" placeholder="url"  />
        </Field>
        
        

        
        <Field>
          <FieldLabel htmlFor="email">Content</FieldLabel>
          <textarea name = "content" placeholder="Content" required className = "text-sm line-clamp-3" ></textarea>
          
        </Field>
        <Field>
          <FieldLabel htmlFor="">File</FieldLabel>
          <Input type ="file" name = "media"  accept = "image/*,video/*, .text/*, .pdf/*" multiple required />
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