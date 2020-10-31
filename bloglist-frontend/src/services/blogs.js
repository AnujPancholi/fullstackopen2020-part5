import axios from 'axios'
const baseUrl = '/api/blogs'

const blogsAxios = axios.create({
  baseURL: baseUrl
})

const getAll = async() => {

  const response =  await axios.get(baseUrl)

  const blogs = response.data;
  blogs.sort((b1,b2) => b2.likes-b1.likes)

  return blogs
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

        resolve(blogAddLikeResult.data)

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