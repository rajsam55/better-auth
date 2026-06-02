"use client"

import { actionForm } from '@/app/actions'
import { profileActionForm } from '@/app/profile-actions'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'












const CreateProfileImage = () => {








  return (


    <div className = "py-10 ">


    <div className="flex flex-col justify-center items-center gap-6 w-2xl h-150 mx-auto ">

    <h2 className = "text-2xl font-semibold mt-10 text-center text-black">Upload Media</h2>       


    <form action= {profileActionForm}className="flex flex-col items-center justify-center mx-auto p-6 md:p-10 bg-gray-100 rounded-lg shadow-lg gap-10">


        <Label htmlFor= "file">Profile Image</Label>

        <input type="file" name = "media" accept="image/*" required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-blue-600" />

            
    

      


    <Button type="submit" className="mt-4 bg-black text-white px-4 py-2 rounded w-[250px] rounded-lg hover:bg-blue-600 transition-colors duration-300">


    Upload


    </Button> 






    </form>

    </div>
        
        
    
    
    
    
    
    
    
    
    </div>
  )
}

export default CreateProfileImage