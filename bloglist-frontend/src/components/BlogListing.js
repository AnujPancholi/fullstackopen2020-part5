import React, { useState, useEffect } from "react";

import Blog from "./Blog.js";

import CONSTANTS from "../lib/constants.js";

import blogService from "../services/blogs.js";

const BlogListing = ({user,setUser}) => {

    const [blogs,setBlogs] = useState([]);

    useEffect(() => {
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )  
      }, [])

    const logout = () => {
        localStorage.removeItem(CONSTANTS.LS_LOGIN_NAME);
        setUser(null);
    }


    return (<div>
        <p>Hello, {user.username} <button onClick={logout}>logout</button> </p>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>)
}

export default BlogListing;