
import Vue from 'vue'
import VueRouter from 'vue-router'

// 第三步 引入组件

import home from './components/home/home.vue'
import login from './components/login/login.vue'
import users from './components/users/users.vue'
import roles from './components/roles/roles.vue'
import rights from './components/rights/rights.vue'

Vue.use(VueRouter)

// 实列化路由
const router = new VueRouter({
  // 第二部 规则
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    {
      path: '/home',
      component: home,
      children: [{ path: '/users', component: users },
        { path: '/roles', component: roles },
        { path: '/rights', component: rights }]
    }

  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    localStorage.getItem('token') ? next() : next('login')
  }
})
// 导出路由 + 挂载
export default router
