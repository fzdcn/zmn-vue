<template>
  <keep-alive include="Swiper">
    <swiper :options="swiperOption">
      <swiper-slide class="text-center" v-for="(item,index) in bannerImgs" :key="index">
        <img :src="item.src">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </keep-alive>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  export default {
    name: 'banner-element',
    components: {
      swiper,
      swiperSlide
    },
    props: {
      bannerImgs: {
        type: Array,
      }
    },
    data() {
      return {
        swiperOption: {
          effect: 'flip',
          autoplay: {
            delay: 3000,
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
    methods: {},
    mounted() {
      /*this.getBannerImg();*/
    }
  }
</script>

<style scoped lang="stylus">

</style>
