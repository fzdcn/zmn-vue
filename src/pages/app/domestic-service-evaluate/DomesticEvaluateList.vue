<template>
  <div class="user-info-detail bg-white">
    <div v-for="(item,outerIndex) in homeServiceEvaluate" class="user-info bg-white">
      <div class="user-evaluate-detail">
        <div class="user-avatar">
          <img alt="用户头像" v-lazy="item.head_image" src=""
               v-preview="item.head_image"
               :src="item.head_image"
               :key="0"
               preview-title-enable="false"
               preview-nav-enable="false">
        </div>
        <div class="service-type">
          <p class="user-name black-grey">{{ item.username }}</p>
          <p class="service-detail"><span class="service bg-dark-green">服务</span>
            <span class="type">{{ item.service_name }}</span>
            <span class="time">{{ item.created_at | moment('YYYY-MM-DD')}}</span>
          </p>
        </div>
      </div>
      <div class="evaluate-detail">
        <p>{{ item.evaluate }}</p>
        <div class="tar">
          <img v-for="val in star[item.stars].options" class="fl" :src="val" alt="星级">
        </div>
        <div class="domestic-evaluate">
          <img v-for="(val,index) in item.photos" v-lazy="val" src="" alt="评价"
               v-preview="val"
               :src="val"
               :key="index"
               preview-title-enable="false"
               preview-nav-enable="true">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {starLever} from '../../../config/functions/index'
  import VuePreviewer from '../../../components/VuePreviewer'
  export default {
    name: 'DomesticEvaluateList',
    components: {
      VuePreviewer
    },
    data(){
      return {
        star: starLever.star
      }
    },
    props: {
      homeServiceEvaluate: {
        type: Array
      }

    },
    methods: {},
    mounted(){
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../../assets/common.styl"
  .user-info-detail
    .user-info
      height auto
      width 100%
      padding-bottom px2rem(25px)
      .user-evaluate-detail
        height auto
        width auto
        padding px2rem(40px) px2rem(28px)
        .user-avatar
          position absolute
          width px2rem(75px)
          height px2rem(75px)
          border-radius px2rem(10px)
          img
            width px2rem(75px)
            height px2rem(75px)
            border-radius 50%
        .service-type
          margin-left px2rem(85px)
          .user-name
            font-size px2rem(24px)
          .service-detail
            position relative
            margin-top px2rem(5px)
            .service
              position absolute
              font-size px2rem(16px)
              display inline-block
              height px2rem(30px)
              line-height px2rem(30px)
              text-align center
              width px2rem(54px)
              border-radius px2rem(10px)
            .type
              position absolute
              color $fc-999999
              font-size px2rem(20px)
              width px2rem(350px)
              line-height px2rem(30px)
              margin-left px2rem(60px)
              display -webkit-box
              -webkit-line-clamp 1
              overflow hidden
              -webkit-box-orient vertical
              word-break break-all
            .time
              display inline-block
              color $fc-999999
              font-size px2rem(20px)
              width px2rem(200px)
              line-height px2rem(30px)
              text-align right
              position absolute
              right 0
      .evaluate-detail
        padding px2rem(20px) px2rem(25px) 0 px2rem(25px)
        margin px2rem(25px) px2rem(28px)
        background-color $bg-f7f7f7
        p
          font-size px2rem(24px)
          color $fc-333
          line-height px2rem(30px)
          word-break break-all
        .tar
          display table
          margin-top px2rem(20px)
          margin-bottom px2rem(25px)
          img
            width px2rem(18px)
            height px2rem(18px)
        .domestic-evaluate
          img
            width px2rem(124px)
            height px2rem(124px)
            margin px2rem(10px) px2rem(17px)

  .mescroll .mescroll-upwarp
    margin-bottom 1.7rem
</style>
