<template>
    <div>
        <div class="spinner" v-show="isLoading && list.length >= 10">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
        <div class="noMore" v-show="!isLoading && list.length <= 0">暂时没有数据~</div>
        <div class="noMore" v-show="!isLoading && listpage.current == listpage.last">没有更多数据了~</div>
    </div>
</template>

<script>
export default {
  props: ["isloading", "list","listpage"]
};
</script>

<style lang="scss">
@import "../assets/styles/loading.css";
.noMore {
  padding: 20rpx 0;
  color: #000;
  font-size: 28rpx;
}
</style>
