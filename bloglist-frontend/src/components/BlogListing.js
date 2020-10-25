import React, { useState, useEffect } from "react";

import Blog from "./Blog.js";

import CONSTANTS from "../lib/constants.js";

import blogService from "../services/blogs.js";

import { useToasts } from "react-toast-notifications";

const BlogEntryForm = ({ refreshBlogList, user }) => {

    const [title,setTitle] = useState("");
    const [url,setUrl] = useState("");

    const { addToast } = useToasts();

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    }

    const handleAddBlogSubmit = (event) => {
        (async() => {
            event.preventDefault();
            try{
                
                if(title.length===0 || url.length===0){
                    console.log("handleAddBlogSubmit err condition");
                    throw new Error("Fields cannot be empty");
                }

                const addBlogResult = await blogService.addNewBlog({
                    title: title,
                    url: url
                },user.token);

                addToast(`Blog "${title}" added`,{
                    appearance: "success",
                    autoDismiss: true,
                });

                refreshBlogList();

            }catch(e){
                console.error(`BlogEntryForm|ERROR`,e.message);
                addToast(e.message || "AN ERROR OCCURRED",{
                    appearance: "error",
                    autoDismiss: true,
                });
            }
        })();
    }


    return (<div>
        <form onSubmit={handleAddBlogSubmit}>
        <div>
          title
            <input
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          url
            <input
            type="text"
            value={url}
            name="URL"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">Add</button>
      </form>
        </div>)


}

const BlogListing = ({user,setUser}) => {

    const [blogs,setBlogs] = useState([]);

    const refreshBlogList = () => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }

    useEffect(() => {
         refreshBlogList(); 
      }, [])

    const logout = () => {
        localStorage.removeItem(CONSTANTS.LS_LOGIN_NAME);
        setUser(null);
    }


    return (<div>
        <p>Hello, {user.username} <button onClick={logout}>logout</button> </p>
        <BlogEntryForm refreshBlogList={refreshBlogList} user={user} />
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>)
}

export default BlogListing;