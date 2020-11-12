import React, { useState } from 'react'
import { useToasts } from 'react-toast-notifications'

import LikesContainer from './LikesContainer.js'

import blogService from '../services/blogs.js'

import './css/Blog.css'




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

  const addLike = () => {
    return new Promise((resolve,reject) => {
      (async() => {
        try{
          const likeAdditionResult = await blogService.addLikeToBlog(blog.id)
          resolve({
            isSuccessful: true
          })

        }catch(e){
          addToast(e.message || 'AN UNKNOWN ERROR OCCURRED',{
            appearance: 'error',
            autoDismiss: true
          })
          reject(e)
        }
      })()
    })
  }

  return (
    <div className="blog-container">
      <div className="blog-title" data-title={blog.title} data-blogid={blog.id}>
        {blog.title}<br />
        by {blog.author}
      </div>
      <div className={detailsClassNames}>
        <hr />
        Blog URL: {blog.url}<br />
        <LikesContainer likesCount={blog.likes} blogId={blog.id} addLike={addLike} />
        <button onClick={performBlogDelete} className={user && blog.user && blog.user.id===user.id ? '' : 'hidden'}>
          Delete
        </button>
      </div>
      <button onClick={toggleBlogDetailsVisibility} id={`blog-details-vis-button-${blog.id}`}>
        {isDetailsVisible ? 'Close Details' : 'View Details'}
      </button>
    </div>
  )

}

export default Blog
