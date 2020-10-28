import React, { useState } from "react";


import "./css/BlogEntryForm.css";

import { useToasts } from "react-toast-notifications";

import blogService from "../services/blogs.js";



const BlogEntryForm = ({ refreshBlogList, user }) => {

    const [title,setTitle] = useState("");
    const [url,setUrl] = useState("");
    const [isVisible,setIsVisible] = useState(false);

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

    const toggleFormVisibility = () => {
        setIsVisible(!isVisible);
    }


    return (<div>
        <form onSubmit={handleAddBlogSubmit} className={isVisible ? "" : "hidden"}>
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
      <button onClick={toggleFormVisibility} className={isVisible ? "" : "hidden"}>
          Hide
      </button>
      <button onClick={toggleFormVisibility} className={isVisible ? "hidden" : ""}>
          Add new blog
      </button>
        </div>)


}



export default BlogEntryForm;