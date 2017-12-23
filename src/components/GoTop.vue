<template>
  <div class="gotop-box" :style="positionStyle">
    <div v-if="scrolled" class="gotop" @click="gototop" v-html="goText">
    </div>
  </div>
</template>

<script>
  import {jump} from '../functions'

  export default {
    name: 'GoTop',
    props: {
      goText: {
        type: String,
        default: '⬆'
      },
      scrollHeight: {
        type: Number,
        default: 20
      },
      positionStyle: {
        type: Object,
        default () {
          return {
            bottom: '60px',
            right: '20px'
          }
        }
      }
    },
    data () {
      return {
        scrolled: false
      };
    },
    methods: {
      handleScroll() {
        this.scrolled = window.scrollY > this.scrollHeight;
      },
      gototop(){
        jump('body')
      }
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll);
    }
  }
</script>

<style lang="stylus" scoped>
  .gotop-box
    position fixed
    right 20px
    bottom 60px
    z-index 500

  .gotop
    background rgba(0, 0, 0, .5)
    width 40px
    height 40px
    line-height 40px
    text-align center
    cursor pointer
    border-radius 50%
    color #fff
    font-size 20px

</style>
