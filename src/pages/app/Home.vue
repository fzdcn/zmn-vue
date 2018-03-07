<template>
  <div class="index">
    <head-top></head-top>
    <me-scroll :dataListUrl="'today-recommend/list'" :dataListParams="{}" :top="'0.89rem'" :pageSize="5"
               :emptyIcon="null" :emptyBtnText="null" :emptyTip="''">
      <swiper slot="topContent" :bannerImg="bannerImg"></swiper>
      <domestic-service slot="topContent"></domestic-service>
      <life-service slot="topContent"></life-service>
      <user-evaluate slot="topContent"></user-evaluate>
      <benefit-life slot="meScroll" slot-scope="props" :benefitLife="props.dataList"></benefit-life>
      <company-slogan slot="bottomContent"></company-slogan>
    </me-scroll>
    <foot></foot>
  </div>
</template>

<script>
  import HeadTop from './_Header';
  import Swiper from '../../components/Swiper';
  import Foot from '../../components/Footer';
  import BenefitLife from './_BenefitLife';
  import DomesticService from './_DomesticService';
  import UserEvaluate from './_UserEvaluate';
  import LifeService from './_LifeService';
  import CompanySlogan from './_CompanySlogan';
  import MeScroll from '../../components/MeScroll';
  export default {
    name: 'Home',
    components: {
      Swiper,
      Foot,
      HeadTop,
      BenefitLife,
      DomesticService,
      LifeService,
      UserEvaluate,
      CompanySlogan,
      MeScroll
    },
    data () {
      return {
        bannerImg: [
          {
            src: '/static/images/commodity_shopping_loading@2x.png',
            url: ''
          },
          {
            src: '/static/images/commodity_shopping_loading@2x.png',
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
      }
    },
    mounted() {
      this.getBannerImg();
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../assets/variable.styl";
</style>
