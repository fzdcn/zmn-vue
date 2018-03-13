/**
 * Created by Tome on 2018/1/22.
 */
import {
  USER_SIGN_IN,
  USER_SIGN_OUT,
  USER_UPDATE,
  REMEMBER_LOGIN_REDIRECT,
  PAGE_LOADING_UPDATE
} from '../mutation-type'

function setUser(state, user) {
  window.localStorage.setItem('user', JSON.stringify(user));
  window.localStorage.setItem('accessToken', user.access_token);
  state.user = user;
  state.accessToken = user.access_token
}
export default {
  state: {
    user: JSON.parse(window.localStorage.getItem('user')),
    accessToken: window.localStorage.getItem('accessToken'),
    loginRedirect: window.sessionStorage.getItem('loginRedirect'),
    pageLoading: false
  },
  getters: {
    user: (state) => state.user,
    accessToken: (state) => state.accessToken,
    loginRedirect: state => state.loginRedirect,
    pageLoading: state => state.pageLoading
  },
  mutations: {
    [USER_SIGN_IN](state, user) {
      setUser(state, user)
    },
    [USER_SIGN_OUT](state) {
      state.user = null;
      state.accessToken = null;
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('accessToken');
    },
    [USER_UPDATE](state, user) {
      setUser(state, user)
    },

    [REMEMBER_LOGIN_REDIRECT](state, windowHref){
      window.sessionStorage.setItem('loginRedirect', windowHref);
      state.loginRedirect = windowHref
    },

    [PAGE_LOADING_UPDATE](state, isShow) {
      state.pageLoading = isShow
    },
  },
  actions: {
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
}
