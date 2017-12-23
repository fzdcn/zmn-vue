<template>
  <div>
    Home
    <router-link :to="{name: 'login'}">登录</router-link>
    <router-link :to="{name: 'home'}">首页</router-link>
  </div>
</template>

<script>
  export default {
    name: 'Home'
  }
</script>
