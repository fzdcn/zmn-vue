<template>
  <div class="header-top textaling bg-14A83B">
    <div @click="$router.push({name:'city'})" class="city-position">
      <dl>
        <dt class="city-name fc-fff">苏州市</dt>
        <dd class="inverted-triangle"><img src="../../../static/images/city-position.png" alt="back-img"></dd>
      </dl>
    </div>
    <div class="project-title fc-fff">
      <input @click="$router.push({name:'search'})" placeholder="请输入搜索内容" class="index-search fc-7f7f7f" type="text"
             name="search">
      <i class="search-img"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    components: {},
    data(){
      return {}
    },
    methods: {},
    mounted(){
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/common.styl"
  .header-top
    position fixed
    top px2rem(0px)
    height px2rem(89px)
    width 100%
    line-height px2rem(89px)
    padding 0 px2rem(15px)
    z-index 100
    .project-title
      position absolute
      font-size $f28
      width px2rem(350px)
      text-align center
      top px2rem(0px)
      height px2rem(89px)
      left 50%
      margin-left px2rem(-175px)
      .index-search
        width px2rem(350px)
        height px2rem(54px)
        border-radius: px2rem(50px)
        font-size $f24
        text-align left
        line-height px2rem(54px)
        padding-left px2rem(100px)

      .search-img
        display inline-block
        position absolute
        width px2rem(32px)
        height px2rem(32px)
        background url("../../../static/images/home_search@2x.png") no-repeat
        background-size px2rem(32px) px2rem(32px)
        top px2rem(32px)
        left px2rem(50px)
    .city-position
      width px2rem(160px)
      height px2rem(89px)
      .city-name
        position absolute
        text-align center
        width px2rem(130px)
        line-height px2rem(89px)
        height px2rem(89px)
        font-size $f28
        display -webkit-box
        -webkit-line-clamp 1
        overflow hidden
        -webkit-box-orient vertical
        word-break break-all

      .inverted-triangle
        margin-left px2rem(130px)
        width px2rem(30px)
        img
          width px2rem(30px)
          height px2rem(16px)
</style>
