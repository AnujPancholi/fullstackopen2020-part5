import React, { useState } from 'react'


import './css/Blog.css'


const LikesContainer = ({ likesCount, blogId, addLike }) => {
  const [likes,setLikes] = useState(likesCount || 0)


  const handleAddLike = async() => {
    // (async() => {
    try {
      const likeAdditionResult = await addLike()
      if(likeAdditionResult.isSuccessful){
        setLikes(likes+1)
      }
    }catch(e){
      console.error('ERROR',e)
    }
    // })()
  }



  return (<>
    <span className="likes-display" id={`blog-likes-display-${blogId}`}>Likes: {likes}</span> &nbsp;
    <button className='like-button' onClick={handleAddLike} id={`blog-like-button-${blogId}`}>
            Like
    </button>
  </>)
}




export default LikesContainer