<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <page-loading></page-loading>
  </div>
</template>

<script>
  import PageLoading from "./components/PageLoading";
  export default {
    components: {PageLoading},
    name: 'app'
  }
</script>

<style lang="stylus">
  @import "assets/common.styl"
</style>
