<template>
  <div class="foot bt-e6e6e6 bg-white">
    <div class="foot-list">
      <ul>
        <li v-for="(item,index) in menus" class="fl text-center">
          <router-link :to="item.link">
            <i v-if="$route.name == item.link.name" :class="item.iconSelected"
               :style="{backgroundImage:'url('+item.iconSelected+')'}"
               style="background-size:0.48rem 0.48rem;background-repeat:no-repeat;background-position:center;"></i>
            <i v-else :style="{backgroundImage:'url('+item.icon+')'}"
               style="background-size:0.48rem 0.48rem;background-repeat:no-repeat;background-position:center;"></i>
            <p v-if="$route.name == item.link.name" class="$f20 dark-green ">{{ item.text }}</p>
            <p v-else class="$f20 dark-grey">{{ item.text }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Footer',
    components: {},
    data(){
      return {
        menus: [
          {
            link: {name: 'home'},
            icon: '/static/images/shouye.png',
            iconSelected: '/static/images/shouye-selected.png',
            text: '首页'
          }, {
            link: {name: 'stores-index'},
            icon: '/static/images/stores.png',
            iconSelected: '/static/images/stores-selected.png',
            text: '门店'
          }, {
            link: {name: 'shopping-index'},
            icon: '/static/images/shop_normal@2x.png',
            iconSelected: '/static/images/shop_selected@2x.png',
            text: '商城'
          }, {
            link: {name: 'order-index'},
            icon: '/static/images/dingdan.png',
            iconSelected: '/static/images/dingdan-selected.png',
            text: '订单'
          }, {
            link: {name: 'personal-center'},
            icon: '/static/images/personal-center.png',
            iconSelected: '/static/images/personal-center-selected.png',
            text: '我的'
          },
        ]
      }
    },
    methods: {},
    mounted(){
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/variable.styl"
  .foot
    position fixed
    bottom 0
    height px2rem(100px)
    width 100%
    z-index 1
    .foot-list
      margin 0 auto
      width px2rem(700px)
      li
        width 1rem
        padding px2rem(9px) px2rem(20px)
        height px2rem(82px)
        a
          width px2rem(100px)
          display inline-block
          height px2rem(82px)
        i
          width px2rem(48px)
          height px2rem(48px)
          display inline-block
        p
          margin-top px2rem(-8px)
</style>
