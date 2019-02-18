<template>
  <div class="container">
    <div class="top">
       <div class="left" :class="[actives == 1?'active':'']" @click="checks(1)">星币获取</div>
       <div class="right" :class="[actives == 1 ?'':'active']"  @click="checks(2)">星币消耗</div>
    </div>
    <div class="listBox">
       <div class="list" v-for="(item,index) in list" :key="index">
          <div>{{item.from_source}}({{item.flowers}}星币)</div>
          <div>{{item._time}}</div>
       </div>
    </div>
      <loading :isloading="isLoading" :list="list" :listpage="pages"></loading>

  </div>
</template>

<script>
import loading from "@/components/loading";
import { myFlowersDetail } from "@/utils/api.js";
export default {
  data() {
    return {
      list:[],
      pages:{},
      isLoading:false,
      actives:1
    }
  },
  computed: {
   
  },
  components: {
    loading
  },
  methods: {
    formatTime(timeStamp) {
      var date = new Date();
      date.setTime(timeStamp * 1000);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      return y + '.' + m + '.' + d + ' ' + h + ':' + minute;
    },
    getlist(tyeps,changtype, pageIndex) {
        let that = this;
        myFlowersDetail(tyeps,pageIndex).then(res => {
          if(res.code != "SUCCESS"){
            toast(res.msg)
            return;
          }
          let _list = res.data.lists.map(function(item,index){
              let __time = that.formatTime(item.create_time);
              item._time = __time;
              return item;
          });
          if (changtype == 1) {
            that.list = _list;
            that.pages = res.data.pages;
            that.isLoading = false;
          } else {
            let _nowLists = that.list.concat(_list);
            that.list = _nowLists;
            that.pages = res.data.pages;
            that.isLoading = false;
          }
        });
    },
    checks(e){
      if(this.actives == e) return;
      this.actives = e;
      this.getlist(e,1,1);
    }
  },
  created() {
    this.getlist(1,1,1);
  },
  onReachBottom() {
    let that = this;
    if (this.isLoading || this.pages.current == this.pages.last) return;
    that.isLoading = true;
    that.getlist(that.actives,2,that.pages.next);
  },
}
</script>

<style lang="scss">
.container{
  padding-top: 100rpx;
  .top{
    height: 100rpx;
    line-height:100rpx;
    box-sizing: border-box;
    padding:30rpx 0;
    position:fixed;
    left: 0;
    top: 0;
    z-index: 999;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #e8e8e8;
    background: #fff;
    .left,.right{
      width: 50%;
      text-align: center;
      height: 40rpx;
      line-height: 40rpx;
    }
    .left{
      border-right: 1px solid #e8e8e8;
    }
    .active{
      color: #A292FF;
    }
  }
  .listBox{
    padding: 30rpx;
    .list{
      height: 80rpx;
      line-height: 80rpx;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding:  0 30rpx;
      box-sizing: border-box;
      margin-bottom: 10rpx;
    }
  }
}
</style>
