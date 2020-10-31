import React from 'react'
import './css/Blog.css'

const Blog = ({ blog }) => (
  <div className="blog-container">
    {blog.title}<br />
    by {blog.author}
  </div>
)

export default Blog
