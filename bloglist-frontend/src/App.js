import React, { useState, useEffect } from 'react';
//components
import Blog from './components/Blog.js';
import LoginForm from './components/LoginForm.js';
//services
import blogService from './services/blogs.js';

import { ToastProvider } from "react-toast-notifications"; 

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user,setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  console.log(`STATE: USER: `,user);

  return user===null ? (
    <div>
      <ToastProvider>
        <LoginForm setUser={setUser} />
      </ToastProvider>
    </div>
  ) : (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App