<template>
  <div id="mescroll" class="mescroll" :style="containerStyle">
    <slot :dataList="dataList"/>
  </div>
</template>

<script>
  export default {
    name: 'MeScroll',
    data() {
      return {
        meScroll: null,
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
      }
    },

    methods: {
      initMeScroll() {
        let _this = this
        this.meScroll = new MeScroll('mescroll', {
          down: {
            auto: false, // 是否在初始化完毕之后自动执行下拉回调 callback; 默认 true
            callback: _this.downCallback,//下拉刷新的回调
            offset: 50, // 在列表顶部,下拉大于50px,松手即可触发下拉刷新的回调
            htmlContent: htmlContent
          },
          up: {
            auto: this.upAuto,
            callback: _this.upCallback,
            //page:{size:8}, // 分页默认数据
            empty: {
              warpId: 'mescroll',
              icon: '/static/images/mescroll-empty.png',
              tip: '亲,暂无相关数据哦~',
              btntext: '去逛逛 >',
              btnClick() {
                _this.$router.replace({name: 'homeIndex'})
              }
            },
            loadFull: {
              use: false, // 列表数据过少,不足以滑动触发上拉加载,是否自动加载下一页,直到满屏或者无更多数据为止;默认 false ,因为可通过调高 page.size 避免这个情况
              delay: 500 // 延时执行的毫秒数; 延时是为了保证列表数据或占位的图片都已初始化完成,且下拉刷新上拉加载中区域动画已执行完毕;
            },
            toTop: {
              warpId: 'me-scroll',
              html: `<button type="button"><i class="iconfont icon-top"></i></button>`,
              showClass: 'mescroll-fade-in',
              hideClass: 'mescroll-fade-out',
              duration: 200
            },
            htmlNodata: '<p class="upwarp-nodata">-- 见底了 --</p>'
          },
        })
      },
      upCallback(page = {num: 1, size: 10}) {
        this.dataListParams['page'] = page.num
        this.dataListParams['per_page'] = page.size
        this.$httpGet(this.dataListUrl, this.dataListParams)
          .then(({data}) => {
            //data.data = [] // 打开注释测试无数据时
            if (page.num === 1) {
              this.dataList = []
            }
            this.dataList = this.dataList.concat(data.data)
            this.meScroll.endByPage(data.data.length, data.pagination.last_page)
          })
          .catch(() => {
            mescroll.endErr();
          })
      },
    },

    mounted() {
      this.initMeScroll()
    }
  }
</script>

<style scoped lang="stylus">

  .mescroll
    position fixed
    width 100vw
    top 0
    bottom 0
    overflow-x hidden
    height auto

</style>
