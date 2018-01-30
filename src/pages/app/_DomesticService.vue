<template>
  <div class="service-list bg-white">
    <div class="service-detail">
      <ul>
        <a v-for="(index,item) in serviceOptions">
          <li class="fl text-center">
            <img v-if="index == 1005" src="/static/images/baojie-wx.png" :alt="item">
            <img v-if="index == 1006" src="/static/images/zhongdiangong.png" :alt="item">
            <img v-if="index == 1003" src="/static/images/baomu.png" :alt="item">
            <img v-if="index == 1004" src="/static/images/hugong.png" :alt="item">
            <img v-if="index == 1002" src="/static/images/yuyingshi.png" :alt="item">
            <img v-if="index == 1001" src="/static/images/yuesao.png" :alt="item">
            <p class="text-center black">{{ item }}</p>
          </li>
        </a>
        <a href="javascript:void(0);">
          <li class="fl text-center" @click="">
            <img src="/static/images/yiyuanhuli.png" alt="医院护理">
            <p class="textaling black">医院护理</p>
          </li>
        </a>
        <a href="javascript:void(0);">
          <li class="fl text-center" @click="">
            <img src="/static/images/private_order@2x.png" alt="私人订制">
            <p class="text-center black">私人订制</p>
          </li>
        </a>
      </ul>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
  import {SERVICE_CODE} from '../../config/functions/index'
  export default {
    name: 'DomesticService',
    components: {},
    data(){
      return {
        serviceOptions: SERVICE_CODE,
      }
    },
    methods: {},
    mounted(){
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/variable.styl"
  .service-list
    width 100%
    height auto
    padding-top px2rem(30px)
    .service-detail
      margin auto
      ul
        li
          width 25%
          height auto
          margin-bottom px2rem(30px)
          p
            font-size $f28
            display -webkit-box
            -webkit-line-clamp 1
            overflow hidden
            -webkit-box-orient vertical
            word-break break-all
          img
            width px2rem(100px)
            height px2rem(100px)
            margin-bottom px2rem(10px)
</style>
