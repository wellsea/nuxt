<template>
  <section class="container">
    <div class="recommend">
      <ul>
        <nuxt-link :to="{path:'info', query:{id: item.id}}" tag="li" v-for="(item, index) in investData" :key="index" v-if="index<2">
          <div>
            <h3 class="tac">{{item.categoryName?item.categoryName:'精选标'}} -【{{item.name}}】</h3>
            <p class="tac mt20 color-99 f22" @click="showTips()">历史年化收益<i class="iconfont icon-yiwen"></i></p>
            <h2 class="tac red f70">{{item.rateYear}}%
              <small class="f22 red" v-if="item.platformRateYear">+{{item.platformRateYear}}%</small>
            </h2>
            <p class="tac org" v-if="item.creditRatingName" v-text="item.creditRatingName"></p>

            <p class="tac mt20 mb20 f22">
              &nbsp;出借期限&nbsp;
              <span class="org">{{item.timeLimit}}</span>{{item.timeType==0?'月':'天'}}
              &nbsp;剩余金额&nbsp;
              <span class="org">{{item.amountInvestable}}</span>元
            </p>
          </div>
        </nuxt-link>
      </ul>
      <hr>
      <ul class="org">
        <nuxt-link :to="'/detail/'+item.id" tag="li" v-for="(item, index) in investData" :key="index" v-if="index>1">
          <div>
            <h3 class="tac">{{item.categoryName?item.categoryName:'精选标'}} -【{{item.name}}】</h3>
            <p class="tac mt20 color-99 f22" @click="showTips()">历史年化收益<i class="iconfont icon-yiwen"></i></p>
            <h2 class="tac red f70">{{item.rateYear}}%
              <small class="f22 red" v-if="item.platformRateYear">+{{item.platformRateYear}}%</small>
            </h2>
            <p class="tac org" v-if="item.creditRatingName" v-text="item.creditRatingName"></p>

            <p class="tac mt20 mb20 f22">
              &nbsp;出借期限&nbsp;
              <span class="org">{{item.timeLimit}}</span>{{item.timeType==0?'月':'天'}}
              &nbsp;剩余金额&nbsp;
              <span class="org">{{item.amountInvestable}}</span>元
            </p>
          </div>
        </nuxt-link>
      </ul>
      <div class="flex tac">
        <nuxt-link to="info2" class="flex-item bdr">
          <p class="f20">累计出借金额(元)</p>
          <p class="org">{{staticData.sumInvestmentAmount || 0}}</p>
        </nuxt-link>
        <div class="flex-item bdr">
          <p class="f20">累计为用户赚取(元)</p>
          <p class="org">{{staticData.sumInterestAmount || 0}}</p>
        </div>
        <div class="flex-item">
          <p class="f20">总待收本息(元)</p>
          <p class="org">{{staticData.inRepaymentMoney || 0}}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import api from '../plugins/axios'

  export default {
    async asyncData({}) {
      let res1 = await api.getStatistics();
      let res2 = await api.getHomeInvest({type: 1, page: 1, rows: 5});
      return {
        appname: res2.resData[0].name,
        staticData: res1.resData,
        investData: res2.resData
      }
    },
    head() {
      return this.$seo(this.appname, this.appname, this.appname)
    }
  }
</script>

<style lang="scss" scoped>
.recommend{
  li{
    background: linear-gradient(#eee, #fff);
    width: 90%;
    margin:  20px auto;
    border-radius: 6px;
    padding: 10px;
    -webkit-box-shadow: 0 1px 5px #ccc;
    -moz-box-shadow: 0 1px 5px #ccc;
    box-shadow: 0 1px 5px #ccc;
  }
}
</style>

