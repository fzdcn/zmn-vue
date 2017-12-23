<template>
  <div>
    {{ xy2 }}
    <router-link :to="{name: 'login'}">登录</router-link>
    <router-link :to="{name: 'goods-shop-home'}">商城</router-link>

    <app-menu></app-menu>
  </div>
</template>

<script>
  import AppMenu from './_Menu'
  import moment from 'moment'

  export default {
    name: 'Home',
    data () {
      return {
        xy: '1514017512'
      }
    },
    computed: {
      xy2 () {

        return moment(this.xy * 1000).format()
      }
    },
    components: {
      AppMenu
    },
    methods: {
      getAA () {
        this.$store.getters.accessToken
      }
    }
  }
</script>
