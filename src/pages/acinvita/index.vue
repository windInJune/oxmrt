<template>
  <div class="container">
      <div class="searchbox">
        <div class="listBox">
            <div class="list" v-for="(item,index) in seachData" :key="index">
                <div class="rank">{{index+1}}</div>
                <div class="headBox">
                <img class="starImg" src="http://image-1257827636.cos.ap-shanghai.myqcloud.com/no20181022152854.gif" alt="">
                <img mode="aspectFill" class="starImgs" :src="item.avatar" alt="">
                </div>
                <div class="starName">{{item.nickName}}</div>
                <div class="getXb">
                <!-- <img class="xbIcon" :src="xbSrc" alt=""> -->
                <span>邀请人数：{{item.num}}</span>
                </div>
                <!-- <img :src="pickIcon" alt="" class="pickBtn rotates"> -->
                <form class='formidBtn' :data-starid="item.star_id" @submit="getFormId" report-submit>
                <button formType="submit"></button>
                </form>
            </div>
        </div>
        <div class="spinner" v-show="isLoading && seachData.length >= 10">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
        <div class="noMore" v-show="!isLoading && seachData.length <= 0">暂时没有数据~</div>
        <div class="noMore" v-show="!isLoading && seachPage.current == seachPage.last">没有更多数据了~</div>
      </div>
  </div>
</template>
<script>
import { ac_rank } from "@/utils/api.js";
import { setStor, getStor, removeStor, toast } from "@/utils/index.js";
export default {
  data() {
    return {
        pickIcon: require("../../../static/images/pick.png"),
        xbSrc: require("../../../static/images/xb.png"),
        seachData:[],
        seachPage: [],
        isLoading: false,
    };
  },
  methods: {
    getFormId(e) {
     console.log(e)
    },
    getMore(changtype,pageIndex){
      let that = this;
      ac_rank(this.$root.$mp.query.id,pageIndex).then(res => {
        if(res.code != "SUCCESS") return;
        let _list = res.data.lists;
        if (changtype == 1) {
          that.seachData = res.data.lists;
          that.seachPage = res.data.pages;
          that.isLoading = false;
        } else {
          let _nowLists = that.seachData.concat(_list);
          that.seachData = _nowLists;
          that.seachPage = res.data.pages;
          that.isLoading = false;
        }
      })
    }
  },
  mounted() {
    this.getMore(1,1);
  },
  onShareAppMessage(res) {
     return {
        title: `偶像名人堂星币商城即将开启，快来攒星币等兑换好礼吧！`,
        path: `/pages/home/main`
      }
  },
  onReachBottom() {
    let that = this;
    if (this.isLoading || this.seachPage.current == this.seachPage.last) return;
    this.isLoading = true;
    that.getMore(2, that.seachPage.next);
  },
  onPullDownRefresh(){
    this.getMore(1,1);
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 500);
  }
};
</script>
<style  lang="scss">
@import "../../assets/styles/mixins.scss";
@import "../../assets/styles/loading.css";
.container {
  overflow-x: hidden;
  .searchTop{
      height:100rpx;
      width: 100%;
      display: flex;
      align-items: center;
      padding:0 30rpx;
      box-sizing: border-box;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 9;
      background: #A292FF;
      input{
          height: 60rpx;
          width: 100%;
          background: #fff;
          border-radius: 6rpx;
          padding-left: 80rpx;
          padding-right: 30rpx;
          box-sizing: border-box;
          text-align: left;
      }
      img{
             position: absolute; 
             width: 30rpx;
             height: 30rpx;
             top: 35rpx;
             left: 55rpx;
        }
  }
  .searchbox{
   .listBox {
    width: 100%;
    box-sizing: border-box;
    padding: 0 30rpx;
    .list {
      width: 100%;
      height: 180rpx;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 5px 5px 0px rgba(106, 86, 225, 0.42);
      margin-bottom: 10rpx;
      position: relative;
      border-radius: 5rpx;
      .rank {
        position: absolute;
        bottom: -40rpx;
        left: -20rpx;
        font-size: 200rpx;
        font-family: Jade2B;
        font-weight: 400;
        color: rgba(157, 140, 255, 1);
        opacity: 0.3;
        transform: rotate(10deg);
        -webkit-transform: rotate(10deg);
        z-index: 9;
      }
      .headBox {
        height: 100rpx;
        width: 100rpx;
        position: absolute;
        z-index: 99;
        left: 60rpx;
        top: 40rpx;
        .starImg {
          position: absolute;
          top: -16rpx;
          left: -18rpx;
          height: 134rpx;
          width: 138rpx;
          border-radius: 50%;
        }
        .starImgs {
          border-radius: 50%;
        }
        .firstIcon {
          width: 55rpx;
          height: 54rpx;
          position: absolute;
          left: -20rpx;
          top: -20rpx;
        }
      }
      .starName {
        height: 40rpx;
        line-height: 40rpx;
        text-align: left;
        font-size: 28rpx;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        position: absolute;
        left: 210rpx;
        top: 50rpx;
        @include overhide();
      }
      .getXb {
        position: absolute;
        left: 210rpx;
        top: 106rpx;
        height: 30rpx;
        display: flex;
        align-items: center;
        font-size: 28rpx;
        .xbIcon {
          width: 30rpx;
          height: 30rpx;
          margin-right: 10rpx;
        }
      }
      .bestFans,
      .guardian {
        width: 256rpx;
        height: 28rpx;
        background: rgba(255, 185, 212, 1);
        border-radius: 14rpx;
        position: absolute;
        left: 320rpx;
      }
      .bestFans {
        top: 48rpx;
        .test {
          position: absolute;
          top: -10rpx;
          left: 20rpx;
          height: 24rpx;
          font-size: 22rpx;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
        .bestFansIcon {
          position: absolute;
          top: -40rpx;
          right: 30rpx;
          height: 82rpx;
          width: 82rpx;
        }
      }
      .guardian {
        bottom: 36rpx;
        .test {
          position: absolute;
          top: -10rpx;
          left: 20rpx;
          height: 24rpx;
          font-size: 22rpx;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
      }
      .pickBtn {
        position: absolute;
        top: 40rpx;
        right: 30rpx;
        height: 100rpx;
        width: 100rpx;
        
      }
    }
  }
  }
}
.rotates{
  animation:rotates 3s linear infinite;
}
.noMore {
    padding: 20rpx 0;
    color: #ffffff;
    font-size: 28rpx;
  }
@keyframes rotates{ 
  0%{
		transform: rotate(0deg);
	}
	100%{
		transform: rotate(360deg);
	}
}
</style>
