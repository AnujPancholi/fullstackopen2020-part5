import React, { useState, useEffect } from "react";

import Blog from "./Blog.js";

import blogService from "../services/blogs.js";

const BlogListing = ({user}) => {

    const [blogs,setBlogs] = useState([]);

    useEffect(() => {
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )  
      }, [])


    return (<div>
        <p>Hello, {user.username}</p>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>)
}

export default BlogListing;