import Vue from 'vue';
import Toasted from 'vue-toasted';
import router from '../../router';
Vue.use(Toasted)
/**
 * 显示alert
 * @param msg
 * @param type
 */
export function showAlert(msg, type = 'error') {
  let option = {
    position: 'top-center',
    className: 'toast',
    fullWidth: true,
    duration: 2000, // 毫秒,
    theme: 'bubble', // ['primary', 'outline', 'bubble']
    type: type, // ['success', 'info', 'error']
  }
  Vue.toasted.show(msg, option);
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

/*
 *params: _this:当前vue的实例对象
 *params: htmlContent:下拉刷新布局,默认false
 *params: pageSize:当前分页显示数量,默认false
 *params: upAuto:是否在初始化时以上拉加载的方式自动加载第一页数据; 默认 false
 *params: emptyIcon:配置列表无任何数据的图片,默认false
 *params: empty:配置列表无任何数据的参数json,默认false
 *params: htmlNoData:无数据的布局,默认false
 * */
export function pageScroll(_this, pageSize, htmlContent, upAuto, emptyIcon, empty, htmlNoData) {
  pageSize = pageSize ? pageSize : 10;
  htmlContent = htmlContent ? htmlContent : '<p class="downwarp-tip" style="color: #00a84c;">下拉刷新</p><span style="text-align: center;width: auto"><img style="height: 1rem;" src="/static/images/loading.gif" alt="加载中..."</span>';
  emptyIcon = emptyIcon ? emptyIcon : '/static/images/blank_no_service@2x.png';
  empty = empty ? empty : {
    warpId: "mescroll",
    icon: emptyIcon,
    tip: "",
    btntext: "去逛逛 >",
    btnClick: function () {
      $route.push({name: 'home'});
    }
  }
  htmlNoData = htmlNoData ? htmlNoData : '<p class="upwarp-nodata" style="color:#00a84c;">--我是有底线的--</p>';
  // 创建 MeScroll 对象
  _this.mescroll = new MeScroll("mescroll", {
    down: {
      auto: false, // 是否在初始化完毕之后自动执行下拉回调 callback; 默认 true
      callback: _this.downCallback,//下拉刷新的回调
      offset: 50, // 在列表顶部,下拉大于50px,松手即可触发下拉刷新的回调
      htmlContent: htmlContent
    },
    up: {
      auto: !upAuto, // 是否在初始化时以上拉加载的方式自动加载第一页数据; 默认 false
      isBounce: false, // 是否允许ios的bounce回弹;默认true,允许回弹 (v 1.3.0新增)
      page: {
        num: 0, // 当前页 默认0,回调之前会加1; 即 callback(page) 会从1开始
        size: pageSize, // 每页数据条数
        time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
      },
      loadFull: {
        use: false, // 列表数据过少,不足以滑动触发上拉加载,是否自动加载下一页,直到满屏或者无更多数据为止;默认 false ,因为可通过调高 page.size 避免这个情况
        delay: 500 // 延时执行的毫秒数; 延时是为了保证列表数据或占位的图片都已初始化完成,且下拉刷新上拉加载中区域动画已执行完毕;
      },
      toTop: { // 配置回到顶部按钮
        src: "/static/images/mescroll-totop.png", // 默认滚动到1000px显示,可配置 offset 修改
        offset: 250
      },
      empty: empty, //配置列表无任何数据的提示,
      htmlNodata: htmlNoData,// 无数据的布局
      hardwareClass: "mescroll-hardware",
      htmlLoading: '<p style="width: 1rem;height: 1rem; text-align: center; " class="upwarp-tip"><img src="/static/images/loading.gif" alt="加载中..."></p>',// 上拉加载中的布局
      resetClass: "mescroll-downwarp-reset",// 下拉刷新高度重置的动画
      callback: _this.upCallback // 上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
    }
  });
}

// 星星等级
export const starLever = {
  star: [
    {
      // 无星级
      options: [
        '/static/images/lever-no.png',
        '/static/images/lever-no.png',
        '/static/images/lever-no.png',
        '/static/images/lever-no.png',
        '/static/images/lever-no.png'
      ]
    },
    {
      // 1星级
      options: [
        '/static/images/lever-all.png',
        '/static/images/lever-no.png',
        '/static/images/lever-no.png',
        '/static/images/lever-no.png',
        '/static/images/lever-no.png'

      ]
    },
    {
      // 2星级
      options: [
        '/static/images/lever-all.png',
        '/static/images/lever-all.png',
        '/static/images/lever-no.png',
        '/static/images/lever-no.png',
        '/static/images/lever-no.png'

      ]
    },
    {
      // 3星级
      options: [
        '/static/images/lever-all.png',
        '/static/images/lever-all.png',
        '/static/images/lever-all.png',
        '/static/images/lever-no.png',
        '/static/images/lever-no.png'
      ]
    },
    {
      // 4星级
      options: [
        '/static/images/lever-all.png',
        '/static/images/lever-all.png',
        '/static/images/lever-all.png',
        '/static/images/lever-all.png',
        '/static/images/lever-no.png'
      ]
    },
    {
      // 5星级
      options: [
        '/static/images/lever-all.png',
        '/static/images/lever-all.png',
        '/static/images/lever-all.png',
        '/static/images/lever-all.png',
        '/static/images/lever-all.png'
      ]
    }
  ]
}

export const SERVICE_NAME = {
  1005: '保洁',
  1006: '钟点工',
  1003: '保姆',
  1004: '护工',
  1002: '育婴师',
  1001: '月嫂'
}
export const SERVICE_CODE = {
  '保洁': 1005,
  '钟点工': 1006,
  '保姆': 1003,
  '护工': 1004,
  '育婴师': 1002,
  '月嫂': 1001
}
