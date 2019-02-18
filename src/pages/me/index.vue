<template>
  <div class="container">
    <login :authorization="login" v-on:login="getUserInfo"></login>
    <div class="top">
       <!-- <img :src="setSrc" alt="" class="set"> -->
       <img :src="userData.avatarUrl" alt="" class="userHead">
       <div class="userName">昵称：{{userData.nickName}}</div>
       <div class="sign">我的星币：{{myFlowers}}</div>
    </div>
    <div class="monthCard hide">
      <div class="cardBox">
        <img src="http://image-1257827636.cos.ap-shanghai.myqcloud.com/monthcard20181026165304.png" alt="">
      </div>
    </div>
     <div class='list' @click="xbsc">
        <div class='left'>
          <img style="width:30rpx;height:30rpx;"  class='leftIcon flower leftIconOne' :src='leftIconOne'>
          <span class='textS'>星币商城</span>
        </div>
        <div>
          <img class='rightIcon' :src='rightIcon'>
        </div>
      </div>
       
      <div class='list' @click="xbjl">
        <div class='left'>
          <img style="width:30rpx;height:30rpx;"  class='leftIcon flower leftIconOne' :src='xbSrc'>
          <span class='textS'>星币记录</span>
        </div>
        <div>
          <img class='rightIcon' :src='rightIcon'>
        </div>
      </div>
       <div class='list' @click="newLogin">
        <div class='left'>
          <img  style="width:25rpx;height:32rpx;"  class='leftIcon flower leftIconOne'  :src='leftIconThree'>
          <span class='textS'>重新登录</span>
        </div>
        <div>
          <img class='rightIcon' :src='rightIcon'>
        </div>
      </div>
      <div class='list'>
        <div class='left'>
          <img style="width:30rpx;height:33rpx;"  class='leftIcon flower leftIconOne'  :src='leftIconTwo'>
          <span class='textS'>联系客服</span>
        </div>
        <div>
          <img class='rightIcon' :src='rightIcon'>
        </div>
        <button class="buttons" plain open-type="contact"></button>
      </div>
      <div class='list'>
        <div class='left'>
          <img style="width:30rpx;height:30rpx;" class='leftIcon flower leftIconOne'  :src='leftIconYj'>
          <span class='textS'>意见反馈</span>
        </div>
        <div>
          <img class='rightIcon' :src='rightIcon'>
        </div>
        <button class="buttons" plain open-type="feedback"></button>
      </div>
      <div class='list' @click="ruleShow = true">
        <div class='left'>
          <img style="width:28rpx;height:28rpx;border:1px solid #A292FF;border-radius:50%;"  class='leftIcon flower leftIconOne' :src='ruleSrc'>
          <span class='textS'>活动规则</span>
        </div>
        <div>
          <img class='rightIcon' :src='rightIcon'>
        </div>
      </div>
      <ad unit-id="adunit-cc81577bbfba3e6f"></ad>
      <rule :isshow="ruleShow" :content="rulecontents" v-on:close="closeOpen"></rule>
  </div>
</template>

<script>
import { setStor, getStor, removeStor, toast } from "@/utils/index.js";
import login from "@/components/login";
import rule from "@/components/rule";
import {rankhit,rules} from "@/utils/api.js";
export default {
  data () {
    return {
      myFlowers:0,
      login:false,
      userData:{},
      setSrc: require("../../../static/images/set.png"),    
      ruleSrc: require("../../../static/images/rule.png"),    
      rightIcon: require("../../../static/images/4.png"),    
      leftIconOne: require("../../../static/images/2.png"),    
      leftIconTwo: require("../../../static/images/3.png"),    
      leftIconThree: require("../../../static/images/12.png"),    
      leftIconYj: require("../../../static/images/yj.png"),    
      xbSrc: require("../../../static/images/xb.png"),
      rulecontents:'',
      ruleShow:false
    }
  },
  components: {
    login,
    rule
  },
  methods: {
    getUserInfo(e) {
        let that = this;
        that.login = false;
        let _userdata = getStor('userdatas')?JSON.parse(getStor('userdatas')):{};
        console.log(_userdata)
        that.userData = _userdata;
    },
    closeOpen(){
      this.ruleShow = false;
    },
    xbsc(){
      wx.getSystemInfo({
      success:function(res){
        if(res.system.indexOf('iOS') > -1){
          toast('商城即将开启，快先攒星币等兑好礼吧！')

        }else{
          wx.navigateTo({
            url: `/pages/logs/main?starid=null`
          });
        }
      }
      })
      
    },
    xbjl(){
      wx.navigateTo({
        url: `/pages/counter/main`
      });
    },
    newLogin(){
      this.login = true;
      wx.login({
        success(res) {
          setStor("code", res.code);
        }
      });
      setStor("sessionid",null)
    }
  },
  mounted(){
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
      let _userdata = getStor('userdatas')?JSON.parse(getStor('userdatas')):{};
      _this.userData = _userdata;
    }
    rankhit().then(res => {
        _this.myFlowers = res.data.myFlowers;
    })
    rules().then(res => {
      _this.rulecontents = res.data.rule_text
    })
  }
}
</script>

<style  lang="scss">
@import "../../assets/styles/mixins.scss";
.container{
  background: #fff;  
  .top{
    height: 300rpx;
    width: 100%;
    background: url('http://image-1257827636.cos.ap-shanghai.myqcloud.com/%E7%BB%8423%402x20181026170551.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    .set{
      width: 42rpx;
      height: 46rpx;
      position: absolute;
      right: 30rpx;
      top: 20rpx;
    }
    .userHead{
       width: 180rpx;
      height: 180rpx;
      position: absolute;
      left: 59rpx;
      top: 61rpx;
      border-radius: 50%;
    }
    .userName{
      padding-left: 300rpx;
      padding-top: 100rpx;
      font-size:30rpx;
      font-family:PingFang-SC-Bold;
      font-weight:bold;
      color:rgba(255,255,255,1);
      text-align: left;
    }
    .sign{
      padding-left: 300rpx;
      padding-top: 20rpx;
      font-size:30rpx;
      font-family:PingFang-SC-Bold;
      font-weight:bold;
      color:rgba(255,255,255,1);
      text-align: left;
      line-height: 40rpx;
    }
  }
  .monthCard{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 280rpx;
    width: 100%;
    display: none;
    .cardBox{
      width: 500rpx;
      height: 234rpx;
      img{
        height: 100%;
        width: 100%;
      }
    }
  }
  .list {
  height: 100rpx;
  padding: 0 30rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 30rpx;
  border-bottom: 1px solid rgb(232, 232, 232);
  position: relative;
  .left {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .buttons{
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    z-index: 999;
  }
  .rightIcon {
    width: 12rpx;
    height: 21rpx;
  }

  .textS {
    display: inline-block;
    margin-left: 20rpx;
  }
  .leftIconOne{
    width:34rpx;
    height:38rpx
  }
}


}
</style>
