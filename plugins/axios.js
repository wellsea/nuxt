import axios from 'axios'
import qs from 'qs'


// axios 配置
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = 'https://www.bjxcaifu.com/weChat/'

// POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  return Promise.reject(error)
})


// 返回状态判断
axios.interceptors.response.use((res) => {
  if (res.status === 200) {
    return res
  } else {
    return Promise.reject(res)
  }
}, (error) => {
  return Promise.reject(error)
})


export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export function get(url, params = {}) {

  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}


export default {
  getStatistics() {
    return get('/borrow/statistics/count')
  },
  getHomeInvest (params) {
    return post('/home/home/borrowIndexList', params)
  },
  getInvestDetail (params) {
    return post('/invest/investments/borrowerInfo', params)
  }
}
