"use server"


import { Field, FieldGroup, FieldLabel, FieldDescription } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Button } from '@/components/ui/button'
import { uploadUrl } from '@/app/url-actions'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'













const CreatePremeuimLink = async() => {



  const session = await auth.api.getSession({
        
              headers: await headers(),
        
            
        
        
            })
        
            if (!session || session.user.role !== "ADMIN") {
  
  
            redirect("/unauthorized");
            
            }
  
  










  return (



    <div className="flex flex-col mx-auto justify-center items-center h-120">

    <form
      action={uploadUrl}
      className="flex flex-col items-center justify-center lg:w-[500px] w-80"
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your Link</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Create Link
          </p>
        </div>
        
        
        <Field>
          <FieldLabel htmlFor="">Premium</FieldLabel>
          <Input type = "text" placeholder = "url" accept = "urlString/*"/>
          
          <FieldDescription>
            Paste an url for your post.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="">Price</FieldLabel>
          <Input type = "number" placeholder = "price" />
          
          <FieldDescription>
            Price
          </FieldDescription>
        </Field>

        
        
        <Field>
          <Button type="submit">Create url Image</Button>
        </Field>
        
        
      </FieldGroup>
    </form>
    </div>




    
  )
}

export default CreatePremeuimLink