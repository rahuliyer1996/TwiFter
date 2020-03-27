import axios from 'axios'

import store from '@/store'

// Get logined user self's basic information
async function getBasicInfo() {
  let token = store.getters.authToken
  let res

  try {
    res = await axios({
      method: 'GET',
      url: '/API/user/info',
      headers: {
        'x-auth': token
      }
    })

    return res.data
  } catch (e) {
    return {
      result: false,
      errMsg: 'Unable to connect to server'
    }
  }
}

// Get logined user self's and following's posts
async function getPosts() {
  let token = store.getters.authToken
  let res

  try {
    res = await axios({
      method: 'GET',
      url: '/API/user/posts',
      headers: {
        'x-auth': token
      }
    })

    return res.data
  } catch (e) {
    return {
      result: false,
      errMsg: 'Unable to connect to server'
    }
  }
}

export default {
  getBasicInfo,
  getPosts
}
