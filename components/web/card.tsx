"use client"

import Link from "next/link"
import Image from "next/image"


interface IappProps {

  post : {

    id : string ,
    title : string,
    content : string,
    imageUrl : string
  }


}












const BlogPostCard = ({post}: IappProps ) => {











  return (



    <div className = "">

      <Link href = {`/dashboard/${post.id}`}>

      <div className=" h-48 w-full mx-4">

      <img src = {post.imageUrl} alt = "blogapp" className = " hover: transition-transform duration-300 scale-125 rounded-lg object-cover" width = {350} height ={150}/>


      </div>

      
      
      
      
      
      
      
      
      
      
      
      
      </Link>
      
      
      
      
      
      
      
      
    </div>
  )
}

export default BlogPostCard