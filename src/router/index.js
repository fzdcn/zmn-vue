/**
 * Created by Tome on 2018/1/22.
 */
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/modules/index'

Vue.use(Router)
const Home = () => import('../pages/app/Home');
const Login = () => import('../pages/login/Login');
const Register = () => import('../pages/login/Register');
const ForgetPassword = () => import('../pages/login/ForgetPassword');
const ShoppingIndex = () => import( '../pages/shopping-index/ShoppingIndex');
const City = () => import( '../pages/city/City');
const Search = () => import( '../pages/search/Search');
const StoresIndex = () => import( '../pages/stores-index/StoresIndex');
const PersonalCenter = () => import( '../pages/personal-center/PersonalCenter');
const OrderIndex = () => import( '../pages/order-index/OrderIndex');
const BenefitLife = () => import('../pages/app/benefit-life/Index');
const DomesticServiceEvaluate = () => import('../pages/app/domestic-service-evaluate/Index');

const routes = [
  {path: '/', redirect: {name: 'home'}},
  {path: '/login', name: 'login', component: Login, meta: {auth: false}},
  {path: '/shopping-index', name: 'shopping-index', component: ShoppingIndex, meta: {auth: false, keepAlive: true}},
  {path: '/register', name: 'register', component: Register, meta: {auth: false}},
  {path: '/forget-password', name: 'forget-password', component: ForgetPassword, meta: {auth: false}},
  {path: '/home', name: 'home', component: Home, meta: {auth: false, keepAlive: true}},
  {path: '/city', name: 'city', component: City, meta: {auth: false}},
  {path: '/search', name: 'search', component: Search, meta: {auth: false}},
  {path: '/stores-index', name: 'stores-index', component: StoresIndex, meta: {auth: false}},
  {path: '/personal-center', name: 'personal-center', component: PersonalCenter, meta: {auth: true, keepAlive: true}},
  {path: '/order-index', name: 'order-index', component: OrderIndex, meta: {auth: true, keepAlive: true}},
  {path: '/home/benefit-life-detail/:id', name: 'benefit-life-detail', component: BenefitLife, meta: {auth: false}},
  {
    path: '/home/domestic-service-evaluate',
    name: 'DomesticServiceEvaluate',
    component: DomesticServiceEvaluate,
    meta: {auth: false, keepAlive: true}
  }
];

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
