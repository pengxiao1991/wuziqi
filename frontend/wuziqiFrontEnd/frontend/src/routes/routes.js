

import login from '../components/login.vue';  // 登录模块
import home from '../components/home.vue';  // 游戏模块


export default [
  

  {
    //前台路由
    path: '/',
    component: login,
    
  },
  {
    //前台路由
    path: '/auth',
    children:[{
      path:'/home',
      component:home
    }]
    
  }
  //

  // {path:'/404',component:NotFound}
]
