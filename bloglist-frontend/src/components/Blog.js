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


const Blog = ({ blog, refreshBlogList, user }) => {
  const [isDetailsVisible,setIsDetailsVisible] = useState(false)

  const { addToast } = useToasts()

  const detailsClassNames = isDetailsVisible ? '' : 'hidden'

  const toggleBlogDetailsVisibility = () => {
    setIsDetailsVisible(!isDetailsVisible)
  }


  const performBlogDelete = () => {
    (async() => {
      try{
        const blogDeleteResult = await blogService.deleteBlog(blog.id,user.token)
        refreshBlogList()
        addToast('Blog deleted',{
          appearance: 'success',
          autoDismiss: true
        })
      }catch(e){
        addToast(e.message || 'AN UNKNOWN ERROR OCCURRED',{
          appearance: 'error',
          autoDismiss: true
        })
      }
    })()
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
        <button onClick={performBlogDelete} className={user && blog.user && blog.user.id===user.id ? '' : 'hidden'}>
          Delete
        </button>
      </div>
      <button onClick={toggleBlogDetailsVisibility}>
        {isDetailsVisible ? 'Close Details' : 'View Details'}
      </button>
    </div>
  )

}

export default Blog
