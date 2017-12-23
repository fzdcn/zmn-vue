import axios from 'axios'
import {API_BASE, DEBUG} from '../config/const'
import store from '../store'
import router from '../router'
import {showAlert} from  '../functions'

let config = {
  baseURL: API_BASE,
}
const instance = axios.create(config)

function bindAccessToken(params) {
  let accessToken = store.getters.accessToken
  accessToken && (params['access-token'] = accessToken)
}

/**
 * @param data
 * @param resolve
 * @param invalidTokenRedirect 登录失效后是否需要跳转到登录页
 */
function resolveResponse(data, resolve, invalidTokenRedirect = true) {
  switch (data.status) {
    case 401:
      store.dispatch('userSignOut')
      if (invalidTokenRedirect) {
        showAlert('登录失效，需重新登录')
        router.push({name: 'login'})
      }
      break
    case 422:
      showAlert(data.errors[0].message)
      break
    case 500:
      !DEBUG ? showAlert('系统繁忙') : showAlert('系统错误:' + data.message)
      break
    default:
      resolve(data)
      break
  }
}

function rejectResponse(data, reject) {
  !DEBUG ? showAlert('网络繁忙') : showAlert('系统错误:' + data)
  reject(data)
}

class HttpResource {
  static install(Vue) {
    Vue.prototype.$httpGet = HttpResource.httpGet
    Vue.prototype.$httpPost = HttpResource.httpPost
  }

  /**
   * @param url
   * @param params
   * @param invalidTokenRedirect 登录失效后是否需要跳转到登录页
   * @returns {Promise}
   */
  static httpGet(url, params, invalidTokenRedirect = true) {
    bindAccessToken(params)
    return new Promise((resolve, reject) => {
      instance.get(url, {params: params})
        .then(({data}) => {
          resolveResponse(data, resolve, invalidTokenRedirect)
        }, (data) => {
          rejectResponse(data, reject)
        })
    })
  }

  /**
   * @param url
   * @param params
   * @param invalidTokenRedirect 登录失效后是否需要跳转到登录页
   * @returns {Promise}
   */
  static httpPost(url, params, invalidTokenRedirect = true) {
    store.dispatch('pageLoadingUpdate', true)
    bindAccessToken(params)
    let formData = params

    if (!(params instanceof FormData)) {
      formData = new FormData()
      for (let key of Object.keys(params)) {
        // 过滤掉 null
        formData.append(key, params[key] !== null ? params[key] : '')
      }
    }
    return new Promise((resolve, reject) => {
      instance.post(url, formData)
        .then(({data}) => {
          resolveResponse(data, resolve, invalidTokenRedirect)
          store.dispatch('pageLoadingUpdate', false)
        }, (data) => {
          rejectResponse(data, reject)
          store.dispatch('pageLoadingUpdate', false)
        })
    })
  }
}

export default HttpResource
