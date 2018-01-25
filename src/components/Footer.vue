<template>
  <div class="foot bt-e6e6e6 bg-fff">
    <div class="foot-list">
      <ul>
        <li v-for="(item,index) in menus" class="fl text-center">
          <router-link :to="item.link">
            <i v-if="$route.name == item.link.name" :class="item.iconSelected"></i>
            <i v-else :class="item.icon"></i>
            <p v-if="$route.name == item.link.name" class="$f20 fc-00a84c ">{{ item.text }}</p>
            <p v-else class="$f20 fc-666">{{ item.text }}</p>
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
            icon: 'index',
            iconSelected: 'index-selected',
            text: '首页'
          }, {
            link: {name: 'stores-index'},
            icon: 'stores',
            iconSelected: 'stores-selected',
            text: '门店'
          }, {
            link: {name: 'shopping-index'},
            icon: 'malls',
            iconSelected: 'malls-selected',
            text: '商城'
          }, {
            link: {name: 'order-index'},
            icon: 'order',
            iconSelected: 'order-selected',
            text: '订单'
          }, {
            link: {name: 'personal-center'},
            icon: 'personal-center',
            iconSelected: 'personal-center-selected',
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
  @import "../assets/common.styl"
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
          &.index
            background url("../../static/images/shouye.png") no-repeat center
            background-size px2rem(48px) px2rem(48px)
          &.stores
            background url("../../static/images/stores.png") no-repeat center
            background-size px2rem(48px) px2rem(48px)
          &.malls
            background url("../../static/images/shop_normal@2x.png") no-repeat center
            background-size px2rem(48px) px2rem(48px)
          &.order
            background: url("../../static/images/dingdan.png") no-repeat center
            background-size: px2rem(48px) px2rem(48px)
          &.personal-center
            background url("../../static/images/personal-center.png") no-repeat center
            background-size px2rem(48px) px2rem(48px)
          &.index-selected
            background url("../../static/images/shouye-selected.png") no-repeat center
            background-size px2rem(48px) px2rem(48px)
          &.stores-selected
            background url("../../static/images/stores-selected.png") no-repeat center
            background-size px2rem(48px) px2rem(48px)
          &.malls-selected
            background url("../../static/images/shop_selected@2x.png") no-repeat center
            background-size px2rem(48px) px2rem(48px)
          &.order-selected
            background url("../../static/images/dingdan-selected.png") no-repeat center
            background-size px2rem(48px) px2rem(48px)
          &.personal-center-selected
            background url("../../static/images/personal-center-selected.png") no-repeat center
            background-size px2rem(48px) px2rem(48px)
        p
          margin-top px2rem(-8px)
</style>
