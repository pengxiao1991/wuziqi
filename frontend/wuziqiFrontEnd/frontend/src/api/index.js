// 各种api
// 负责和服务端进行交互

import axios from 'axios';
import store from '../store'

const back = axios.create(); //后台axios实例
const front = axios.create(); //前台axios实例

// back.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.headers.common['Authorization'] = 'dailu';
axios.defaults.headers.post['Content-Type'] = 'application/json'

if (localStorage.getItem('jwt')) {
  /* localStorage.getItem('jwt')是带引号的字符串
    Bearer token(通过Authorization头部字段发送到服务端便于验证)的格式：Bearer XXXXXXXXXX
  */
  back.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('jwt').replace(/(^\")|(\"$)/g, '')
}
// axios拦截请求
axios.interceptors.request.use = back.interceptors.request.use = front.interceptors.request.use;

front.interceptors.request.use(config => {
  store.dispatch('showProgress', 20)
  return config
}, err => {
  store.dispatch('showProgress',100)
  return Promise.reject(err)
});

// axios拦截响应
front.interceptors.response.use(response => {
  store.dispatch('showProgress', 100)
  return response
}, err => {
  store.dispatch('showProgress', 100)
  return Promise.reject(err)
});


export default {
  // 注册
  localReg(data) {
    return axios.post('/api/admin/reg', data)
  },
  // 登录
  localLogin(data) {
    return axios.post('/api/admin/login', data)
  },
  //获取文章列表{带分页获取}
  getArticleList(data) {
    return back.post('/api/article/lists', data);
  },
  // 不带分页获取文章
  getArticleLists(params) {
    return front.post('/api/article/articleLists', params);
  },
  // 根据classify获取文章列表
  getArticlesByClassify(params) {
    return front.post('/api/article/noAuthArtilcelists', params);
  },
  // 创建文章
  createArticle(params) {
    return back.post('/api/article/create', params);
  },
  // 删除一篇文章
  removeOneArticle(params) {
    return back.post('/api/article/remove', params);
  },
  // 根据postID获取一篇文章(带权限)
  getOneArticle(params) {
    return back.post('/api/article/onePage', params);
  },
  // 根据postID获取一篇文章(不带权限)
  getOneArticleNoAuth(params) {
    return front.post('/api/article/noAuth', params);
  },
  // 编辑一篇文章
  editArticle(params) {
    return back.post('/api/article/edit', params);
  },
  // 获取分类列表
  getClassify() {
    return back.get('/api/classify/lists');
  },
  getNoAuthClass() {
    return front.get('/api/classify/noAuth');
  },

  // 删除某一个分类
  removeClassifyList(params) {
    return back.post('/api/classify/remove', params);
  },
  // 添加分类
  addClassify(params) {
    return back.post('/api/classify/create', params);
  },

  // 编辑分类
  editClassfy(params) {
    return back.post('/api/classify/edit', params);
  }
}
