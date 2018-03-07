<template>
  <div>
    <common-nav navTitle="家政服务评价"></common-nav>
    <me-scroll :dataListUrl="'home-page/evaluate-list'"
                :dataListParams="{fields: 'username,head_image,evaluate,score,photos,created_at,stars',
                  expand: 'service_name,stars'}" :top="'0.89rem'" :pageSize="10"
                :emptyIcon="null" :emptyBtnText="null" :emptyTip="''">
      <domestic-evaluate-list slot="meScroll" slot-scope="props"
                              :homeServiceEvaluate="props.dataList">
      </domestic-evaluate-list>
    </me-scroll>
  </div>
</template>

<script>
  import CommonNav from '../../../components/CommonNav'
  import MeScroll from '../../../components/MeScroll'
  import DomesticEvaluateList from './DomesticEvaluateList'
  export default {
    name: 'DomesticServiceEvaluate',
    components: {
      CommonNav,
      MeScroll,
      DomesticEvaluateList
    },
    data(){
      return {}
    },
    methods: {},
    mounted(){
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../../assets/variable.styl"
  .domestic-service-evaluate
    height auto
    width 100%
    padding-bottom px2rem(20px)
</style>
