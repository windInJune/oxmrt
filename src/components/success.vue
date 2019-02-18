<template>
  <div
    class="pubCover"
    v-show="isshow"
  >
    <div
      class='successBox'
    >
      <img
        class='succssTop'
        :src='successIcon'
      >
      <img
        mode="aspectFill"
        class='succssImg'
        :src='star_head'
      >
      <div class="succssCont">
        您已累计为{{star_name}}贡献了 <span>{{flowers}}</span> 朵鲜花， 在粉丝周贡献榜中排名第 <span>{{order}}</span> 位，感谢您的用心守护！
      </div>
      <div class='formIdView succssShare'>
        <span>邀请好友一起守护</span>
        <button
          open-type='share'
        ></button>
      </div>
    </div>
    <img
      :src="closeIcon"
      alt=""
      class="close"
      @click="close"
    >
  </div>
</template>

<script>
import { setStor, getStor, removeStor, toast } from "@/utils/index.js";
export default {
  data() {
    return {
      closeIcon: require("../../static/images/close.png"),
      successIcon: require("../../static/images/1234.png")
    };
  },
  props: ["isshow","star_name","flowers","order","star_head"],
  methods: {
    close() {
      this.$emit("close");
    }
  },
  mounted() {
    let that = this;
  }
};
</script>

<style lang="scss">
@import "../assets/styles/animate.css";

.pubCover {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  bottom: 0;
  right: 0;
  z-index: 999999;
  .close {
    width: 70rpx;
    height: 70rpx;
    position: absolute;
    bottom: 120rpx;
    left: 50%;
    margin-left: -35rpx;
  }
  .successBox {
     width: 600rpx;
      height: 585rpx;
      background: rgba(255, 255, 255, 1);
      border-radius: 7px;
      position: fixed;
      top: 50%;
      margin-top: -300rpx;
      left: 50%;
      margin-left: -300rpx;
      z-index: 99999;

    .succssTop {
      width: 100%;
      height: 230rpx;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }

    .succssImg {
      height: 180rpx;
      width: 180rpx;
      border-radius: 50%;
      position: absolute;
      top: 126rpx;
      left: 50%;
      margin-left: -90rpx;
    }

    .succssCont {
      font-size: 30rpx;
      line-height: 40rpx;
      padding: 110rpx 60rpx;
      text-align: justify;
    }

    .succssCont span {
      color: rgba(243, 73, 114, 1);
    }

    .succssShare {
      position: absolute;
      left: 50%;
      text-align: center;
      color: #fff;
      margin-left: -150rpx;
      bottom: 28rpx;
      width: 300rpx;
      font-size: 28rpx;
      height: 70rpx;
      line-height: 70rpx;
       background: linear-gradient(
        0deg,
        rgba(97, 6, 234, 1) 0%,
        rgba(236, 109, 255, 1) 100%
      );
      border-radius: 7px;
      box-shadow: 0px 1px 5rpx 0px rgba(252, 17, 90, 0.42);
      button{
         height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0 !important;
        z-index: 99;
        border:0;
      }
    }
  }
}
</style>
