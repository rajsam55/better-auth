"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { actionForm } from '@/app/actions'

const CreatePost = () => {
  const [price, setPrice] = useState("")
  const [loading, setLoading] = useState(false) // Added to track submission state

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Regex validation for decimals (e.g., 10.99)
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setPrice(value);
    }
  }

  const handleSubmit = async (formData: FormData) => {
    if (loading) return // Prevents execution if already running
    setLoading(true)
    
    try {
      await actionForm(formData)
    } catch (error) {
      console.error("Submission failed:", error)
    } finally {
      setLoading(false) // Re-enables the form
    }
  }

  return (
    <div className="flex flex-col mx-auto justify-center items-center h-160">
      {/* Changed action to execution wrapper to handle loading state */}
      <form action={handleSubmit} className="flex flex-col items-center justify-center lg:w-[500px] w-80">
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Create your Post</h1>
            <p className="text-sm text-balance text-muted-foreground">
              Create Post
            </p>
          </div>

          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input id="title" name="title" type="text" placeholder="Title" required />
          </Field>

          <Field>
            <FieldLabel htmlFor="price">Price</FieldLabel>
            {/* Kept type="text" or "number". Note: type="number" blocks regex validation in some browsers, text with inputMode is safer for regex */}
            <Input 
              id="price"
              name="price" 
              type="text" 
              inputMode="decimal"
              placeholder="0.00" 
              value={price}
              onChange={handlePriceChange}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="url">Url</FieldLabel>
            <Input id="url" name="url" type="url" placeholder="url" />
          </Field>
          
          <Field>
            <FieldLabel htmlFor="content">Content</FieldLabel>
            <textarea 
              id="content"
              name="content" 
              placeholder="Content" 
              required 
              className="text-sm line-clamp-3 w-full p-2 border rounded-md" 
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="media">File</FieldLabel>
            <Input id="media" type="file" name="media" accept="image/*,video/*,.txt,.pdf" multiple required />
            <FieldDescription>
              Upload files for your post.
            </FieldDescription>
          </Field>

          <Field>
            {/* The button is now disabled when loading is true */}
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Post"}
            </Button>
          </Field>  
        </FieldGroup>
      </form>
    </div>
  )
}

export default CreatePost
