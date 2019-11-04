import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }
  ]
})

// 路由拦截
router.beforeEach(function (to, from, next) {
  // 判断是否去login
  if (to.path === '/login') {
    next()
    return false
  }
  let local = localStorage.getItem('token')
  if (local) {
    next()
  } else {
    next('/login')
  }
})

export default router
