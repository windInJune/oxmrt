<template>
  <div class="detailBox">
      <login :authorization="login" v-on:login="getUserInfo"></login>
      <div class="topBox">
          <img mode="aspectFill" :src="ac_datas.banner" alt="">
      </div>
      <div class="contentBox">
        <div class="starName">{{ac_datas.name}}</div>
          <p class="pTitle">
              <span class="left">目标人数：{{ac_datas.target}}</span>
              <span class="right">已完成：{{progress}}%</span>
          </p>
          <div class="progress">
                <div class="bar">
                    <span class="bar-unfill">
                    <span class="bar-fill-stripes" :style='{"width":progress+"%"}'></span>
                    </span>
                </div>
            </div>
          <p class="pTitle" style="padding-top:10rpx" v-if="ac_datas.status == '0'">
              <span class="left">截止日期：{{endTime}}</span>
              <span class="right">活动已结束，{{progress >= 100?'应援任务完成':'应援任务未完成'}}</span>
          </p>
           <p class="pTitle" style="padding-top:10rpx" v-else-if="ac_datas.status == '-1'">
              <span class="left">截止日期：{{endTime}}</span>
              <span class="right">活动未开始</span>
          </p>
           <p class="pTitle" style="padding-top:10rpx" v-else>
              <span class="left">截止日期：{{endTime}}</span>
              <span class="right">{{countTime}}</span>
          </p>
          <div class="invite" v-if="ac_datas.status == '0' ||  ac_datas.status == '-1'">
             <button open-type="share" plain class="invite">分享给好友</button>
          </div>
          <div class="invite" v-else>
               <button open-type="share" plain class="invite" v-if="ac_datas.isJoin">您已应援，邀请好友</button>
               <div class="invite" @click="joinFn" v-else>我要应援</div>
          </div>
         
          <div class="title">应援详情</div>
          <div>
              <wxParse :content="ac_datas.introduction" />
          </div>
          <div class="modeTitle">
            <div class='fleft'>
            <span>应援榜</span>
            </div>
            <div class='fright' bindtap='gotoList'>
            <div @click="moreInvite">更多</div>
                <img :src='rightIcon'>
            </div>
           </div>
           <div class="bestFans">
            <div class="bestFansBox">
                <div class="fansWrap">
                    <div class="headBox">
                        <img :src="invite[1]?invite[1].avatar:''" alt="">
                        <p class="cname">左护法</p>
                    </div>
                    <div class="uName">{{invite[1]?invite[1].nickName:'???'}}</div>
                </div>
                <div class="fansWrap">
                    <div class="headBox firstFans">
                        <img :src="invite[0]?invite[0].avatar:''" alt="">
                        <p class="cname b_pink">大护法</p>
                    </div>
                    <div class="uName">{{invite[0]?invite[0].nickName:'???'}}</div>               
                </div>
                <div class="fansWrap">
                    <div class="headBox">
                        <img :src="invite[2]?invite[2].avatar:''" alt="">
                        <p class="cname b_violet">右护法</p>
                    </div>
                    <div class="uName">{{invite[2]?invite[2].nickName:'???'}}</div>               
                </div>
            </div>
            </div>
    </div>
    <back :show="showback"></back>
  </div>
</template>

<script>
import login from "@/components/login";
import back from "@/components/back";
import {ac_rank,ac_detail,ac_join,ac_jinviteCallBack} from "@/utils/api.js";
import { setStor, getStor, removeStor, toast } from "@/utils/index.js";
import wxParse from 'mpvue-wxparse'
export default {
  data() {
    return {
      rightIcon: require("../../../static/images/4.png"),
      ac_datas:{},
      progress:0,
      endTime:0,
      countTime:'',
      timer:null,
      login:false,
      invite:{},
      showback:false
    };
  },
  methods: {
     moreInvite(){
       wx.navigateTo({
        url: `/pages/acinvita/main?id=${this.$root.$mp.query.id}`
      });
     },
     getUserInfo(e) {
      let that = this;
      that.login = false;
      that.loadData();
    },
     joinFn(){
       let that = this;
       ac_join(this.$root.$mp.query.id).then(res => {
         if(res.code == "SUCCESS"){
           ac_jinviteCallBack(that.$root.$mp.query.id,that.$root.$mp.query.share_id)
           toast('应援成功O(∩_∩)O~~')
           that.loadData();
         }else{
           toast("应援失败/(ㄒoㄒ)/~~")
         }
       })
     },
     
     formatTime(timeStamp) {
        var date = new Date();
        date.setTime(timeStamp * 1000);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '.' + m + '.' + d + ' ' + h + ':' + minute;
      },
      countDown(times){
         let that = this;
          clearInterval(this.$root.$mp.timers);
          this.$root.$mp.timers = setInterval(function(){
            var day=0,
              hour=0,
              minute=0,
              second=0;//时间默认值
            if(times > 0){
              day = Math.floor(times / (60 * 60 * 24));
              hour = Math.floor(times / (60 * 60)) - (day * 24);
              minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
              second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
            }
            if (day <= 9) day = '0' + day;
            if (hour <= 9) hour = '0' + hour;
            if (minute <= 9) minute = '0' + minute;
            if (second <= 9) second = '0' + second;
            that.countTime="还剩 "+day+"天："+hour+"时："+minute+"分："+second+"秒";
            times--;
          },1000);
          if(times<=0){
            clearInterval(this.$root.$mp.timers);
          }
      },
      loadData(){
        let that = this;
        ac_detail(this.$root.$mp.query.id,this.$root.$mp.query.share_id).then(res => {
          if(res.code == "SUCCESS"){
              that.ac_datas = res.data;
              let __progress = (Number(res.data.progress)/Number(res.data.target) * 100).toFixed(2);
              that.progress = __progress >= 100?'100':__progress;
              let __endTime = that.formatTime(res.data.endTime);
              that.endTime = __endTime;
              if(res.data.countdown > 0 && res.data.status == 1) that.countDown(res.data.countdown);
            }else{
              toast('获取活动信息失败！😭')
            }
            ac_rank(this.$root.$mp.query.id,1,3).then(res => {
              if(res.code == "SUCCESS"){
                that.invite = res.data.lists;
              }
            })
          })
        }
  },
  components: {
    wxParse,login,back
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
      that.loadData()
    }
    if(that.$root.$mp.query.share_id){
      that.showback = true;
    }else{
      that.showback = false;
    }
  },
  onShareAppMessage: function (res) {
      let that = this;
      let sessionid = getStor('sessionid');
      return {
        title: `${that.ac_datas.name}开始了，快来跟我一起参加应援吧`,
        // imageUrl: `${that.ac_datas.banner}`,
        path: `/pages/active_detail/main?id=${that.$root.$mp.query.id}&share_id=${sessionid}`
      }
  },
  onPullDownRefresh(){
    this.loadData()
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 500);
  }
};
</script>

<style lang="scss">
@import url("~mpvue-wxparse/src/wxParse.css");
.wxParse{
  text-align: justify;
}
.topBox {
  height: 360rpx;
  width: 100%;
}

.contentBox {
  padding: 30rpx;
  .starName {
    height: 29rpx;
    font-size: 30rpx;
    text-align: left;
    font-family: PingFang-SC-Medium;
    color: rgba(51, 51, 51, 1);
  }
  .pTitle {
    height: 40rpx;
    line-height: 40rpx;
    display: flex;
    align-items: center;
    padding-top: 20rpx;
    justify-content: space-between;
    .left {
      font-size: 22rpx;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
    }
    .right {
      font-size: 22rpx;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      background: linear-gradient(
        0deg,
        rgba(97, 6, 234, 1) 0%,
        rgba(236, 109, 255, 1) 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .invite {
    width: 400rpx;
    height: 70rpx;
    background: linear-gradient(
      0deg,
      rgba(202, 82, 237, 1) 0%,
      rgba(133, 72, 232, 1) 100%
    );
    border-radius: 10rpx;
    margin: 30rpx auto 0;
    font-size: 30rpx;
    color: #ffffff;
    line-height: 70rpx;
    border: 0;
  }
  .grays{
     background: linear-gradient(
      0deg,
      #e8e8e8 0%,
      gray 100%
    ) !important;

  }
  .title {
    width: 100%;
    margin-top: 30rpx;
    height: 30rpx;
    line-height: 30rpx;
    font-size: 26rpx;
    font-family: PingFang-SC-Medium;
    color: #A292FF;
    text-align: left;
  }
  .modeTitle {
    height: 40rpx;
    font-size: 26rpx;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: #A292FF;
    display: flex;
    margin-top: 50rpx;
    align-items: center;
    justify-content: space-between;
    .detailicon {
      height: 32rpx;
      width: 28rpx;
      margin-right: 20rpx;
    }
    .detailicons {
      height: 26rpx;
      width: 22rpx;
      margin-right: 20rpx;
    }
    .yybicon {
      height: 28rpx;
      width: 34rpx;
      margin-right: 20rpx;
    }
    .fright {
    font-size: 26rpx;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    align-items: center;
    display: flex;
    }

    .fright image {
    width: 12rpx;
    height: 22rpx;
    margin-left: 20rpx;
    }
  }
  .bestFans {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    margin-top: 30rpx;
    .bestFansBox {
      height: 340rpx;
      background: rgba(255, 255, 255, 1);
      display: flex;
      justify-content: space-between;
      .fansWrap {
        width: 33%;
        .headBox {
          width: 187rpx;
          height: 117rpx;
          margin: 150rpx auto 0;
          position: relative;
          background: url("http://image-1257827636.cos.ap-shanghai.myqcloud.com/%E6%A4%AD%E5%9C%8620%E6%8B%B7%E8%B4%9D%402x20181024164702.png")
            no-repeat;
          background-size: 100% 100%;
          &.firstFans {
            margin: 80rpx auto 0;
          }
          img {
            height: 128rpx;
            width: 128rpx;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            top: -40rpx;
            margin-left: -64rpx;
            border: 4rpx solid #ffa4c7;
            z-index: 99;
          }
          .cname {
            width: 130rpx;
            height: 36rpx;
            background: rgba(66, 195, 225, 1);
            border-radius: 18rpx;
            position: absolute;
            font-size: 24rpx;
            color: #fff;
            line-height: 36rpx;
            bottom: 0;
            left: 50%;
            margin-left: -65rpx;
            z-index: 999;
          }
        }
        .uName {
          width: 146rpx;
          height: 28rpx;
          font-size: 26rpx;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          margin: 20rpx auto;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          white-space: nowrap;
        }
      }
    }
  }
}
.progress {
  height: 10rpx;
  width: 100%;
  margin-top: 10rpx;
}

.bar {
  width: 100%;
}

.bar-unfill {
  height: 10rpx;
  display: block;
  background: #d7d7d7;
  width: 100%;
}

.bar-fill {
  height: 10rpx;
  display: block;
  background: #45c9a5;
  width: 0;
  -webkit-transition: width 0.8s ease;
  -moz-transition: width 0.8s ease;
  transition: width 0.8s ease;
  -webkit-animation: progressbar 3s forwards;
  animation: progressbar 3s forwards;
}

/* Chrome, Safari, Opera */

@-webkit-keyframes progressbar {
  from {
    width: 0;
  }

  to {
    width: var(--marqueeWidth--);
  }
}

/* Standard syntax */

@keyframes progressbar {
  from {
    width: 0;
  }

  to {
    width: var(--marqueeWidth--);
  }
}

.bar-fill-stripes {
  height: 10rpx;
  display: block;
  width: 0;
  background: linear-gradient(
    0deg,
    rgba(97, 6, 234, 1) 0%,
    rgba(236, 109, 255, 1) 100%
  );
  // -webkit-transition: width 0.8s ease;
  // -moz-transition: width 0.8s ease;
  // transition: width 0.8s ease;
  // -webkit-animation: progressbar 3s forwards;
  // animation: progressbar 3s forwards;
}
</style>
