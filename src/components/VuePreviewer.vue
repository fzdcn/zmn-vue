<template>

</template>

<script>
  import PhotoSwipe from 'photoswipe/dist/photoswipe';
  import UI  from 'photoswipe/dist/photoswipe-ui-default';
  import 'photoswipe/dist/photoswipe.css';
  import 'photoswipe/dist/default-skin/default-skin.css';
  export default {
    name: 'PhotoSwipe',
    components: {},
    data(){
      return {
        itemsImg: [
          {
            src: 'http://owtyhh96p.bkt.clouddn.com/zmn-local/avatar_url5a38bbf19d00b.png',
            w: 200,
            h: 200
          },
          {
            src: 'https://placekitten.com/1200/900',
            w: 200,
            h: 200
          }
        ],
        options: {
          history: false,
          focus: false,
          index: '',
          showAnimationDuration: 0,
          hideAnimationDuration: 0
        }
      }
    },
    methods: {
      photoSwipe: function (index) {
        const maskHtml = '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">' +
          '<div class="pswp__bg"></div>' +
          '<div class="pswp__scroll-wrap">' +
          '<div class="pswp__container">' +
          '<div class="pswp__item"></div>' +
          '<div class="pswp__item"></div>' +
          '<div class="pswp__item"></div>' +
          '</div>' +
          '<div class="pswp__ui pswp__ui--hidden">' +
          '<div class="pswp__top-bar">' +
          '<div class="pswp__counter"></div>' +
          '<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>' +
          '<div class="pswp__preloader">' +
          '<div class="pswp__preloader__icn">' +
          '<div class="pswp__preloader__cut">' +
          '<div class="pswp__preloader__donut"></div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">' +
          '<div class="pswp__share-tooltip"></div>' +
          '</div>' +
          '<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>' +
          '<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>' +
          '<div class="pswp__caption">' +
          '<div class="pswp__caption__center"></div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>';
        document.body.innerHTML = maskHtml;
        this.options.index = index;
        const pswpElement = document.querySelectorAll('.pswp')[0];
        const gallery = new PhotoSwipe(pswpElement, UI, this.itemsImg, this.options);
        gallery.init();
        gallery.listen('close', function () {
          pswpElement.remove();
        });
      }
    },
    mounted(){
    }
  }
</script>

<style lang="stylus" scoped>

</style>
