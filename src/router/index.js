import Vue from 'vue'
import VueRouter from 'vue-router'
// 异步组件
const Home = () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
const Login = () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
const Users = () => import(/* webpackChunkName: "user" */ '../views/users/Users.vue')
const Roles = () => import(/* webpackChunkName: "right" */ '../views/rights/Roles.vue')
const Goods = () => import(/* webpackChunkName: "production" */ '../views/production/Goods.vue')
const Params = () => import(/* webpackChunkName: "production" */ '../views/production/Params.vue')
const Rights = () => import(/* webpackChunkName: "right" */ '../views/rights/Rights.vue')
const Categories = () => import(/* webpackChunkName: "production" */ '../views/production/Categories.vue')

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
