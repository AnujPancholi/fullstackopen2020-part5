import React, { useState, useEffect } from 'react'
//components
import BlogListing from './components/BlogListing.js'
import LoginForm from './components/LoginForm.js'


import CONSTANTS from './lib/constants.js'

import { ToastProvider } from 'react-toast-notifications'

const App = () => {

  const [user,setUser] = useState(null)

  useEffect(() => {
    const currentLoginBlob = localStorage.getItem(CONSTANTS.LS_LOGIN_NAME)
    let currUser = null
    try{
      if(currentLoginBlob){
        currUser = JSON.parse(currentLoginBlob)
        setUser(currUser)
      }
    }catch(e){
      console.error('USER|ERROR|MALFORMED USER BLOB',e)
    }
  },[])

  console.log('STATE: USER: ',user)

  return user===null ? (
    <div>
      <ToastProvider>
        <LoginForm setUser={setUser} />
      </ToastProvider>
    </div>
  ) : (
    <ToastProvider>
      <BlogListing user={user} setUser={setUser} />
    </ToastProvider>
  )
}

export default App