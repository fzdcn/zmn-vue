<template>
  <div>
    <swiper :bannerImgs="bannerImgs"></swiper>
  </div>
</template>

<script>
  import Swiper from '../../components/_Swiper'
  export default {
    name: 'Home',
    components: {
      Swiper
    },
    data () {
      return {
        bannerImgs: [
          {
            src: '../../static/images/commodity_shopping_loading@2x.png',
            url: ''
          },
          {
            src: '../../static/images/commodity_shopping_loading@2x.png',
            url: ''
          }
        ]
      }
    },
    methods: {
      getBannerImg() {
        this.$httpGet('home-page/banner', {
          type: 30
        }).then(({data}) => {
          this.bannerImgs = data.values.length ? data.values : this.bannerImgs
        }).catch((error) => {
          console.log(error);
        })
      }
    },
    mounted: function () {
      this.getBannerImg();
    }
  }
</script>
