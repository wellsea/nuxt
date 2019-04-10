<template>
  <div class="info">
    <h1 class="tac org">{{info.name}}</h1>
    <br>
    <br>
    <br>

    <div class="flex">
      <div class="flex-item">
        <p>项目总额</p>
        <p>{{info.amountBorrow}}元</p>
      </div>
      <div class="flex-item">
        <p>项目期限</p>
        <p>
          {{info.timeLimit}} {{info.timeType == 1 ? '天' : '个月'}}
        </p>
      </div>
    </div>


    <div class="info-data">
      <p>
        还款方式：&nbsp;
        <span class="color-99"><!--'还款方式 1等额本息; 2一次性还款;3每月还息到期还本;4一次性先息后本;5等本等息',-->
        {{info.repayWay == 1 ? '等额本息' : (( info.repayWay == 2 || info.repayWay == 5) ? ( info.repayWay == 2 ? '一次性还本付息' : '等本等息' ):'')}}
      </span>
      </p>
      <p>
        发布时间：&nbsp;
        <span class="color-99">{{info.openTime||1462515366000}}</span>
      </p>
      <p>
        投资区间：&nbsp;
        <span class="color-99">{{info.investMin?info.investMin:10000}}~{{info.investMax>0?info.investMax:'无限制'}}</span>
      </p>
      <p>
        剩余可投：&nbsp;
        <span class="color-99">{{info.amountInvestable?info.amountInvestable:0}}元</span>
      </p>
      <p v-if="info.creditRatingName">
        风险等级：&nbsp;
        <span class="color-99">{{info.creditRatingName}}</span>
      </p>
      <p><!--isPreRepayment  0:可转让 1：不可转'; timeType  0:按月 1：按天'-->
        转让条件：&nbsp;
        <span class="color-99" v-if="info.holdDays > 0">持有满<span>{{info.holdDays}}</span>天可转让</span>
        <span class="color-99" v-else-if="info.holdDays == 0">可立即转让</span>
        <span class="color-99" v-else-if="info.holdDays == null || info.holdDays == -1">不支持债权转让</span>
      </p>
    </div>
  </div>
</template>

<script>
  import api from '../../plugins/axios'
  export default {
    validate({ params }) {
      return !isNaN(+params.id)
    },
    async asyncData({ params, error }) {
      try {
        console.log(params);
        let res = await api.getInvestDetail({borrowId: params.id});
        return {
          info: res.resData.borrowVO
        }
      } catch (e) {
        error({ message: 'detail not found', statusCode: 404 })
      }
    },
    head() {
      return this.$seo(this.info.name, this.info.categoryName, this.info.typeTranslate)
    }
  }
</script>

<style scoped>
  .info {
    font-size: 18px;
  }

  .info-data {
    font-size: 18px;
    width: 80%;
    margin: 2em auto;
    line-height: 2;
  }
</style>
