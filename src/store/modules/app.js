function setUser(state, user) {
  window.localStorage.setItem('user', JSON.stringify(user))
  window.localStorage.setItem('accessToken', user.access_token)
  state.user = user
  state.accessToken = user.access_token
}

const state = {
  user: JSON.parse(window.localStorage.getItem('user')),
  accessToken: window.localStorage.getItem('accessToken'),

  loginRedirect: window.sessionStorage.getItem('loginRedirect'),

  pageLoading: false
}

export const USER_SIGN_IN = 'USER_SIGN_IN' // 登录
export const USER_SIGN_OUT = 'USER_SIGN_OUT' // 退出登录
export const USER_UPDATE = 'USER_UPDATE' // 用户更新

export const REMEMBER_LOGIN_REDIRECT = 'REMEMBER_LOGIN_REDIRECT' // 记住登录后跳转的地址

export const PAGE_LOADING_UPDATE = 'PAGE_LOADING_UPDATE' // pageLoading的显示影藏

const actions = {
  userSignIn: ({commit}, user) => {
    commit(USER_SIGN_IN, user)
  },
  userSignOut: ({commit}) => {
    commit(USER_SIGN_OUT)
  },
  userUpdate: ({commit}, user) => {
    commit(USER_UPDATE, user)
  },

  rememberLoginRedirect: ({commit}, windowHref) => {
    commit(REMEMBER_LOGIN_REDIRECT, windowHref)
  },

  pageLoadingUpdate: ({commit}, isShow) => {
    commit(PAGE_LOADING_UPDATE, isShow)
  }
}

const getters = {
  user: state => state.user,
  username: state => state.username,
  accessToken: state => state.accessToken,

  loginRedirect: state => state.loginRedirect,

  pageLoading: state => state.pageLoading
}

const mutations = {
  [USER_SIGN_IN](state, user) {
    setUser(state, user)
  },
  [USER_SIGN_OUT](state) {
    state.user = null
    state.username = null
    state.accessToken = null
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('accessToken')
  },
  [USER_UPDATE](state, user) {
    setUser(state, user)
  },

  [REMEMBER_LOGIN_REDIRECT](state, windowHref){
    window.sessionStorage.setItem('loginRedirect', windowHref)
    state.loginRedirect = windowHref
  },

  [PAGE_LOADING_UPDATE](state, isShow) {
    state.pageLoading = isShow
  },
}

export default {
  state,
  actions,
  getters,
  mutations
}
