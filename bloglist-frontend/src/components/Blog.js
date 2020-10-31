import React, { useState } from 'react'
import { useToasts } from 'react-toast-notifications'

import blogService from '../services/blogs.js'

import './css/Blog.css'


const LikesContainer = ({ likesCount, blogId }) => {
  const [likes,setLikes] = useState(likesCount || 0)

  const { addToast } = useToasts()

  const addLike = () => {
    (async() => {
      try{
        const likeAdditionResult = await blogService.addLikeToBlog(blogId)

        setLikes(likes+1)

      }catch(e){
        addToast(e.message || 'AN UNKNOWN ERROR OCCURRED',{
          appearance: 'error',
          autoDismiss: true
        })
      }
    })()
  }

  return (<>
    Likes: {likes} &nbsp;
    <button onClick={addLike}>
          Like
    </button>
  </>)
}


const Blog = ({ blog }) => {
  const [isDetailsVisible,setIsDetailsVisible] = useState(false)


  const detailsClassNames = isDetailsVisible ? '' : 'hidden'

  const toggleBlogDetailsVisibility = () => {
    setIsDetailsVisible(!isDetailsVisible)
  }



  return (
    <div className="blog-container">
      <div className="blog-title">
        {blog.title}<br />
        by {blog.author}
      </div>
      <div className={detailsClassNames}>
        <hr />
        Blog URL: {blog.url}<br />
        <LikesContainer likesCount={blog.likes} blogId={blog.id} />
      </div>
      <button onClick={toggleBlogDetailsVisibility}>
        {isDetailsVisible ? 'Close Details' : 'View Details'}
      </button>
    </div>
  )

}

export default Blog
