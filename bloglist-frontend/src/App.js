import React, { useState, useEffect } from 'react';
//components
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
//services
import blogService from './services/blogs.js';
import loginService from './services/login.js';

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
      try {
        const loginResult = await loginService.login(username,password);
        if(loginResult.data && loginResult.data.message){
          switch(loginResult.data.message){
            case "LOGIN SUCCESSFUL":
              setUser(loginResult.data);
              break;
            default: 
              throw new Error(loginResult.data.message);
              break;
          }
        } else {
          throw new Error(`MALFORMED RESPONSE FROM LOGIN SERVICE`);
        }

      } catch(e) {
        console.error(`performLogin|ERROR`,e);
      }

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