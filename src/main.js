import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/common.css'
import axios from 'axios'
// 设置默认接口基准地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 把axios添加到vue原型上面去  等于挂载  以后组件用 就可以之间（this.$axios ）
Vue.prototype.$axios = axios
// axios 拦截器每次请求的时候拦截一下，添加一些数据
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
