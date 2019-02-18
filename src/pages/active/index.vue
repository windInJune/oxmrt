<template>
  <div class="activeList">
      <div class="list formidBtn" v-for="(item,index) in activeList" :key="index">
          <div class="activeBanner">
            <img mode="aspectFill" class="activeBanner" :src="item.banner" alt="">
            <div class="progress" v-show="item.status == '1'">
                <div class="bar">
                    <span class="bar-unfill">
                    <span class="bar-fill-stripes"  :style='{"width":item._progress+"%"}'></span>
                    </span>
                </div>
            </div>
          </div>
          <h2>{{item.name}}</h2>
          <div class="types" v-if="item.type == '1'">
            <p v-if="item.status == '0'">
                <span class="left">活动已结束</span>
                <span class="right">{{item._progress >= 100?"已完成":"未完成"}}</span>
            </p>
            <p v-else-if="item.status == '-1'">
                <span class="left">截止日期：{{item._endTime}}</span>
                <span class="right">活动未开始</span>
            </p>
            <p v-else>
                <span class="left">截止日期：{{item._endTime}}</span>
                <span class="right animated infinite pulse">已完成：{{item._progress}}%</span>
            </p>
          </div>
          <div class="types" v-else>
              <p v-if="item.status == '0'">
                  <span class="left">活动已结束</span>
                  <span class="right">参与人数：{{item.joinMemberNum}}人</span>
              </p>
               <p v-else-if="item.status == '-1'">
                <span class="left">截止日期：{{item._endTime}}</span>
                <span class="right">活动未开始</span>
            </p>
              <p v-else>
                 <span class='left'>参与人数：{{item.joinMemberNum}}人</span>
                 <span class='right animated infinite pulse'>剩余天数：{{item.remain_days}}天</span>
              </p>
          </div>
          <form class='formidBtn' :id="item.activity_id"   @submit="getFormId"  report-submit>
            <button formType="submit"></button>
          </form>
      </div>
      <loading :isloading="isLoading" :list="activeList" :listpage="pages"></loading>
  </div>
</template>

<script>
import { activityList } from "@/utils/api.js";
import { formatTime,toast } from "@/utils/index.js";
import loading from "@/components/loading";
export default {
  data(){
    return {
      activeList:[],
      pages: [],
      isLoading: false
    }
  },
  methods: {
      getFormId(e){
          wx.navigateTo({
            url: `/pages/active_detail/main?id=${e.mp.currentTarget.id}`
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
      getlist(changtype, pageIndex) {
        let that = this;
        activityList( pageIndex).then(res => {
          if(res.code != "SUCCESS"){
            toast(res.msg)
            return;
          }
          let _list = res.data.lists.map(function(item,index){
              let __progress = (Number(item.progress)/Number(item.target) * 100).toFixed(2);
              item._progress = __progress >= 100?'100':__progress;
              let __endTime = that.formatTime(item.endTime);
              item._endTime = __endTime;
              return item;
          });
          if (changtype == 1) {
            that.activeList = _list;
            that.pages = res.data.pages;
            that.isLoading = false;
          } else {
            let _nowLists = that.activeList.concat(_list);
            that.activeList = _nowLists;
            that.pages = res.data.pages;
            that.isLoading = false;
          }
        });
      },
  },
  created() {
    this.getlist(1,1);
  },
  components: {
    loading
  },
  onReachBottom() {
    let that = this;
    if (this.isLoading || this.pages.current == this.pages.last) return;
    that.isLoading = true;
    that.getlist(2,that.pages.next);
  },
  onShareAppMessage(res) {
     return {
        title: `偶像名人堂星币商城即将开启，快来攒星币等兑换好礼吧！`,
        path: `/pages/active/main`
      }
  },
  onPullDownRefresh(){
    this.getlist(1,1);
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 500);
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/animate.css";
.activeList {
  display: block;
  padding: 30rpx;
  .list {
    height: 400rpx;
    margin-bottom: 20rpx;
    position: relative;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 7px 0px rgba(251, 170, 223, 0.31);
    .activeBanner {
      width: 100%;
      height: 300rpx;
      position: relative;
      img {
        height: 100%;
        width: 100%;
      }
    }
    h2 {
      height: 40rpx;
      font-size: 24rpx;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
      line-height: 40rpx;
      text-align: left;
      padding: 15rpx 30rpx 0;
    }
    p {
      height: 40rpx;
      line-height: 40rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30rpx;
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
  }
}
.progress {
  height: 10rpx;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
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
  background:linear-gradient(0deg,rgba(97,6,234,1) 0%,rgba(236,109,255,1) 100%);
  // -webkit-transition: width 0.8s ease;
  // -moz-transition: width 0.8s ease;
  // transition: width 0.8s ease;
  // -webkit-animation: progressbar 3s forwards;
  // animation: progressbar 3s forwards;
}
</style>
