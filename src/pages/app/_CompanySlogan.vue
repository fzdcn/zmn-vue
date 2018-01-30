<template>
  <div class="company-slogan bg-light-grey-1 text-center">
    <img src="/static/images/home_word@2x.png" alt="公司口号">
  </div>
</template>

<script>
  export default {
    name: 'CompanySlogan',
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
  @import "../../assets/variable.styl"
  .company-slogan
    height px2rem(128px)
    line-height px2rem(128px)
    margin-top px2rem(20px)
    img
      width: px2rem(490px)
      height: px2rem(29px)
</style>
