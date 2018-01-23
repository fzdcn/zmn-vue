<template>
  <keep-alive include="Swiper">
      <swiper :options="swiperOption">
        <swiper-slide class="text-center" v-for="(slide,index) in swiperSlides" :key="index">
          <img :src="slide.src">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  </keep-alive>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  export default {
    name: 'Swiper',
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        swiperOption: {
          effect : 'flip',
          autoplay: {
           delay: 3000,
           disableOnInteraction: false,
           },
          loop: false,
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            type:'bullets'
          }
        },
        swiperSlides: [],
      }
    },
    methods: {
      getBannerImg: function () {
        this.$httpGet('home-page/banner', {
          type: 30
        }).then((data) => {
          this.swiperSlides = data.data.values;
        }).catch((error) => {

        })
      }
    },
    mounted() {
      this.getBannerImg();
    }
  }
</script>

<style scoped lang="stylus">

</style>
