import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const Home = () => import('../pages/app/Home')
const Login = () => import('../pages/app/Login')

const GoodsShopHome = () => import('../pages/goods-shop/Home')

const routes = [
  {path: '/', redirect: {name: 'home'}},

  {path: '/login', name: 'login', component: Login, meta: {auth: false}},

  {path: '/home', name: 'home', component: Home, meta: {auth: false, keepAlive: true}},

  {path: '/shop-goods', name: 'shop-goods-home', component: GoodsShopHome, meta: {auth: false, keepAlive: true}},
]

let router = new Router({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

// 用户是否登录过滤
router.beforeEach(({meta, name, fullPath}, from, next) => {
  store.dispatch('pageLoadingUpdate', true)
  let {auth = true} = meta
  if (auth) {
    let isLogin = Boolean(store.getters.user)
    if (!isLogin && name !== 'login') {
      store.dispatch('rememberLoginRedirect', fullPath)
      return next({name: 'login'})
    }
  }
  next()
})

router.afterEach(() => {
  store.dispatch('pageLoadingUpdate', false)
})

export default router
