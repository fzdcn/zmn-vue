import {LOCAL_STORAGE_VERSION} from '../config/const'

class LocalStorage {
  static install(Vue) {
    Vue.prototype.$localSet = LocalStorage.localSet
    Vue.prototype.$localGet = LocalStorage.localGet
    Vue.prototype.$localRemove = LocalStorage.localRemove
  }

  /**
   * 本地保存
   * @param key
   * @param value
   */
  static localSet(key, value) {
    window.localStorage.setItem('_ld_' + key, JSON.stringify(value))
  }

  /**
   * 本地取数据
   * @param key
   * @param defaultValue
   * @returns {*}
   */
  static localGet(key, defaultValue) {
    let storeValue = JSON.parse(window.localStorage.getItem('_ld_' + key))
    return storeValue ? storeValue : defaultValue
  }

  /**
   * 删除
   * @param key
   */
  static localRemove(key) {
    window.localStorage.removeItem('_ld_' + key)
  }
}

let storageVersion = LocalStorage.localGet('ls_version', -1)
// 版本不一致清除所有localStorage
if (storageVersion != LOCAL_STORAGE_VERSION) {
  window.localStorage.clear()
  LocalStorage.localSet('ls_version', LOCAL_STORAGE_VERSION)
}

export default LocalStorage
