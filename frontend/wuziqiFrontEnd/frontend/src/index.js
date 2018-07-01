// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue';
import router from './routes/';
import {axiosService} from './gameInit';
import store from './store/'
// import api from './api/'  //api函数
Vue.prototype.axiosService = axiosService;
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }//此处的components用在了上面的template里面用来编译
})

