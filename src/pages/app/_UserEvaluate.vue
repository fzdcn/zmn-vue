<template>
  <div v-if="homeServiceEvaluate.length" class="user-evaluate-index bg-white">
    <div class="evaluate-title bg-white">
      <dl>
        <dt class="dark-grey"><img src="/static/images/home_evaluation@2x.png" alt="今日推荐">用户评价</dt>
        <dd>
          <router-link class="dark-grey" :to="{path:'/home/domestic-service-evaluate'}">
            更多<img src="/static/images/home_right.png" alt="更多">
          </router-link>
        </dd>
      </dl>
    </div>
    <div v-if="outerIndex == 0" v-for="(item,outerIndex) in homeServiceEvaluate" class="user-info bg-white">
      <div class="user-evaluate-detail">
        <div class="user-avatar">
          <img class="openHeadImg"
               :src="item.head_image ? item.head_image : '/static/images/commodity_shopping_loading@2x.png'"
               alt="用户头像">
        </div>
        <div class="service-type">
          <p class="user-name black-grey">{{ item.username }}</p>
          <p class="service-detail"><span class="service white bg-dark-green">服务</span><span
            class="type grey">{{ item.service_name }}</span><span
            class="time grey">{{ item.created_at | moment('YYYY-MM-DD')}}</span></p>
        </div>
      </div>
      <div class="evaluate-detail bg-light-grey">
        <p class="black-grey">{{ item.evaluate }}</p>
        <div class="tar">
          <img v-for="val in star[item.stars].options" class="fl" :src="val" alt="星级">
        </div>
        <div class="domestic-evaluate">
          <!--<img @click="openImg(index)" v-for="(val,index) in item.photos" v-lazy="val" src="" class="" alt="评价">-->
          <img v-for="(val,index) in item.photos" v-lazy="val" src=""
               v-preview="val"
               :src="val"
               :key="index"
               preview-title-enable="false"
               preview-nav-enable="true">
        </div>
      </div>
    </div>
    <!--<vue-previewer ref="ImgPreviewer"></vue-previewer>-->
  </div>
</template>

<script>
  import {starLever} from '../../config/functions/index';
  import VuePreviewer from '../../components/VuePreviewer';
  export default {
    name: 'UserEvaluate',
    components: {
      VuePreviewer
    },
    data(){
      return {
        homeServiceEvaluate: [],
        // 星级评价
        star: starLever.star
      }
    },
    methods: {
      openImg(index){
        this.$refs.ImgPreviewer.photoSwipe(index);
      },
      // 获取家政服务评价
      getHomeServiceEvaluate() {
        this.$httpGet('home-page/evaluate-list', {
          fields: 'username,head_image,evaluate,score,photos,created_at,stars',
          expand: 'service_name,stars'
        }).then(({data}) => {
          this.homeServiceEvaluate = data.items;
        }).catch((error) => {
          console.log(error);
        })
      },
    },
    mounted(){
      this.getHomeServiceEvaluate();
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/variable.styl"
  .user-evaluate-index
    padding-bottom px2rem(25px)
    margin-top px2rem(20px)
    .evaluate-title
      padding 0 px2rem(28px)
      height px2rem(100px)
      width auto
      border-bottom 1px solid #E9E9E9
      dl
        width 100%
        height px2rem(100px)
        dt
          float left
          height px2rem(100px)
          line-height px2rem(100px)
          font-size px2rem(32px)
          img
            margin-right px2rem(15px)
            width px2rem(54px)
            height px2rem(54px)
        dd
          float right
          height px2rem(100px)
          line-height px2rem(100px)
          a
            line-height px2rem(100px)
            font-size px2rem(28px)
            display inline-block
            img
              margin-left px2rem(20px)
              width px2rem(15px)
              height px2rem(27px)
    .user-info
      height auto
      width 100%
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
              font-size px2rem(20px)
              width px2rem(350px)
              line-height px2rem(30px)
              margin-left px2rem(60px)
              display -webkit-box
              -webkit-line-clamp: 1
              overflow hidden
              -webkit-box-orient vertical
              word-break break-all
            .time
              display inline-block
              font-size px2rem(20px)
              width px2rem(200px)
              line-height px2rem(30px)
              text-align right
              position absolute
              right 0
      .evaluate-detail
        padding px2rem(20px) px2rem(25px) 0 px2rem(25px)
        margin px2rem(25px) px2rem(28px)
        p
          font-size px2rem(24px)
          line-height px2rem(30px)
          word-break break-all
        .tar
          display table
          margin-top px2rem(20px)
          padding-bottom px2rem(25px)
          img
            width px2rem(18px)
            height px2rem(18px)
        .domestic-evaluate
          img
            width px2rem(124px)
            height px2rem(124px)
            margin px2rem(10px) px2rem(17px)
</style>
