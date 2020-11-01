import React, { useState } from 'react'
import { useToasts } from 'react-toast-notifications'

import blogService from '../services/blogs.js'

import './css/Blog.css'


const LikesContainer = ({ likesCount, blogId }) => {
  const [likes,setLikes] = useState(likesCount || 0)

  const { addToast } = useToasts()

  const addLike = () => {
    (async() => {
      try{
        const likeAdditionResult = await blogService.addLikeToBlog(blogId)

        setLikes(likes+1)

      }catch(e){
        addToast(e.message || 'AN UNKNOWN ERROR OCCURRED',{
          appearance: 'error',
          autoDismiss: true
        })
      }
    })()
  }

  return (<>
      Likes: {likes} &nbsp;
    <button onClick={addLike}>
            Like
    </button>
  </>)
}




export default LikesContainer