import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React from 'react'
import { faqAction } from '../faq-actions'












const FaqCreate = () => {






return(


<div className="flex flex-col mx-auto justify-center items-center h-120">

    <form action = {faqAction} className="flex flex-col items-center justify-center lg:w-[500px] w-80">
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create Faq</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Create Post
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Title</FieldLabel>
          <Input name ="question" type="text" placeholder="Question" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Content</FieldLabel>
          <Input name = "answer" type="text" placeholder="Answer" required />
          
        </Field>
        
        
        <Field>
          <Button type="submit">Create Faq</Button>
        </Field>
        
        
      </FieldGroup>

    </form>

    </div>

    
  )
}

export default FaqCreate



