<template>
  <div>
    <div class="shop-head">
      <input placeholder="请输入搜索内容" class="sou" type="text" name="search">
      <img src="../../../static/images/home_search@2x.png" class="search-image">
      <a><img src="../../../static/images/shop_shopping@2x.png" class="shop-image"></a>
    </div>
    <div class="ban">
      <banner :bannerImg="bannerImage"></banner>
    </div>
    <foot></foot>
  </div>
</template>

<script>
  import Banner from '../../components/Swiper';
  import Foot from '../../components/Footer';
  export default {
    name: 'shopping-home',
    components: {
      Banner,
      Foot
    },
    data() {
      return {
        bannerImage: []
      }
    },
    methods: {
      // 获取首页 banner
      getBannerImg() {
        return this.$httpGet('home-page/banner', {type: 40})
          .then(({data}) => {
            this.bannerImage = data.values;
          })
      },
    },
    mounted() {
      this.getBannerImg();
    }
  }
</script>

<style scoped lang="stylus">
  px2rem($px)
    $rem = 75px
    $px/$rem rem

  .shop-head
    height: px2rem(89px)
    background: #00a84c
    position: fixed
    top: 0
    width: 100%
    line-height: 0.89rem
    z-index: 100
    .search-image
      display: block
      position: absolute
      width: 0.32rem
      height: 0.32rem
      top: 0.32rem
      left: 0.5rem
    .shop-image
      width: px2rem(39px)
      height: px2rem(45px)
      margin-left: px2rem(30px)
    .sou
      width: px2rem(550px)
      height: px2rem(54px)
      border-radius: px2rem(34px)
      color: #7f7f7f
      font-size: px2rem(24px)
      text-align: left
      line-height: px2rem(54px)
      margin-left: px2rem(20px)
      padding-left: px2rem(80px)
      vertical-align: middle
    /* WebKit browsers */
    ::-webkit-input-placeholder
      color: #00a84c
    /* Mozilla Firefox 4 to 18 */
    :-moz-placeholder
      color: #00a84c
      opacity: 1
    /* Mozilla Firefox 19+ */
    ::-moz-placeholder
      color: #00a84c
      opacity: 1
    /* Internet Explorer 10+ */
    :-ms-input-placeholder
      color: #00a84c

  .ban
    margin-top: px2rem(89px)
</style>
