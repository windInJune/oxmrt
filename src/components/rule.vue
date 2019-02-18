<template>
  <div class="pubCover" v-show="isshow">
    <div class="openBox">
       <wxParse :content="content" />
    </div>
    <img :src="closeIcon" alt="" class="close" @click="close">
  </div>
</template>

<script>
import { setStor, getStor, removeStor, toast } from "@/utils/index.js";
import wxParse from 'mpvue-wxparse'

export default {
  data(){
    return {
      closeIcon: require("../../static/images/close.png"),
    }
  },
  props: ["isshow","content"],
  methods: {
    close(){
      this.$emit("close");
    }
  },
   components: {
    wxParse
  },
  mounted() {
     let that = this;
     console.log()
  },
};
</script>

<style lang="scss">
@import url("~mpvue-wxparse/src/wxParse.css");
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
    overflow-x: hidden;
    overflow-y: scroll;
    box-sizing: border-box;
    padding: 30rpx;
    text-align: justify;
  }
}
</style>
