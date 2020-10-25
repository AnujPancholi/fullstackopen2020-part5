import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addNewBlog = (blogDetails,token) => {
  return new Promise((resolve,reject) => {
    (async() => {
      try{
        const blogAdditionResult = await axios({
            method: "POST",
            url: `http://localhost:3001/api/blogs`,
            headers: {
              "Authorization": `Bearer ${token}`
            },
            data: blogDetails
          });

          resolve(blogAdditionResult.data);

      }catch(e){
        if(e.response){
          reject(e.response.data);
        } else if(e.request){
          reject({
            message: "NO RESPONSE FROM SERVER"
          })
        } else {
          reject({
            method: "AN ERROR OCCURRED"
          })
        }
      }
    })();
  })
}

export default { getAll, addNewBlog }