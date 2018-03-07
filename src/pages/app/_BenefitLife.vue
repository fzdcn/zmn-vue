<template>
  <!--惠生活-->
  <div>
    <div v-if="benefitLife.length > 0" class="recommend bg-white">
      <div class="recommend-top bg-white">
        <dl>
          <dt class="dark-grey">惠生活<span class="dark-green">HUISHENGHUO</span></dt>
        </dl>
      </div>
      <div class="recommend-list">
        <div class="recommend-list-img">
          <ul>
            <li v-for="item in benefitLife">
              <router-link :to="{path:'/home/benefit-life-detail/' + item.id}">
                <img v-lazy="item.cover" src="" alt="item.title">
              </router-link>
            </li>
          </ul>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BenefitLife',
    components: {},
    props: {
      benefitLife: {
        type: Array
      }
    },
    data(){
      return {}
    },
    methods: {},
    mounted(){
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/variable.styl";
  .recommend
    height auto
    margin px2rem(20px) px2rem(15px) 0
    border-radius px2rem(10px)
    .recommend-top
      height px2rem(80px)
      width auto
      margin 0 px2rem(15px)
      dl
        width 100%
        height px2rem(80px)
        dt
          float left
          height px2rem(80px)
          line-height px2rem(80px)
          font-size $f28
          span
            display inline-block
            height px2rem(80px)
            line-height px2rem(80px)
            font-size $f24
            margin-left px2rem(15px)
    .recommend-list
      width auto
      height auto
      padding 0 px2rem(15px)
      .recommend-list-img
        ul
          display table
          width 100%
          li
            text-align center
            margin-bottom px2rem(20px)
            img
              width px2rem(750px)
</style>
