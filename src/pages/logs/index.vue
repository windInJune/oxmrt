<template>
 <div class="container">
   <div class="nowNum">当前星币数量：<span>{{myFlowers}}</span></div>
   <div class="payBox">
      <div :class="[item.isCommend?'list animated pulse infinite':'list']" v-for="(item,index) in payList" :data-id="item.flower_num" :key="index" @click="pays">
         <div>
          <img :src="xbSrc" alt="">
          <span>{{item.flower_num}}</span>
          <span style="color:#f54b6f">{{item.extra_flower_num == '0'?'':'（赠送'+item.extra_flower_num+'）'}}</span>
         </div>
         <div>{{item.rmb}}元</div>
      </div>
   </div>
 </div>
</template>

<script>
import login from "@/components/login";
import { pay,charge } from "@/utils/api.js";
import { setStor, getStor, removeStor, toast } from "@/utils/index.js";
export default {
  data() {
    return {
      xbSrc: require("../../../static/images/xb.png"),
      login:false,
      myFlowers:'',
      payList:[]
    };
  },
  methods: {
    pays(e){
      pay(e.currentTarget.dataset.id,`pages/space/main?starid=${this.$root.$mp.query.starid}`,'android').then(res => {
          if(res.code != "SUCCESS"){
            toast('唤起支付失败/(ㄒoㄒ)/~~')
            return;
          };
          wx.requestPayment({
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: res.data.signType,
              paySign: res.data.paySign,
              success(res) { 
                console.log(res)
              },
              fail(res) { }
            })
        })
    }
  },
  mounted(){
    let that = this;
    let _unionid = getStor("sessionid");
    if (!_unionid) {
      that.login = true;
      wx.login({
        success(res) {
          setStor("code", res.code);
        }
      });
    }else{
      that.login = false;
      charge().then(res => {
        that.myFlowers = res.data.myFlowers;
        that.payList = res.data.lists;
      })
    }
    
  },
  onShareAppMessage: function (res) {
      return {
        title: `偶像名人堂星币商城即将开启，快来攒星币等兑换好礼吧！`,
        path: `/pages/home/main`
      }
  },
  onPullDownRefresh(){
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 500);
  }
};
</script>

<style lang="scss">
  @import "../../assets/styles/animate.css";
  .nowNum{
    height: 100rpx;
    line-height: 100rpx;
    text-align: left;
    color: #fff;
    font-size: 36rpx;
    padding-left: 30rpx;
  }
  .payBox{
    padding:0 30rpx;
  }
  .list{
    box-shadow:0 10rpx 10rpx 0 rgba(106, 86, 225, 0.42);
    border-radius: 3px;
    height: 160rpx;
    line-height: 160rpx;
    background: #fff;
    margin-bottom: 10rpx;
    display: flex;
    padding: 20rpx;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    font-size: 36rpx;
    img{
      height: 40rpx;
      width: 40rpx;
      margin-top: -10rpx;
      margin-right: 20rpx;
    }
  }
</style>
