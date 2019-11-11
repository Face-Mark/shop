import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Users from '../views/users/Users.vue'
import Roles from '../views/rights/Roles.vue'
import Goods from '../views/production/Goods.vue'
import Params from '../views/production/Params.vue'
import Rights from '../views/rights/Rights.vue'
import Categories from '../views/production/Categories.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        { path: '/users', component: Users },
        { path: '/roles', component: Roles },
        { path: '/goods', component: Goods },
        { path: '/params', component: Params },
        { path: '/rights', component: Rights },
        { path: '/categories', component: Categories }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }
  ]
})

// 解决路由重复点击的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

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
