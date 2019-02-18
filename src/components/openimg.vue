<template>
  <div class="pubCover" v-show="isshow">
    <div class="openBox" @click="goOther">
        <img :src="imgsrc" alt="">
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
    }
  },
  props: ["isshow","imgsrc","imghref"],
  methods: {
    close(){
      this.$emit("close");
    },
    goOther(){
        wx.navigateTo({
        url: `${this.imghref}`
      });
    }
  },
  mounted() {
     let that = this;
     setTimeout(() => {
       that.close()
     }, 5000);
  },
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
  .close{
    width: 70rpx;
    height:70rpx;
    position: absolute;
    bottom: 80rpx;
    left: 50%;
    margin-left: -35rpx;;
  }
  .openBox {
    width: 600rpx;
    height: 800rpx;
    position: fixed;
    z-index: 9999999;
    top: 50%;
    left: 50%;
    margin-top: -460rpx;
    margin-left: -300rpx;
    background: rgba(255, 255, 255, 1);
    border-radius: 10rpx;
    overflow: hidden;
    img{
      height: 100%;
      width: 100%;
    }
  }
}
</style>
