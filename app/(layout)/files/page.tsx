import { TextFeed } from '@/components/web/TextCard'
import { getHomePosts } from '@/lib/posts';













const Files = async () => {


    const { textPosts } = await getHomePosts();
    






  return (



    <div>


    <TextFeed posts = {textPosts} />
        
        
        
        
        
        
    </div>
  )
}

export default Files