import axios from 'axios'

async function login (request) {
  let res;

  try {
    res = await axios.post('/API/user/login', request)
  } catch(e) {
    return {
      res: {
        result: false,
        errMsg: 'Unable to connect to server'
      },
      token: null
    }
  }

  return {
    res: res.data,
    token: res.headers['x-auth']
  }
}

async function regist (request) {
  let res;

  try {
    res = await axios.post('/API/user/', request)
  } catch (e) {
    return {
      res: {
        result: false,
        errMsg: 'Unable to connect to server'
      },
      token: null
    }
  }

  return {
    res: res.data,
    token: res.headers['x-auth']
  }
}

async function checkAuth (token) {
  let res;

  try {
    res = await axios({
        method: 'get',
        url: '/API/user/',
        headers: {
          'x-auth': token
        }
      })
  } catch (e) {
    return {
      res: {
        result: false,
        errMsg: 'Unable to connect to server'
      },
      token: null
    }
  }

  return {
    res: res.data,
    token: res.headers['x-auth']
  }
}

export default {
  login,
  regist,
  checkAuth,
}
