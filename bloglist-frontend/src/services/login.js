import axios from 'axios'
const baseUrl = '/api/login'

const loginAxios = axios.create({
  baseURL: baseUrl
})

const login = async (username = '',password = '') => {
  try{
    const loginAxiosResult = await loginAxios({
      method: 'POST',
      url: '/',
      headers: {
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`
      }
    })

    return {
      success: true,
      data: loginAxiosResult.data
    }
  } catch(e) {
    if(e.response){
      return {
        success: false,
        data: e.response.data
      }
    } else if(e.request){
      return {
        success: false,
        data: {
          'message': 'LOGIN SERVICE NOT RESPONDING'
        }
      }
    } else {
      return {
        success: false,
        data: {
          'message': e.message || 'COULD NOT MAKE REQUEST TO LOGIN SERVICE'
        }
      }
    }
  }
}

export default {
  login
}