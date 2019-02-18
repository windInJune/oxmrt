<template>
  <div class="pubCover" v-show="isshow">
    <div class="kefuBox">
        <img class="kefuBg" :src="kefubgIcon" alt="">
        <div class="divP">苹果系统可以通过官方公众号充值入口进行星币充值~</div>
        <div class="kefuBtn animated infinite pulse">
            <img  :src="kefubtnIcon" alt="">
            <button plain open-type="contact"></button>
        </div>
    </div>
    <img :src="closeIcon" alt="" class="close" @click="close">
  </div>
</template>

<script>
import { setStor, getStor, removeStor, toast } from "@/utils/index.js";
export default {
  data(){
    return {
      closeIcon: require("../../static/images/close.png"),
      kefubgIcon: require("../../static/images/kefubg.png"),
      kefubtnIcon: require("../../static/images/kefubtn.png")
    }
  },
  props: ["isshow"],
  methods: {
    close(){
      this.$emit("close");
    }
  },
  mounted() {
     let that = this;
     console.log()
  },
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
  .close{
    width: 70rpx;
    height:70rpx;
    position: absolute;
    bottom: 120rpx;
    left: 50%;
    margin-left: -35rpx;;
  }
  .kefuBox {
    width: 540rpx;
    height: 624rpx;
    position: fixed;
    z-index: 9999999;
    top: 50%;
    left: 50%;
    margin-top: -312rpx;
    margin-left: -270rpx;
    background: none;
    border-radius: 10rpx;
    overflow: hidden;
    box-sizing: border-box;
    padding: 30rpx;
    text-align: justify;
    .kefuBg{
      height: 100%;
      width: 100%;
    }
    .divP{
      height: 80rpx;
      line-height: 40rpx;
      width: 100%;
      position: absolute;
      left: 0;
      top:300rpx;
      box-sizing: border-box;
      padding: 0 80rpx;
    }
    .kefuBtn{
      height: 72rpx;
      display: block;
      width: 329rpx;
      position:absolute;
      bottom: 100rpx;
      left: 50%;
      margin-left: -165rpx;
      img{
        height: 100%;
       width: 100%;
      }
      button{
        width: 100%;
        height: 100%;
        position: absolute;
        opacity: 0;
        top: 0;
        left: 0;
      }
    }
  }
}
</style>
