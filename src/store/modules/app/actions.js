/**
 * Created by Tome on 2018/1/22.
 */
import {
  USER_SIGN_IN,
  USER_SIGN_OUT,
  USER_UPDATE,
  REMEMBER_LOGIN_REDIRECT,
  PAGE_LOADING_UPDATE
} from './mutation-type'

export const userSignIn = ({commit}, user) => {
  commit(USER_SIGN_IN, user)
};
export const userSignOut = ({commit}) => {
  commit(USER_SIGN_OUT)
};
export const userUpdate = ({commit}, user) => {
  commit(USER_UPDATE, user)
};

export const rememberLoginRedirect = ({commit}, windowHref) => {
  commit(REMEMBER_LOGIN_REDIRECT, windowHref)
};

export const pageLoadingUpdate = ({commit}, isShow) => {
  commit(PAGE_LOADING_UPDATE, isShow)
};
