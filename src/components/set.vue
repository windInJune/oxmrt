<template>
  <div>
   <div class='pubCover' v-show='setCover' @tap='onClose'></div>
    <div class='callSuccss' v-show='setAlert'>
    <div class="succssCont">
        {{alertMsg}}
    </div>
        <div class='sureBtn' @click='onSet'>
        打开设置
        </div>
        <div class='noSure' @click='onClose'>下次再说</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['alertMsg','setCover','setAlert'],
  methods:{
    onSet() {
      this.$emit('set')
    },
    onClose(){
      this.$emit('setclose')
    }
  }
}
</script>

<style>
.callSuccss{
  width:500rpx;
  height:360rpx;
  background:rgba(255,255,255,1);
  border-radius:10rpx;
  position: fixed;
  top: 50%;
  margin-top: -180rpx;
  left: 50%;
  margin-left: -250rpx;
  z-index: 9999999999;
}
.pubCover{
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  bottom: 0;
  right: 0;
  z-index: 999;
}

.callSuccss .succssCont{
  font-size: 30rpx;
  padding: 0rpx 60rpx;
  height: 150rpx;
  line-height: 60rpx;
  text-align: center;
  box-sizing: border-box;
  padding-top: 60rpx;
}

.sureBtn{
  width:200rpx;
  height:70rpx;
  line-height: 70rpx;
  background:linear-gradient(-18deg,rgba(230,29,92,1) 0%,rgba(236,59,139,1) 100%);
  border-radius:10rpx;
  color: #fff;
  margin: 50rpx auto 0;
  text-align: center;
  font-size: 28rpx;
  box-shadow:0px 1px 5px 0px rgba(252,17,90,0.42);
}
.noSure{
  font-size:30rpx;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(102,102,102,1);
  margin-top: 30rpx;
  text-align: center;
}
</style>
