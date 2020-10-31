import axios from 'axios'
const baseUrl = '/api/blogs'

const blogsAxios = axios.create({
  baseURL: baseUrl
})

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addNewBlog = (blogDetails,token) => {
  return new Promise((resolve,reject) => {
    (async() => {
      try{
        const blogAdditionResult = await blogsAxios({
          method: 'POST',
          url: '/',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          data: blogDetails
        })

        resolve(blogAdditionResult.data)

      }catch(e){
        if(e.response){
          reject(e.response.data)
        } else if(e.request){
          reject({
            message: 'NO RESPONSE FROM SERVER'
          })
        } else {
          reject({
            method: 'AN ERROR OCCURRED'
          })
        }
      }
    })()
  })
}

const addLikeToBlog = (blogId) => {
  return new Promise((resolve,reject) => {
    (async() => {
      try{
        const blogAddLikeResult = await blogsAxios({
          method: 'PUT',
          url: `/${blogId}`,
          data: {
            '$inc': {
              'likes': 1
            }
          }
        })
      }catch(e){
        if(e.response){
          reject(e.response.data)
        } else if(e.request){
          reject({
            message: 'NO RESPONSE RECEIVED FROM SERVER'
          })
        } else {
          reject({
            message: 'AN ERROR OCCURRED'
          })
        }
      }
    })()
  })
}


export default { getAll, addNewBlog, addLikeToBlog }