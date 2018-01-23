<template>
  <div>
    <swiper></swiper>
  </div>
</template>

<script>
  import swiper from './_swiper'
  export default {
    name: 'Home',
    components: {
      swiper
    },
    data () {
      return {}
    },
    methods: {
      /*getAA () {
       this.$store.getters.accessToken
       }*/
    }
  }
</script>
