import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user,setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const performLogin = (username,password) => {
    (async() => {
      console.log(`LOGIN CALLED: ${username}:${password}`);
    })();
  }

  return user===null ? (
    <div>
      <LoginForm performLogin={performLogin} />
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