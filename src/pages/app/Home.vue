<template>
  <div class="index">
    <head-top></head-top>
    <div id="mescroll" class="mescroll">
      <swiper :bannerImg="bannerImg"></swiper>
      <domestic-service></domestic-service>
      <benefit-life :benefitLife="benefitLife"></benefit-life>
    </div>
    <foot></foot>
  </div>
</template>

<script>
  import HeadTop from './_Header';
  import Swiper from '../../components/Swiper';
  import Foot from '../../components/Footer';
  import BenefitLife from './_BenefitLife';
  import DomesticService from './_DomesticService';
  import {pageScroll} from '../../config/functions';
  export default {
    name: 'Home',
    components: {
      Swiper,
      Foot,
      HeadTop,
      BenefitLife,
      DomesticService
    },
    data () {
      return {
        mescroll: null,
        bannerImg: [
          {
            src: '../../static/images/commodity_shopping_loading@2x.png',
            url: ''
          },
          {
            src: '../../static/images/commodity_shopping_loading@2x.png',
            url: ''
          }
        ],
        benefitLife: []
      }
    },
    methods: {
      getBannerImg() {
        this.$httpGet('home-page/banner', {
          type: 30
        }).then(({data}) => {
          this.bannerImg = data.values.length ? data.values : this.bannerImg;
        }).catch((error) => {
          console.log(error);
        })
      },
      // 上拉加载的回调 page = {num:1, size:10}; num 当前页 从1开始, size 每页数据条数
      upCallback(page) {
        // 获取生活服务列表
        this.$httpGet('today-recommend/list', {
          per_page: page.size,
          page: page.num
        }).then(({data}) => {
          // 联网成功的回调,隐藏下拉刷新和上拉加载的状态;
          this.mescroll.endByPage(data.items.length, data.pagination.pageCount);// 传参:数据的总数; mescroll 会自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
          // 设置列表数据
          this.setListData(data, page.num, true);
        }).catch((error) => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          this.mescroll.endErr();
        })
      },
      // 设置列表数据
      setListData(data, pageNum, isAppend) {
        if (isAppend && pageNum == 1) {
          this.getBannerImg();
          this.benefitLife = data.items;
        } else if (isAppend && pageNum > 1) {
          this.benefitLife = this.benefitLife.concat(data.items);
        }
      },
      meScroll(_this, empty) {
        _this = this;
        empty = {
          warpId: "mescroll",
          icon: '../../../static/images/blank_no_service@2x.png',
          tip: "",
          btntext: ""
        };
        pageScroll(_this, 5, false, false, false, empty);
      }
    },
    mounted() {
      this.meScroll();
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../assets/common.styl"
  .mescroll
    position fixed
    top px2rem(89px)
</style>
<style lang="stylus">
  @import "../../assets/common.styl"
  .mescroll-upwarp
    margin-bottom px2rem(170px)
</style>
