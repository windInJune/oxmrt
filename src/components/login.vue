<template>
  <div>
    <div class="pubCover" v-show="authorization">
      <div class="login">
        <div class="logoBox">
          <img :src="logo" alt="">
        </div>
        <p>使用微信快捷登录</p>
        <button @getuserinfo="getUserInfo" open-type="getUserInfo">同意登录</button>
      </div>
    </div>

  </div>
</template>

<script>
import { logins,getSysFlowers } from "@/utils/api.js";
import { setStor, getStor, removeStor, toast } from "@/utils/index.js";
export default {
  data(){
    return {
      logo:require("../../static/images/logo.png")
    }
  },
  props: ["authorization"],
  methods: {
    getUserInfo(e) {
      let that = this;
      let _code = getStor("code");
      setStor("userdatas", e.mp.detail.rawData);
      if (_code && e.mp.detail.encryptedData && e.mp.detail.iv) {
        logins(_code, e.mp.detail.encryptedData, e.mp.detail.iv).then(res => {
          if (res.code !== "SUCCESS") {
            wx.login({
              success(res) {
                setStor("code", res.code);
              }
            });
            toast("授权失败，请重试~");
            return;
          }
          setStor("sessionid", res.data.sessionID);
          getSysFlowers('firstLogin');
          this.$emit("login", res.data.sessionID);
        });
      }
    }
  }
};
</script>

<style lang="scss">
.pubCover {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  bottom: 0;
  right: 0;
  z-index: 999999;
  .login {
    width: 500rpx;
    height: 294rpx;
    position: fixed;
    z-index: 9999999;
    top: 50%;
    left: 50%;
    margin-top: -197rpx;
    margin-left: -250rpx;
    background: rgba(255, 255, 255, 1);
    border-radius: 10rpx;
    .logoBox {
      width: 150rpx;
      height: 150rpx;
      position: absolute;
      background: rgba(157, 140, 255, 1);
      border-radius: 50%;
      left: 50%;
      margin-left: -75rpx;
      top: -75rpx;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    p {
      font-size: 30rpx;
      font-family: PingFang-SC-Medium;
      color: rgba(51, 51, 51, 1);
      margin-top: 120rpx;
    }
    button {
      width: 220rpx;
      height: 60rpx;
      background: rgba(157, 140, 255, 1);
      border-radius: 10rpx;
      margin: 60rpx auto;
      line-height: 60rpx;
      text-align: center;
      color: #fff;
      font-size: 30rpx;
    }
  }
}
</style>
