<template>
  <div class="container">
    <openimg :isshow="openShow" v-on:close="closeOpen" :imgsrc="openSrc" :imghref="openHerf"></openimg>
    <login :authorization="login" v-on:login="getUserInfo"></login>
    <div class="ruleBox">
        <div class="ruleContent"></div>
    </div>
    <div class="topBox">
      <div class="inputBox" @click="gotoSearch">
        <input class="starSearch" placeholder="输入您想找的明星" type="text" disabled>
        <img class="icon" :src="searchSrc" alt="">
      </div>
      <swiper class="swiperBox" interval="5000">
        <block v-for="(item,index) in imgUrls" :key="index">
          <swiper-item>
            <image mode="aspectFill" :src="item.image" :data-url="item.url" @click="gotodetail" :data-type="item.type" class="slide-image" width="355" height="150" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="myloveTitle" v-show="aidouList.length > 0">我的爱豆</div>
    <div class="myloveBox" v-show="aidouList.length > 0">
      <div class="myloveList" v-for="(item,index) in aidouList" :key="index">
        <img mode="aspectFill" :src="item.star_avatar" alt="" class="starIcon">
        <div class="starName">{{item.star_name}}</div>
        <div class="getXb">
          <!-- <img class="xbIcon" :src="xbSrc" alt=""> -->
          <span style="font-size:24rpx">已连续守护 {{item.without_hitdays}}天</span>
        </div>
        <div class="pickBtn">pick</div>
        <form class='formidBtn' @longpress="loginpressFn" :data-starname="item.star_name" :data-starid="item.star_id" @submit="getFormId"  report-submit>
          <button formType="submit"></button>
        </form>
      </div>
    </div>
    <div class="navBox">
      <div class="navCheck">
        <div :class="[isMonth?'nav week':'nav week active']" @click="checkInMonth(false)">周榜</div>
        <div :class="[isMonth?'nav month active':'nav month']" @click="checkInMonth(true)">月榜</div>
      </div>
      <div class="navRight">
        <picker v-if="isMonth" @change="monthPickerChange" :value='monthIndex' :range="monthArray" range-key='month_cycle'>
          <div class="picker">
            <span>{{monthIndex == "0"? "本月" : monthArray[monthIndex].month_order_text}} {{monthArray[monthIndex].month_cycle}}</span>
            <img :src="downIcon" alt="" class="downIcon">
          </div>
        </picker>
        <picker v-else @change="weekPickerChange" :range="weekArray" :value="weekIndex" range-key='week_cycle'>
          <div class="picker">
            <span>{{weekIndex == "0"? "本周" : weekArray[weekIndex].week_order_text}} {{weekArray[weekIndex].week_cycle}}</span>
            <img :src="downIcon" alt="" class="downIcon">
          </div>
        </picker>
      </div>
    </div>
    <div class="listBox">
      <div class="list" v-for="(item,index) in firstList" :key="index">
        <div class="rank">{{index+1}}</div>
        <div class="headBox">
          <img class="starImg" src="http://image-1257827636.cos.ap-shanghai.myqcloud.com/no20181022152854.gif" alt="">
          <img class="starImgs" mode="aspectFill" :src="item.star_avatar" alt="">
          <img :src="firstIcon" v-if="index == 0" alt="" class="firstIcon">
          <img :src="twoIcon" v-else-if="index == 1" alt="" class="firstIcon">
          <img :src="threeIcon" v-else alt="" class="firstIcon">
        </div>
        <div class="starName">{{item.star_name}}</div>
        <div class="getXb">
          <img class="xbIcon" :src="xbSrc" alt="">
          <span>{{item.force}}</span>
        </div>
        <div class="bestFans">
          <div class="test">最佳星粉：</div>
          <img :src="item.optimumFanInfo[0].avatar" alt="" class="bestFansIcon">
        </div>
        <div class="guardian">
          <div class="test">守护者人数：{{item.hitFansNum}}人</div>
        </div>
        <img :src="pickIcon" alt="" class="pickBtn rotates">
        <form class='formidBtn' :data-starid="item.star_id" @submit="getFormId" report-submit>
          <button formType="submit"></button>
        </form>
      </div>
    </div>
    <div class="otherListBox">
      <div class="list" v-for="(item,index) in starList" :key="index">
        <div class="rank">{{index+4}}</div>
        <div class="headBox">
          <img mode="aspectFill" :src="item.star_avatar" alt="">
        </div>
        <div class="starName">{{item.star_name}}</div>
        <div class="getXb">
          <img class="xbIcon" :src="xbSrc" alt="">
          <span>{{item.force}}</span>
        </div>
        <div class="pickBtn">pick</div>
        <form class='formidBtn' @submit="getFormId" :data-starid="item.star_id" report-submit>
          <button formType="submit"></button>
        </form>
      </div>
    </div>
    <div class="spinner" v-show="isLoading && starList.length >= 7">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
    <div class="noMore" v-show="!isLoading && firstList.length <= 0">暂时没有数据~</div>
    <div class="noMore" v-show="!isLoading && starPage.current == starPage.last && starPage.current <10">没有更多数据了~</div>
    <div class="noMore" v-show="!isLoading && starPage.current == starPage.last & starPage.current >=10">暂时只展示前100名~</div>
  </div>
</template>
<script>
import login from "@/components/login";
import openimg from "@/components/openimg";
import {getLaunchScreen,getBannerInfo,delMyIdol,getSysFlowers, starRank, getRankCycleList, logins,getMyIdolList } from "@/utils/api.js";
import { setStor, getStor, removeStor, toast } from "@/utils/index.js";
export default {
  data() {
    return {
      searchSrc: require("../../../static/images/search.png"),
      xbSrc: require("../../../static/images/xb.png"),
      downIcon: require("../../../static/images/down.png"),
      firstIcon: require("../../../static/images/no1.png"),
      twoIcon: require("../../../static/images/no2.png"),
      threeIcon: require("../../../static/images/no3.png"),
      pickIcon: require("../../../static/images/pick.png"),
      isMonth: false,
      imgUrls: [],
      weekIndex: 0,
      monthIndex: 0,
      monthArray: [{}],
      weekArray: [{}],
      firstList: [],
      starList: [],
      starPage: [],
      login: false,
      isLoading: false,
      openShow:false,
      openSrc:'',
      openHerf:'',
      aidouList:[],
    };
  },
  components: {
    login,openimg
  },
  methods: {
    //banner关闭
    closeOpen(){
      this.openShow = false;
    },
    gotodetail(e){
      console.log(e)
      if(e.currentTarget.dataset.url.indexOf('http') > -1){
        setStor('webviewurl',e.currentTarget.dataset.url)
        wx.navigateTo({
          url: `/pages/webview/main`
        });
      }else{
        wx.navigateTo({
          url: `${e.currentTarget.dataset.url}`
        });
      }
       
    },
    loginpressFn(e){
      let that = this;
      if(!e.currentTarget.dataset.starid) return;
      wx.showModal({
        title: '温馨提示',
        content: `确定要从爱豆列表移除${e.currentTarget.dataset.starname}？`,
        success(res) {
          if (res.confirm) {
            delMyIdol(e.currentTarget.dataset.starid).then(res => {
              let newAidoulist = that.aidouList.filter(function(item,index){
                return item.star_id != e.currentTarget.dataset.starid
              })
              that.aidouList = newAidoulist;
              toast('已为您移除~')
            })
          }
        }
      })
    },
    getFormId(e) {
      if(!e.currentTarget.dataset.starid) return;
      wx.navigateTo({
        url: `/pages/space/main?starid=${e.currentTarget.dataset.starid}`
      });
    },
    checkInMonth(types) {
      let _this = this;
      if (this.isMonth == types) return;
      this.isMonth = types;
      if (types) {
        let starTime = _this.monthArray[_this.monthIndex].month_cycle.split(
          "-"
        )[0];
        let endTime = _this.monthArray[_this.monthIndex].month_cycle.split(
          "-"
        )[1];
        starRank(starTime, endTime).then(data => {
          if(data.code != "SUCCESS") return;
          data.data.lists = data.data.lists.map(function(item,index){
            if(Number(item.force) >= 10000){
              item.force = (Number(item.force)/10000).toFixed(2) + '万'
            }
            return item; 
          });
          _this.starList = data.data.lists.slice(3);
          _this.firstList = data.data.lists.slice(0, 3);
          _this.starPage = data.data.pages;
        });
      } else {
        let starTime = _this.weekArray[_this.weekIndex].week_cycle.split(
          "-"
        )[0];
        let endTime = _this.weekArray[_this.weekIndex].week_cycle.split("-")[1];
        starRank(starTime, endTime).then(data => {
          if(data.code != "SUCCESS") return;
           data.data.lists = data.data.lists.map(function(item,index){
              if(Number(item.force) >= 10000){
                item.force = (Number(item.force)/10000).toFixed(2) + '万'
              }
              return item; 
            });
          _this.starList = data.data.lists.slice(3);
          _this.firstList = data.data.lists.slice(0, 3);
          _this.starPage = data.data.pages;
        });
      }
    },
    weekPickerChange(e) {
      let _this = this;
      if (e.mp.detail.value == this.weekIndex) return;
      this.weekIndex = e.mp.detail.value;
      let starTime = _this.weekArray[_this.weekIndex].week_cycle.split("-")[0];
      let endTime = _this.weekArray[_this.weekIndex].week_cycle.split("-")[1];
      _this.getlist(1, starTime, endTime, 1);
    },
    monthPickerChange(e) {
      let _this = this;
      if (e.mp.detail.value == this.monthIndex) return;
      this.monthIndex = e.mp.detail.value;
      let starTime = _this.monthArray[e.mp.detail.value].month_cycle.split(
        "-"
      )[0];
      let endTime = _this.monthArray[e.mp.detail.value].month_cycle.split(
        "-"
      )[1];
      _this.getlist(1, starTime, endTime, 1);
    },
    getlist(changtype, _startDate, _endDate, pageIndex) {
      let that = this;
      starRank(_startDate, _endDate, pageIndex).then(res => {
        if(res.code != "SUCCESS") return;
        let _list = res.data.lists.map(function(item,index){
          if(Number(item.force) >= 10000){
            item.force = (Number(item.force)/10000).toFixed(2) + '万'
          }
          return item; 
        });

        if (changtype == 1) {
          that.starList = _list.slice(3);
          that.firstList = _list.slice(0, 3);
          that.starPage = res.data.pages;
          that.isLoading = false;
        } else {
          let _nowLists = that.starList.concat(_list);
          that.starList = _nowLists;
          that.starPage = res.data.pages;
          that.isLoading = false;
        }
      });
    },
    getUserInfo(e) {
        let that = this;
        that.login = false;
        getMyIdolList().then(res => {
          that.aidouList = res.data;
        })
    },
    gotoSearch(){
       wx.navigateTo({
        url: `/pages/search/main`
      });
    },
    loadData(){
      let _this = this;
      getRankCycleList().then(res => {
        if(res.code != "SUCCESS") return;
        _this.monthArray = res.data.month;
        _this.weekArray = res.data.week;
        if (_this.isMonth) {
          let starTime = res.data.month[_this.monthIndex].month_cycle.split(
            "-"
          )[0];
          let endTime = res.data.month[_this.monthIndex].month_cycle.split(
            "-"
          )[1];
          _this.getlist(1, starTime, endTime, 1);
        } else {
          let starTime = res.data.week[_this.weekIndex].week_cycle.split("-")[0];
          let endTime = res.data.week[_this.weekIndex].week_cycle.split("-")[1];
          _this.getlist(1, starTime, endTime, 1);
        }
      });
      getBannerInfo().then(res => {
        _this.imgUrls = res.data;
      })
    }
  },
  onShow() {
    let _this = this;
    let _unionid = getStor("sessionid");
    if (!_unionid) {
      _this.login = true;
      wx.login({
        success(res) {
          setStor("code", res.code);
        }
      });
    }else{
      _this.login = false;
      getMyIdolList().then(res => {
          _this.aidouList = res.data;
      })
    }
  },
  created() {
    this.loadData()
  },
  mounted(){
    let that = this;
    getLaunchScreen().then(res => {
      if(res.data.launchScreenImgInfo.imgUrl && res.data.launchScreenImgInfo.imgUrl!=""){
          that.openSrc = res.data.launchScreenImgInfo.imgUrl;
          that.openHerf = res.data.launchScreenImgInfo.imgLocationUrl;
          that.openShow = true;
      }
    })
  },
  onReachBottom() {
    let that = this;
    if (this.isLoading || this.starPage.current == this.starPage.last) return;
    this.isLoading = true;
    let _startDate, _endDate;
    if (that.isMonth) {
      _startDate = that.monthArray[that.monthIndex].month_cycle.split("-")[0];
      _endDate = that.monthArray[that.monthIndex].month_cycle.split("-")[1];
    } else {
      _startDate = that.weekArray[that.weekIndex].week_cycle.split("-")[0];
      _endDate = that.weekArray[that.weekIndex].week_cycle.split("-")[1];
    }
    that.getlist(2, _startDate, _endDate, that.starPage.next);
  },
  onShareAppMessage(res) {
     return {
        title: `偶像名人堂星币商城即将开启，快来攒星币等兑换好礼吧！`,
        path: `/pages/home/main`
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
<style  lang="scss">
@import "../../assets/styles/mixins.scss";
@import "../../assets/styles/loading.css";
.container {
  overflow-x: hidden;
  .topBox {
    background: url("https://image-1257827636.cos.ap-shanghai.myqcloud.com/bannerbg20181022134434.png")
      no-repeat;
    background-size: 100% auto;
    padding: 0 30rpx;
    box-sizing: border-box;
    min-height: 352rpx;
    width: 100%;
    .inputBox {
      position: relative;
      width: 100%;
      height: 70rpx;
      .starSearch {
        width: 100%;
        height: 70rpx;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 5rpx 12rpx 1rpx rgba(157, 141, 253, 0.28);
        border-radius: 35rpx;
        font-size: 30rpx;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(158, 157, 163, 1);
        text-align: left;
        padding: 0 64rpx;
        box-sizing: border-box;
      }
      .icon {
        width: 34rpx;
        height: 34rpx;
        position: absolute;
        top: 18rpx;
        left: 16rpx;
      }
    }
    .swiperBox {
      height: 360rpx;
      width: 100%;
      margin-top: 30rpx;
      position: relative;
      .slide-image {
        border-radius: 10rpx;
      }
    }
  }
  .myloveTitle {
    padding: 0 30rpx;
    font-size: 30rpx;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    margin: 30rpx 0;
    width: 100%;
    text-align: left;
    box-sizing: border-box;
  }
  .myloveBox {
    height: 100rpx;
    padding-left: 30rpx;
    box-sizing: border-box;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    text-align: left;
    .myloveList {
      width: 385rpx;
      height: 100%;
      background: #fff;
      border-radius: 10rpx;
      position: relative;
      display: inline-block;
      margin-right: 30rpx;
      font-size: 25rpx;
      .starIcon {
        width: 80rpx;
        height: 80rpx;
        position: absolute;
        left: 20rpx;
        top: 10rpx;
      }
      .starIcons {
        border-radius: 50%;
      }
      .starName {
        position: absolute;
        top: 18rpx;
        height: 30rpx;
        line-height: 30rpx;
        font-size: 28rpx;
        padding-left: 110rpx;
      }
      .getXb {
        position: absolute;
        bottom: 14rpx;
        height: 30rpx;
        display: flex;
        align-items: center;
        font-size: 28rpx;
        padding-left: 110rpx;
        .xbIcon {
          width: 30rpx;
          height: 30rpx;
          margin-right: 10rpx;
        }
      }
      .pickBtn {
        width: 88rpx;
        height: 40rpx;
        line-height: 40rpx;
        color: #fff;
        text-align: center;
        background: linear-gradient(
          0deg,
          rgba(97, 6, 234, 1) 0%,
          rgba(236, 109, 255, 1) 100%
        );
        border-radius: 10rpx;
        position: absolute;
        right: 20rpx;
        top: 30rpx;
      }
    }
  }
  .navBox {
    padding: 0 30rpx;
    margin-top: 60rpx;
    height: 46rpx;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .navCheck {
      width: 324rpx;
      display: flex;
      align-items: center;
      .nav {
        height: 46rpx;
        width: 160rpx;
        font-size: 30rpx;
        text-align: center;
        color: #fff;
        line-height: 46rpx;
        position: relative;
        background: url("http://image-1257827636.cos.ap-shanghai.myqcloud.com/120181022141755.png")
          no-repeat;
        background-size: 100% 100%;
      }
      .month {
        &.active::before {
          content: "月榜";
          position: absolute;
          top: 0;
          left: 8rpx;
          width: 144rpx;
          height: 60rpx;
          line-height: 46rpx;
          text-align: center;
          color: #fff;
          font-size: 30rpx;
          z-index: 999;
          background: linear-gradient(
            0deg,
            rgba(97, 6, 234, 1) 0%,
            rgba(236, 109, 255, 1) 100%
          );
          box-shadow: 0px 2px 8px 0px rgba(157, 140, 255, 0.68);
          border-bottom-left-radius: 30rpx;
          border-bottom-right-radius: 30rpx;
        }
      }
      .week {
        &.active::before {
          content: "周榜";
          position: absolute;
          top: 0;
          left: 8rpx;
          width: 144rpx;
          height: 60rpx;
          line-height: 46rpx;
          text-align: center;
          color: #fff;
          font-size: 30rpx;
          background: linear-gradient(
            0deg,
            rgba(97, 6, 234, 1) 0%,
            rgba(236, 109, 255, 1) 100%
          );
          box-shadow: 0px 2px 8px 0px rgba(157, 140, 255, 0.68);
          border-bottom-left-radius: 30rpx;
          border-bottom-right-radius: 30rpx;
          z-index: 999;
        }
      }
    }
    .navRight {
      color: #fff;
      font-size: 26rpx;
      border-radius: 14rpx;
      display: flex;
      flex: 1;
      align-items: center;
      flex-direction: row-reverse;
      .downIcon {
        width: 19rpx;
        height: 11rpx;
        margin-left: 5rpx;
      }
    }
  }
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
        height: 102rpx;
        width: 102rpx;
        position: absolute;
        z-index: 99;
        left: 56rpx;
        top: 40rpx;
        .starImg {
          position: absolute;
          top: -16rpx;
          left: -16rpx;
          height: 134rpx;
          width: 138rpx;
          border-radius: 50%;
        }
        .starImgs {
          border-radius: 60%;
        }
        .firstIcon {
          width: 55rpx;
          height: 54rpx;
          position: absolute;
          left: -18rpx;
          top: -19rpx;
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
        left: 190rpx;
        top: 50rpx;
        @include overhide();
      }
      .getXb {
        position: absolute;
        left: 186rpx;
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
          border-radius: 50%;
          border:1rpx solid #f9f9f9;
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
        top: 50rpx;
        right: 20rpx;
        height: 80rpx;
        width: 80rpx;
      }
    }
  }
  .otherListBox {
    width: 100%;
    box-sizing: border-box;
    padding: 0 30rpx;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 30rpx;
    .list {
      width: 49%;
      height: 180rpx;
      border-radius: 5rpx;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 5px 5px 0px rgba(106, 86, 225, 0.42);
      margin-top: 10rpx;
      position: relative;
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
        height: 102rpx;
        width: 102rpx;
        position: absolute;
        z-index: 99;
        left: 20rpx;
        top: 40rpx;
        border-radius: 50%;
        overflow: hidden;
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
        left: 140rpx;
        top: 50rpx;
        @include overhide();
      }
      .getXb {
        position: absolute;
        left: 140rpx;
        top: 100rpx;
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
      .pickBtn {
        width: 88rpx;
        height: 40rpx;
        line-height: 40rpx;
        color: #fff;
        text-align: center;
        background: linear-gradient(
          0deg,
          rgba(97, 6, 234, 1) 0%,
          rgba(236, 109, 255, 1) 100%
        );
        border-radius: 10rpx;
        position: absolute;
        right: 10rpx;
        bottom: 10rpx;
      }
    }
  }
  .noMore {
    padding: 20rpx 0;
    color: #ffffff;
    font-size: 28rpx;
  }
}
.rotates{
  animation:rotates 3s linear infinite;
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
