import { VideoFeed } from '@/components/web/videoCard'
import { getHomePosts } from '@/lib/posts'
import React from 'react'













const Videos = async () => {

  
  const { videoPosts } = await getHomePosts()







  return (



    <div className = "mx-auto flex flex-col gap-4 justify-center items-center h-screen-100 p-4 bg-gray-100 rounded-lg shadow-md">



    <VideoFeed posts = {videoPosts}/>

    
    </div>



  )
}

export default Videos