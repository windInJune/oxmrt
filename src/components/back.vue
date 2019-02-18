<template>
    <div class="backBox" @click="goHome" v-show="show">
       <img :src="imgSrc" alt="">
    </div>
</template>

<script>
export default {
  data() {
      return {
          imgSrc:require("../../static/images/homea.png"),
      }
  },
  methods: {
      goHome(){
         wx.switchTab({
            url: `/pages/home/main`
        });
      }
  },
  props: ["show"]
};
</script>

<style lang="scss">
@import "../assets/styles/loading.css";
.backBox{
    width: 80rpx;
    height: 80rpx;
    position:fixed;
    right: 30rpx;
    bottom: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.7);
    border-radius: 50%;
    z-index: 9999;
    box-shadow: 2px 2px 2px #A292FF;
    img{
        width: 60rpx;
        height: 60rpx;
    }
}
</style>
