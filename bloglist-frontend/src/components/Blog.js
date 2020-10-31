import React, { useState } from 'react'
import './css/Blog.css'

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
        Likes: {blog.likes} &nbsp;
        <button>
          Like
        </button>
      </div>
      <button onClick={toggleBlogDetailsVisibility}>
        {isDetailsVisible ? 'Close Details' : 'View Details'}
      </button>
    </div>
  )

}

export default Blog
