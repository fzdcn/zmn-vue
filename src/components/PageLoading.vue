<template>
  <div v-if="isShow" class="overlayer light" @touchmove.prevent>
    <div class="loading-container text-center">
      <div class="loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div v-if="networkWeakMsgShow" class="net-work-msg white">网络环境不佳，请耐心等待</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PageLoading',
    data () {
      return {
        showTimeout: '',
        networkWeakMsgShow: false
      }
    },
    computed: {
      isShow () {
        let val = this.$store.getters.pageLoading
        if(val === false && this.showTimeout){
          clearTimeout(this.showTimeout)
          this.networkWeakMsgShow = false
        }else{
          this.showTimeout = setTimeout(() => {
            this.networkWeakMsgShow = true
          }, 2000)
        }
        return val
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../assets/variable.styl"

  .loading-container
    width 100%
    height px2rem(100px)
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    margin auto
    .net-work-msg
      color $white
      margin-top px2rem(120px)
      font-size $fontSizeLarge
      font-weight bold

  .light
    .net-work-msg
      color #333

</style>
