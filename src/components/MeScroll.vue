<template>
  <div id="mescroll" class="mescroll" :style="containerStyle">
    <slot name="topContent"></slot>
    <slot name="meScroll" :dataList="dataList"/>
    <slot name="bottomContent"></slot>
  </div>
</template>

<script>
  import MeScroll from 'mescroll.js/mescroll.min'
  console.log(MeScroll)
  import 'mescroll.js/mescroll.min.css';
  export default {
    name: 'MeScroll',
    data() {
      return {
        mescroll: null,
        dataList: [],
      }
    },
    computed: {
      containerStyle() {
        return {
          top: this.top ? this.top : 0
        }
      }
    },

    props: {
      dataListUrl: {
        type: String,
        required: true,
      },
      dataListParams: {
        type: Object,
        required: true,
      },
      top: {
        type: String,
      },
      upAuto: {
        type: Boolean,
        default: true
      },
      downAuto: {
        type: Boolean,
        default: false
      },
      pageNum: {
        type: Number,
        default: 0
      },
      pageSize: {
        type: Number,
        default: 10
      },
      emptyIcon: {
        type: String,
        default: '/static/images/nothing.png'
      },
      emptyBtnText: {
        type: String,
        default: '去逛逛 >'
      },
      emptyTip: {
        type: String,
        default: '亲,暂无相关数据哦~'
      },
      htmlContent: {
        type: String,
        default: '<p class="downwarp-tip" style="color: #00a84c;">下拉刷新</p><span style="text-align: center;width: auto"><img style="height: 1rem;" src="/static/images/loading.gif" alt="加载中..."</span>'
      },
      htmlNoData: {
        type: String,
        default: '<p class="upwarp-nodata" style="color:#00a84c;">--我是有底线的--</p>'
      },
      htmlLoading: {
        type: String,
        default: '<p style="width: 1rem;height: 1rem; text-align: center; " class="upwarp-tip"><img src="/static/images/loading.gif" alt="加载中..."></p>'
      }
    },

    methods: {
      initMeScroll() {
        let _this = this;
        this.mescroll = new MeScroll('mescroll', {
          down: {
            auto: this.downAuto, // 是否在初始化完毕之后自动执行下拉回调 callback; 默认 true
            callback: _this.downCallback,//下拉刷新的回调
            offset: 50, // 在列表顶部,下拉大于50px,松手即可触发下拉刷新的回调
            htmlContent: this.htmlContent
          },
          up: {
            page: {
              num: this.pageNum, // 当前页 默认0,回调之前会加1; 即 callback(page) 会从1开始
              size: this.pageSize, // 每页数据条数
              time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
            },
            auto: this.upAuto, // 是否在初始化时以上拉加载的方式自动加载第一页数据; 默认 false
            callback: _this.upCallback,
            empty: { //配置列表无任何数据的提示,
              warpId: 'mescroll',
              icon: this.emptyIcon,
              tip: this.emptyTip,
              btntext: this.emptyBtnText,
              btnClick() {
                _this.$router.replace({name: 'home'})
              }
            },
            loadFull: {
              use: false, // 列表数据过少,不足以滑动触发上拉加载,是否自动加载下一页,直到满屏或者无更多数据为止;默认 false ,因为可通过调高 page.size 避免这个情况
              delay: 500 // 延时执行的毫秒数; 延时是为了保证列表数据或占位的图片都已初始化完成,且下拉刷新上拉加载中区域动画已执行完毕;
            },
            toTop: {
              src: "/static/images/mescroll-totop.png", // 默认滚动到1000px显示,可配置 offset 修改
//              offset: 250
            },
            htmlNodata: this.htmlNoData,
            htmlLoading: this.htmlLoading,// 上拉加载中的布局
            resetClass: "mescroll-downwarp-reset",// 下拉刷新高度重置的动画
            hardwareClass: "mescroll-hardware",
          },
        })
      },
      upCallback(page) {
        this.dataListParams['page'] = page.num;
        this.dataListParams['per_page'] = page.size;
        this.$httpGet(this.dataListUrl, this.dataListParams)
          .then(({data}) => {
            if (page.num === 1) {
              this.dataList = data.items;
            } else {
              this.dataList = this.dataList.concat(data.items);
            }
            this.mescroll.endByPage(data.items.length, data.pagination.pageCount)
          })
          .catch(() => {
            this.mescroll.endErr();
          })
      },
    },
    mounted() {
      this.initMeScroll()
    }
  }
</script>

<style scoped lang="stylus">
  @import "../assets/variable.styl"
  .mescroll
    position fixed
    top 0
</style>
<style>
  .mescroll-empty .empty-btn {
    border: 1px solid #00a84c;
    color: #00a84c;
  }

  .mescroll .mescroll-upwarp {
    margin-bottom: 1.5rem;
  }
</style>
