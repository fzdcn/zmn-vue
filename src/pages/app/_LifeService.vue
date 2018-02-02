<template>
  <div v-if="lifeService.length" class="life-service bg-white">
    <div class="title bg-white">
      <dl>
        <dt class="dark-grey"><img src="/static/images/home_life@2x.png" alt="生活服务">生活服务</dt>
      </dl>
    </div>
    <div class="service-list bg-white">
      <keep-alive include="Swiper">
        <swiper :options="swiperOption">
          <swiper-slide class="text-center">
            <div class="service-list-modular">
              <ul>
                <li v-for="(item,index) in lifeService">
                  <a>
                    <i><img :src="item.image" alt="item.name"></i>
                    <p class="dark-grey">{{ item.name }}</p>
                  </a>
                </li>
              </ul>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  export default {
    name: 'lifeService',
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        lifeService: [],
        swiperOption: {
          effect: 'flip',
          autoplay: {
            delay: 10000,
            disableOnInteraction: false,
          },
          loop: false,
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            type: 'bullets'
          }
        }
      }
    },
    methods: {
      // 获取生活服务列表
      getLifeService() {
        this.$httpGet('life-type/list', {}).then(({data}) => {
          this.lifeService = data;
        }).catch((error) => {
          console.log(error);
        })
      },
    },
    mounted() {
      this.getLifeService();
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../assets/variable.styl";
  .life-service
    height auto
    width 100%
    margin-top px2rem(20px)
    .title
      padding 0 px2rem(28px)
      height px2rem(100px)
      border-bottom 1px solid #e9e9e9
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
    .service-list
      width 100%
      height auto
      padding px2rem(50px) 0 px2rem(25px)
      .service-list-modular
        width 100%
        height auto
        padding 0 px2rem(15px)
        ul
          li
            float left
            width px2rem(150px)
            height auto
            text-align center
            margin 0 px2rem(15px) px2rem(50px)
            i
              display inline-block
              width px2rem(150px)
              height auto
              margin-bottom px2rem(24px)
              img
                width px2rem(88px)
                height px2rem(88px)
                margin 0
            p
              font-size px2rem(28px)
              display -webkit-box
              -webkit-line-clamp 1
              overflow hidden
              -webkit-box-orient vertical
              word-break break-all
</style>
