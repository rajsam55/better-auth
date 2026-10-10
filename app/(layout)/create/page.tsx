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

import { CldUploadWidget } from "next-cloudinary"

//  interface CreatePostProps {
//   isAdmin?: boolean
// }




const CreatePost = ({isAdmin= true}: {isAdmin: boolean}) => {
  
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const [mediaType, setMediaType] = useState<"IMAGE" | "VIDEO" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading]  = useState(false);
  const [price, setPrice]  = useState("");
  const [accessType, setAccessType] = useState<"FREE" | "PAID">("FREE");

  
  
  

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Regex validation for decimals (e.g., 10.99)
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setPrice(value);
    }
  }
 
  const handleUploadSuccess = (result: any) => {
    const info = result?.info;
    if (info && info.secure_url) {
      setMediaUrl(info.secure_url);
      // Differentiate resource types provided by the Cloudinary response payload
      setMediaType(info.resource_type === "video" ? "VIDEO" : "IMAGE");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form  = e.currentTarget;
      const formData = new FormData(form);

       if (isAdmin) {
         formData.append("accessType", accessType);
       } else {
         formData.append("accessType", "FREE");
       }
      
      // Inject the Cloudinary media values into the submission stream
      if (mediaUrl && mediaType) {
        formData.append("mediaUrl", mediaUrl);
        formData.append("mediaType", mediaType);
      }

      await actionForm(formData);
      
      // Reset form on success
      form.reset();
      setMediaUrl("");
      setMediaType(null);
      setPrice("");
      setAccessType("FREE")      
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };








// const handleSubmit = async (formData: FormData) => {
//     if (loading) return // Prevents execution if already running
//     setLoading(true)
    
//     try {
//       await actionForm(formData)
//     } catch (error) {
//       console.error("Submission failed:", error)
//     } finally {
//       setLoading(false) // Re-enables the form
//     }
//   }


  

    

  return (

    <>


  


 <div className="flex flex-col mx-auto justify-center items-center h-180">
  {/* Changed action to execution wrapper to handle loading state */}
  <form onSubmit ={handleSubmit} className="flex flex-col items-center justify-center lg:w-[500px] w-80">
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

          
          { isAdmin && (

            <>
          <Field>

          <FieldLabel htmlFor="tier-access" className="block text-sm font-medium mb-2">
                Tier Access (Admin Only)
              </FieldLabel>

          <div className =  "flex gap-4">

            

            <Button

            type="button"
                  onClick={() => setAccessType("FREE")}
                  className={`flex-1 py-2 text-sm font-medium border rounded-md transition-colors ${
                    accessType === "FREE" ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"
                  }`}        
            
            >

              🔓 Free

            </Button>

            <Button


            type="button"
                  onClick={() => setAccessType("PAID")}
                  className={`flex-1 py-2 text-sm font-medium border rounded-md transition-colors ${
                    accessType === "PAID" ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  💰 Paid
              
            </Button>

            </div>

            {accessType === "PAID"  &&  (

            <div>

            

            <FieldLabel htmlFor="price">Price ($)</FieldLabel>

            

            
                  <Input 
                    id="price"
                    name="price" 
                    type="text" 
                    inputMode="decimal"
                    placeholder="0.00" 
                    value={price}
                    onChange={handlePriceChange}
                    required={accessType === "PAID"}
                    className="w-full mt-1"
                  />

            </div>

            

            )}            

            </Field>

          </>

          )}

      


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

      

    

      <div className="border-2 border-dashed border-gray-300  rounded text-center">
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onSuccess={handleUploadSuccess}
          options={{ sources: ["local", "url", "camera"], multiple: false }}
        >
          {({ open }) => (
            <Button
              type="button"
              onClick={() => open()}
              className="bg-black text-white  px-4 lg:w-[500px] w-80 border-radius: rounded-sm hover:bg-gray-600"
            >
              Upload Image or Video
            </Button>
          )}
        </CldUploadWidget>

        {/* Thumbnail Preview Area */}
        {mediaUrl && (
          <div className="mt-4 p-2 bg-gray-50 border rounded flex flex-col items-center">
            <p className="text-xs text-green-600 font-semibold mb-2">✓ Upload Ready!</p>
            {mediaType === "IMAGE" ? (
              <img src={mediaUrl} alt="Preview" className="h-16 object-contain rounded" />
            ) : (
              <video src={mediaUrl} controls className="h-16 object-contain rounded" />
            )}
          </div>
        )}

        


      </div>

     <Field>
  {/* The button is now disabled when loading is true */}
      <Button type="submit" disabled = {isSubmitting}>
      {isSubmitting? "saving to database..." : "Publish"}
        
       </Button>

       
      </Field>  
   </FieldGroup>

   
  </form>
   </div>



   </>
    
)
 }

 export default CreatePost























