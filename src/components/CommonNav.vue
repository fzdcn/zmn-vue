<template>
  <div class="set">
    <div class="set-on">{{ navTitle }}</div>
    <img @click="goBack" src="../../static/images/back.png" class="setback">
  </div>
</template>

<script>
  import {goBack} from '../config/functions'
  export default {
    name: 'CommonNav',
    components: {},
    props: {
      navTitle: {
        type: String,
        default: '苏州蚕食网络科技有限公司'
      }
    },
    data(){
      return {}
    },
    methods: {
      goBack
    },
    mounted: function () {
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/common.styl"
  .set
    width 100%
    position: fixed
    top: 0
    height px2rem(88px)
    line-height px2rem(88px)
    background-color $white
    z-index 100
    border-bottom: 1px solid $fc-e6e6e6;
    .set-on
      text-align center
      font-size px2rem(36px)
    .setback
      width px2rem(22px)
      height px2rem(40px)
      position absolute
      top px2rem(26px)
      left px2rem(30px)
</style>
