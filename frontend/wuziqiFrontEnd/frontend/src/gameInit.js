// 各种api
// 负责和服务端进行交互

import axios from 'axios';
import store from './store'


const front = axios.create(); //前台axios实例
// back.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.headers.common['Authorization'] = 'dailu';
front.defaults.headers.post['Content-Type'] = 'application/json';
front.defaults.baseURL = 'http://127.0.0.1:3009';

if (localStorage.getItem('jwt')) {
  /* localStorage.getItem('jwt')是带引号的字符串
    Bearer token(通过Authorization头部字段发送到服务端便于验证)的格式：Bearer XXXXXXXXXX
  */
  front.defaults.headers.common['Authorization'] = localStorage.getItem('jwt');
}
// axios拦截请求
// axios.interceptors.request.use = back.interceptors.request.use = front.interceptors.request.use;

front.interceptors.request.use(config => {
if (config.url.includes('auth')) {
  config.data.access_token = localStorage.getItem('jwt');
  // front.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('jwt').replace(/(^\")|(\"$)/g, '')
}
  return config
}, err => {
//   store.dispatch('showProgress',100)
  return Promise.reject(err)
});

// axios拦截响应
front.interceptors.response.use(response => {
//   store.dispatch('showProgress', 100)
  if (response.data.code == 401) {
    
  } else {
    
  }
  return response.data;
}, err => {
//   store.dispatch('showProgress', 100)
  return Promise.reject(err)
});


const axiosService = {
  // 注册
  localReg(data) {
    return front.post('/api/login/reg', data);
  },
  // 登录
  localLogin(data) {
    return front.post('/api/login/login', data)
  },
  // 获取用户信息
  getCoin(data) {
    return front.post('/api/user/auth/get_user_info', data)
  },

};
export {axiosService}
