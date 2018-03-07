<template>
  <div id="benefit-life" class="benefit-life">
    <common-nav :navTitle="title"></common-nav>
    <div class="benefit-life-detail">
      <div class="benefit-life-content bg-white" v-html="benefitLifeContent.content"></div>
    </div>
    <div class="benefit-life-submit bg-white">
      <div class="fl need-pay light-red">￥{{ benefitLifeContent.price }}元</div>
      <div v-if="comparisonDate" @click="payMoney" class="fr pay-submit bg-dark-green">立即付款</div>
      <div v-else class="fr submit-no white">立即付款</div>
    </div>
  </div>
</template>

<script>
  import CommonNav from '../../../components/CommonNav';
  export default {
    name: 'benefitLifeDetail',
    components: {
      CommonNav
    },
    data(){
      return {
        title: "",
        benefitLifeContent: {},
        startTime: '',
        endTime: ''
      }
    },
    computed: {
      // 计算活动是否失效
      comparisonDate(){
        if (this.startTime <= Date.parse(new Date()) / 1000 && Date.parse(new Date()) / 1000 <= this.endTime) {
          return true;
        } else {
          return false;
        }
      }
    },
    methods: {
      getBenefitLifeContent() {
        this.$httpGet('today-recommend/view', {
          id: this.$route.params.id
        }).then(({data}) => {
          this.title = data.title;
          this.benefitLifeContent = data;
          this.startTime = this.benefitLifeContent.start_at;
          this.endTime = this.benefitLifeContent.end_at;
        })
      }
    },
    mounted(){
      this.getBenefitLifeContent();
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../../assets/variable.styl"
  .benefit-life
    .benefit-life-detail
      margin-top px2rem(89px)
      padding-bottom px2rem(100px)
    .benefit-life-submit
      position fixed
      bottom 0
      width 100%
      height px2rem(100px)
      line-height px2rem(100px)
      border-top 1px solid #e6e6e6

  .pay-submit
    width px2rem(165px)
    height px2rem(58px)
    font-size px2rem(24px)
    line-height px2rem(58px)
    text-align center
    border-radius px2rem(30px)
    margin-right px2rem(30px)
    margin-top px2rem(21px)

  .submit-no
    background-color #eee
    @extends .pay-submit

  .need-pay
    height px2rem(58px)
    font-size px2rem(24px)
    line-height px2rem(58px)
    text-align center
    border-radius px2rem(30px)
    margin-left px2rem(30px)
    margin-top px2rem(21px)
</style>
