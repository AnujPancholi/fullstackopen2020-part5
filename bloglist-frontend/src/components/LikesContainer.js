import React, { useState } from 'react'


import './css/Blog.css'


const LikesContainer = ({ likesCount, blogId, addLike }) => {
  const [likes,setLikes] = useState(likesCount || 0)


  const handleAddLike = () => {
    (async() => {
      try {
        const likeAdditionResult = await addLike()
        if(likeAdditionResult.isSuccessful){
          setLikes(likes+1)
        }
      }catch(e){
        console.error('ERROR',e)
      }
    })()
  }



  return (<>
      Likes: {likes} &nbsp;
    <button onClick={handleAddLike}>
            Like
    </button>
  </>)
}




export default LikesContainer