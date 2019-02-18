<template>
  <div class="container">
     <web-view :src="srcUrl"></web-view>
  </div>
</template>
<script>
import { setStor, getStor, removeStor, toast } from "@/utils/index.js";
export default {
  data() {
    return {
        srcUrl:''
    };
  },
  methods: {
  
  },
  mounted() {
    this.srcUrl = getStor('webviewurl');

  },
  onShareAppMessage(res) {
     return {
        title: `偶像名人堂星币商城即将开启，快来攒星币等兑换好礼吧！`,
        path: `/pages/home/main`
      }
  }
};
</script>
<style  lang="scss">
@import "../../assets/styles/mixins.scss";

</style>
