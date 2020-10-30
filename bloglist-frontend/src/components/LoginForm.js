import React, { useState } from 'react'

import loginService from '../services/login.js'

import CONSTANTS from '../lib/constants.js'

import { useToasts } from 'react-toast-notifications'

const LoginForm = ({ setUser }) => {

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = (event) => {
    event.preventDefault()
    performLogin(username,password)
  }


  const { addToast } = useToasts()

  const performLogin = (username,password) => {
    (async() => {
      console.log(`LOGIN CALLED: ${username}:${password}`)
      try {
        const loginResult = await loginService.login(username,password)
        if(loginResult.data && loginResult.data.message){
          if(loginResult.data.message==='LOGIN SUCCESSFUL'){
            setUser(loginResult.data)
            localStorage.setItem(CONSTANTS.LS_LOGIN_NAME,JSON.stringify(loginResult.data))
          } else {
            throw new Error(loginResult.data.message)
          }
        } else {
          throw new Error('MALFORMED RESPONSE FROM LOGIN SERVICE')
        }

      } catch(e) {
        console.error('performLogin|ERROR',e)
        addToast(e.message || 'AN UNKNOWN ERROR OCCURRED',{
          appearance: 'error',
          autoDismiss: true
        })
      }

    })()
  }


  return (<div>
    <form onSubmit={handleLogin}>
      <div>
          username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
          password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>)

}


export default LoginForm