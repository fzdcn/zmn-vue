import Vue from 'vue'
import router from '../router'

/**
 * 显示alert
 * @param msg
 * @param type
 */
export function showAlert(msg, type = 'error') {
  alert(msg);
}

/**
 * 判断是否是微信浏览器
 * @returns {boolean}
 */
export function isWeChat() {
  let ua = navigator.userAgent.toLowerCase()
  return (ua.match(/MicroMessenger/i) == "micromessenger")
}

/**
 * 设置网页 title
 * @param title
 */
export function setTitle(title) {
  // 正常网页设置title
  document.title = title
  // 微信设置title
  let mobile = navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod/.test(mobile)) {
    let iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    // 替换成站标favicon路径或者任意存在的较小的图片即可
    let iframeCallback = function () {
      setTimeout(function () {
        iframe.removeEventListener('load', iframeCallback)
        document.body.removeChild(iframe)
      }, 0)
    }
    iframe.addEventListener('load', iframeCallback)
    document.body.appendChild(iframe)
  }
}

/**
 * 返回上一步
 */
export function goBack() {
  if (window.history.length > 1) {
    window.history.go(-1)
  } else {
    router.push({name: 'home'})
  }
}

/**
 * 页面中平滑滚动
 * @param querySelect 选择器
 * @param index 第几个
 * @param offset 偏移量
 */
export function jump(querySelect = 'body', index = 0, offset = 0) {
  let jump = document.querySelectorAll(querySelect)
  let total = jump[index].offsetTop + offset
  let distance = document.documentElement.scrollTop || document.body.scrollTop
  // 平滑滚动，时长500ms，每10ms一跳，共50跳
  let step = total / 20
  if (total > distance) {
    smoothDown()
  } else {
    let newTotal = distance - total
    step = newTotal / 20
    smoothUp()
  }
  function smoothDown() {
    if (distance < total) {
      distance += step
      document.body.scrollTop = distance
      document.documentElement.scrollTop = distance
      setTimeout(smoothDown, 10)
    } else {
      document.body.scrollTop = total
      document.documentElement.scrollTop = total
    }
  }

  function smoothUp() {
    if (distance > total) {
      distance -= step
      document.body.scrollTop = distance
      document.documentElement.scrollTop = distance
      setTimeout(smoothUp, 10)
    } else {
      document.body.scrollTop = total
      document.documentElement.scrollTop = total
    }
  }
}

export function requestGet(name) {
  let result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
  if (result == null || result.length < 1) {
    return "";
  }
  return result[1];
}
