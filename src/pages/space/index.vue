<template>
  <div class="container">
    <div class="topBox">
      <div
        class="designation"
        v-show="starHitWeekInfo.order <=3 && starHitWeekInfo.order > 0"
        v-if="weekCheck"
      >
        <img
          :src="searchSrc"
          alt=""
        >
        <div
          class="name"
          v-if="starHitWeekInfo.order == 1"
        >NO.1 天下无双</div>
        <div
          class="name"
          v-else-if="starHitWeekInfo.order == 2"
        >NO.2 谁与争锋</div>
        <div
          class="name"
          v-else-if="starHitWeekInfo.order == 3"
        >NO.3 气势如虹</div>
      </div>
      <div
        class="designation"
        v-show="starHitMonthInfo.order <=3 && starHitMonthInfo.order > 0"
        v-else
      >
        <img
          :src="searchSrc"
          alt=""
        >
        <div
          class="name"
          v-if="starHitMonthInfo.order == 1"
        >NO.1 天下无双</div>
        <div
          class="name"
          v-else-if="starHitMonthInfo.order == 2"
        >NO.2 谁与争锋</div>
        <div
          class="name"
          v-else-if="starHitMonthInfo.order == 3"
        >NO.3 气势如虹</div>
      </div>
      <div class="starBanner">
        <img
          mode="aspectFill"
          :src="starData.star_banner"
          alt=""
        >
        <div class="bottomDiv">
          <div class="starBox">
            <div class="headBox">
              <img
                class="starImg"
                src="http://image-1257827636.cos.ap-shanghai.myqcloud.com/no20181022152854.gif"
                alt=""
              >
              <img
                mode="aspectFill"
                class="starIcons"
                :src="starData.star_avatar"
                alt=""
              >
          <img :src="firstIcon" v-if="weekCheck && starHitWeekInfo.order == 1" alt="" class="firstIcon">
          <img :src="twoIcon" v-else-if="weekCheck && starHitWeekInfo.order == 2" alt="" class="firstIcon">
          <img :src="threeIcon" v-else-if="weekCheck && starHitWeekInfo.order == 3" alt="" class="firstIcon">
          <img :src="firstIcon" v-if="!weekCheck && starHitMonthInfo.order == 1" alt="" class="firstIcon">
          <img :src="twoIcon" v-else-if="!weekCheck && starHitMonthInfo.order == 2" alt="" class="firstIcon">
          <img :src="threeIcon" v-else-if="!weekCheck && starHitMonthInfo.order == 3" alt="" class="firstIcon">
            </div>
            <div class="starName">{{starData.star_name}}</div>
            <div class="getXb">
              <img
                class="xbIcon"
                :src="xbSrc"
                alt=""
              >
              <span>{{weekCheck?starHitWeekInfo.hits:starHitMonthInfo.hits}}</span>
            </div>
            <div class="noNum">NO.{{weekCheck?starHitWeekInfo.order:starHitMonthInfo.order}}</div>
          </div>
          <div class="fansBox">
            <div class="bestFans">
              <span>最佳星粉:</span>
            </div>
            <img
              class="fansImg"
              :src="gxList[0]?gxList[0].avatar:''"
              alt=""
            >
            <div class="intimacy">
              <block
                v-for="(item,index) in (gxList[0]?gxList[0].star:[])"
                :key="index"
              >
                <img
                  class="loveicon"
                  :src="loveIcon"
                  alt=""
                >
              </block>
              <span>亲密度：</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="switchBox">
      <div class="switch" style="width:40%">
        <span>{{weekCheck?'明星周排行':'明星月排行'}}</span>
        <switch
          @change="weekChange"
          checked
        />
      </div>
      <div class="switch">
        <span>打榜提醒</span>
        <switch checked />
      </div>
      <div class="rule" @click="ruleShow = true">
        <span>打榜规则</span>
        <img
          :src="ruleIcon"
          alt=""
        >
      </div>
    </div>
    <div class="btnBox">
      <img @click="sendBoxShow = true"
        :src="callIcon"
        alt=""
      >
      <img
        :src="cardIcon"
        alt=""
        @click="drawCard"
      >
      <button open-type="share" plain>
        <img
          :src="shareIcon"
          alt=""
        >
      </button>

    </div>
    <div class="bestFans">
      <div class="bestFansBox" v-if="listType == 1">
        <div class="fansWrap">
          <div class="headBox">
            <img
              :src="gxList[1]?gxList[1].avatar:''"
              alt=""
            >
            <p class="cname">高山流水</p>
          </div>
          <div class="uName">{{gxList[1]?gxList[1].nickName:'???'}}</div>
        </div>
        <div class="fansWrap">
          <div class="headBox firstFans">
            <img
               :src="gxList[0]?gxList[0].avatar:''"
              alt=""
            >
            <p class="cname b_pink">红尘知己</p>
          </div>
          <div class="uName">{{gxList[0]?gxList[0].nickName:'???'}}</div>
        </div>
        <div class="fansWrap">
          <div class="headBox">
            <img
              :src="gxList[2]?gxList[2].avatar:''"
              alt=""
            >
            <p class="cname b_violet">铁杆真爱</p>
          </div>
          <div class="uName">{{gxList[2]?gxList[2].nickName:'???'}}</div>
        </div>
      </div>
      <div class="bestFansBox" v-if="listType == 2">
        <div class="fansWrap">
          <div class="headBox">
            <img
               :src="inviteList[1]?inviteList[1].avatar:''"
              alt=""
            >
            <p class="cname">左护法</p>
          </div>
          <div class="uName">{{inviteList[1]?inviteList[1].nickName:'???'}}</div>
        </div>
        <div class="fansWrap">
          <div class="headBox firstFans">
            <img
              :src="inviteList[0]?inviteList[0].avatar:''"
              alt=""
            >
            <p class="cname b_pink">大护法</p>
          </div>
          <div class="uName">{{inviteList[0]?inviteList[0].nickName:'???'}}</div>
        </div>
        <div class="fansWrap">
          <div class="headBox">
            <img
              :src="inviteList[2]?inviteList[2].avatar:''"
              alt=""
            >
            <p class="cname b_violet">右护法</p>
          </div>
          <div class="uName">{{inviteList[2]?inviteList[2].nickName:'???'}}</div>
        </div>
      </div>
    </div>
    <div class="say">本次粉丝贡献榜按周贡献排序</div>
    <div class="navBox">
      <div class="navCheck">
        <div
          :class="[listType == 1?'nav week active':'nav week']"
          @click="listType = 1"
        >贡献</div>
        <div
          :class="[listType == 2?'nav month active':'nav month']"
          @click="listType = 2"
        >邀请</div>
        <div
          :class="[listType == 3?'nav common active':'nav common']"
          @click="commentFn"
        >评论</div>
      </div>
    </div>
    <div class="bottomBox">
      <div
        class="listBox"
        v-show="listType == 1"
      >
        <div class="list" v-for="(item,index) in gxList" :key="index">
          <div class="rank">{{index + 1}}</div>
          <div class="headBox">
            <img
              :src="item.avatar"
              alt=""
            >
          </div>
          <div class="starName">{{item.nickName}}</div>
          <div class="getXb">
            <span style="margin-right:10rpx;">贡献星币</span>
            <img
              class="xbIcon"
              :src="xbSrc"
              alt=""
            >
            <span>{{item.hits}}</span>
          </div>
          <div class="bestFans">
            <div class="test">亲密度：</div>
            <div class="bestFansIcon">
              <block
                v-for="(item,key) in item.star"
                :key="key"
              >
                <img
                  class="loveicon"
                  :src="loveIcon"
                  alt=""
                >
              </block>
            </div>
          </div>
          <div class="guardian">
            <div class="test">点赞人数：0人</div>
          </div>
        </div>
        <div>
          <div class="spinner" v-show="gxLoading && gxList.length >= 10">
              <div class="bounce1"></div>
              <div class="bounce2"></div>
              <div class="bounce3"></div>
          </div>
          <div class="noMore" v-show="!gxLoading && gxList.length <= 0">暂时没有数据~</div>
          <div class="noMore" v-show="!gxLoading && gxPage.current == gxPage.last">没有更多数据了~</div>
       </div>
        <!-- <loading :isloading="gxLoading" :list="gxList" :listpage="gxPage"></loading> -->
      </div>
      <div
        class="listBox"
        v-show="listType == 2"
      >
        <div class="list" v-for="(item,key) in inviteList" :key="key">
          <div class="rank">{{key + 1}}</div>
          <div class="headBox">
            <img
              :src="item.avatar"
              alt=""
            >
          </div>
          <div
            class="starName"
            style="top:80rpx"
          >{{item.nickName}}</div>
          <div
            class="guardian"
            style="bottom:60rpx;"
          >
            <div class="test">邀请人数：<span style="color:#E63737">{{item.invite_num}}</span>人</div>
          </div>
        </div>
        <div>
          <div class="spinner" v-show="inviteLoading && inviteList.length >= 10">
              <div class="bounce1"></div>
              <div class="bounce2"></div>
              <div class="bounce3"></div>
          </div>
          <div class="noMore" v-show="!invitePage && inviteList.length <= 0">暂时没有数据~</div>
          <div class="noMore" v-show="!invitePage && invitePage.current == invitePage.last">没有更多数据了~</div>
       </div>
        <!-- <loading :isloading="inviteLoading" :list="inviteList" :listpage="invitePage"></loading> -->
      </div>
      <div
        class="listBox"
        v-show="listType == 3"
      >
        <div class="list">
          <div class="rank">1</div>
          <div
            class="headBox"
            style="top:30rpx"
          >
            <img
              :src="xbSrc"
              alt=""
            >
          </div>
          <div class="inviteName">我的爱豆</div>
          <div class="comment">
            如果说，你是海上的烟火，我是浪花的泡沫，那一刻，你的光照亮了我
          </div>
        </div>
      </div>
    </div>
    <div class='canvasView'>
      <canvas
        class='canvasBox'
        canvas-id="myCanvas"
      />
    </div>
    <div class="xbList" v-show="sendBoxShow">
      <div class="myXb"><div>我的星币：<span class="red big">{{myFlowers}}</span></div> <div class="red" @click="goPay" v-show="isAndroid">更多星币？</div> </div>
      <div class='ruleContBox'>
        <div  class='choseBox' :class="[sendNum == item.flower_num?'active':'']" v-for="(item,index) in ranklist" :key="index" @click="sendNum = item.flower_num;sendInputValue = ''">
          <img  :src='xbSrc'>
          <span>{{item.flower_num}}</span>
        </div>
      </div>
      <div class='sureBox'>
        <input   placeholder='其他数量' :value="sendInputValue" type='number' @blur="sendNumBlur" @focus="sendNumFocus" @input="sendNumChange">
        <div class='iKonw' @click="sendFn">确认</div>
      </div>
      <div class="close" @click="sendBoxShow = false">
        <img :src="closeSrc" alt="">
      </div>
    </div>
    <div class="pubCover" v-show="sendBoxShow"></div>
    <login
      :authorization="login"
      v-on:login="getUserInfo"
    ></login>
    <back :show="showback"></back>
    <kefu :isshow="more_xb" v-on:close="closeOpen"></kefu>
    <success :isshow="successAlert" :star_name="starData.star_name" :star_head="starData.star_avatar" :flowers="total_sendflowers"  :order="total_order" v-on:close="closeOpen"></success>
    <rule :isshow="ruleShow" :content="rulecontents" v-on:close="closeOpen"></rule>
    <set
      :alertMsg="alertMsg"
      :setCover="setCover"
      :setAlert="setAlert"
      v-on:set="set"
      v-on:setclose="setClose"
    ></set>
  </div>
</template>

<script>
import login from "@/components/login";
import rule from "@/components/rule";
import kefu from "@/components/kefu";
import back from "@/components/back";
import set from "@/components/set";
import success from "@/components/success";
import loading from "@/components/loading";

import {rules,inviteCallBack,fansInviteRank,fansHitRank,space,rankhit,sendFlowers } from "@/utils/api.js";
import { setStor, getStor, removeStor, toast,getSystemInfo } from "@/utils/index.js";
export default {
  data() {
    return {
      firstIcon: require("../../../static/images/no1.png"),
      twoIcon: require("../../../static/images/no2.png"),
      xbSrc: require("../../../static/images/xb.png"),
      threeIcon: require("../../../static/images/no3.png"),
      loveIcon: require("../../../static/images/love.png"),
      ruleIcon: require("../../../static/images/rule.png"),
      callIcon: require("../../../static/images/call.png"),
      cardIcon: require("../../../static/images/card.png"),
      shareIcon: require("../../../static/images/share.png"),
      searchSrc: require("../../../static/images/top.png"),
      closeSrc: require("../../../static/images/close.png"),
      login: false,
      alertMsg: "请打开设置检查是否同意海报保存到本地",
      setCover: false,
      setAlert: false,
      windowWidth: 375,
      windowHeight: 667,
      bannerCanvas: "",
      canvaspath: "",
      listType: 1,
      starData: {},
      weekCheck: true,
      starHitWeekInfo: {},
      starHitMonthInfo: {},
      sendBoxShow:false,
      myFlowers:'?',
      ranklist:[],
      sendInputValue:"",
      sendNum:0,
      inviteList:[],
      invitePage:{},
      inviteLoading:false,
      gxList:[{}],
      gxPage:{},
      gxLoading:false,
      showback:false,
      ruleShow:false,
      isAndroid:true,
      starBaner:'',
      starHead:'',
      rulecontents:'<h3 class="ql-align-center"><strong>打榜规则</strong></h3><p>使用星币，给心爱的偶像打榜，偶像星币越多，排名越靠前。</p ><p>打榜星币前三名，会获得尊贵称号和专属展示。</p ><p>所有参与打榜的粉丝会获得与偶像的亲密度。打榜亲密度即为1心，打榜星币超过2000亲密度为2心，打榜星币超过10000亲密度为3心，打榜星币超过50000亲密度为4心，打榜星币超过100000亲密度为5心。亲密度最高为5心。</p >',
      more_xb:false,
      successAlert:false,
      total_sendflowers:'',
      total_order:''
    };
  },
  components: {
    login,
    set,
    back,
    rule,
    kefu,
    success,
    loading
  },
  methods: {
    closeOpen(){
      this.ruleShow = false;
      this.more_xb = false;
      this.successAlert = false;
    },
    goPay(){
      wx.navigateTo({
        url: `/pages/logs/main?starid=${this.$root.$mp.query.starid}`
      });
    },
    commentFn(){
      toast('评论功能暂未开启，敬请期待O(∩_∩)O~')
      return;
    },
    weekChange(e) {
      this.weekCheck = e.mp.detail.value;
    },
    getUserInfo(e) {
      let that = this;
      that.login = false;
      rankhit().then(res => {
        that.myFlowers = res.data.myFlowers;
        that.ranklist = res.data.lists;
        that.sendNum = res.data.lists[0].flower_num
      })
    },
    drawCard() {
      let that = this;
      wx.showLoading({
        title: "海报绘制中..."
      });
      setTimeout(function() {
        that.saveCanvas(true);
      }, 2000);
    },
    saveImageToPhotosAlbum(path) {
      let that = this;
      wx.saveImageToPhotosAlbum({
        filePath: path,
        success(res) {
          wx.hideLoading();
          that.setClose();
          wx.showModal({
            title: "温馨提醒",
            content: "海报为您保存到您的相册，赶快去发朋友圈吧～",
            success: function(res) {}
          });
          wx.previewImage({
            current: path,
            urls: [path]
          });
        },
        fail() {
          wx.hideLoading();
          that.openSetting(path);
        }
      });
    },
    openSetting: function(path) {
      this.setCover = true;
      this.setAlert = true;
      this.canvaspath = path;
    },
    set() {
      let that = this;
      wx.openSetting({
        success: function(data) {
          if (data.authSetting["scope.writePhotosAlbum"]) {
            wx.showLoading({
              title: "海报绘制中..."
            });
            setTimeout(function() {
              that.saveImageToPhotosAlbum(that.canvaspath);
            }, 1000);
          }
        }
      });
    },
    setClose() {
      this.setCover = false;
      this.setAlert = false;
    },
    saveCanvas(isShow = false) {
      let that = this;
      // that.fillRectFn(that.data.windowWidth, that.data.windowHeight)
      that.drawBg(
        require("../../../static/images/bg.png"),
        0,
        0,
        that.windowWidth,
        that.windowHeight
      );
      console.log(that.starBaner)

      that.drawBg(
        that.starBaner,
        28,
        63,
        326,
        246
      );
      that.drawText(`${that.starData.star_name}`, that.windowWidth, 30, 360, 19);
      // that.drawTextTwo('排名：', that.data.windowWidth, 130, 400, 18);
      if(that.weekCheck){
        that.drawText(`本月排名：${that.starHitMonthInfo.order}`, that.windowWidth, 30, 400, 20, "#FE5012");
        // that.drawTextTwo('影响：', that.data.windowWidth, 130, 440, 18);
        that.drawText(`本月人气：${that.starHitMonthInfo.hits}`, that.windowWidth, 203, 435, 14);
      }else{
        that.drawText(`本周排名：${that.starHitWeekInfo.order}`, that.windowWidth, 30, 400, 20, "#FE5012");
        // that.drawTextTwo('影响：', that.data.windowWidth, 130, 440, 18);
        that.drawText(`本周人气：${that.starHitWeekInfo.hits}`, that.windowWidth, 203, 435, 14);
      }

      // that.drawBg('../../images/xxx.png', 60, 465, 318, 78);
      that.drawBg(
        require("../../../static/images/1.jpeg"),
        270,
        500,
        75,
        75
      );
      that.drawHead(
        40,
        44,
        498,
        that.starHead        
      );
      setTimeout(function() {
        wx.canvasToTempFilePath({
          destWidth: 750,
          destHeight: 1334,
          canvasId: "myCanvas",
          success: function(res) {
            that.bannerCanvas = res.tempFilePath;
            if (isShow) {
              that.saveImageToPhotosAlbum(res.tempFilePath);
            }
          }
        });
      }, 2000);
    },
    getImageInfoBanner(url) {
      // 图片缓存本地的方法
      let that = this;
      if (typeof url == "string") {
        wx.getImageInfo({
          //  小程序获取图片信息API
          src: url,
          success: function(res) {
            that.starBaner = res.path;
          },
          fail(err) {
            console.log(err);
          }
        });
      }
    },
    getImageInfoAvatar(url) {
      // 图片缓存本地的方法
      let that = this;
      if (typeof url == "string") {
        wx.getImageInfo({
          //  小程序获取图片信息API
          src: url,
          success: function(res) {
            that.starHead = res.path;
          },
          fail(err) {
            console.log(err);
          }
        });
      }
    },
    textByteLength(text, num) {
      // text为传入的文本  num为单行显示的字节长度
      let strLength = 0; // text byte length
      let rows = 1;
      let str = 0;
      let arr = [];
      for (let j = 0; j < text.length; j++) {
        if (text.charCodeAt(j) > 255) {
          strLength += 2;
          if (strLength > rows * num) {
            strLength++;
            if (rows % 2 == 0) {
              arr.push(text.slice(str, j + 1));
            } else {
              arr.push(text.slice(str, j));
            }
            str = j;
            rows++;
          }
        } else {
          strLength++;
          if (strLength > rows * num) {
            arr.push(text.slice(str, j));
            str = j;
            rows++;
          }
        }
      }
      arr.push(text.slice(str, text.length));
      return [strLength, arr, rows]; //  [处理文字的总字节长度，每行显示内容的数组，行数]
    },
    //文字绘制的方法 width:文本框宽度  left:左边距 top:上边距
    //第一个根据文字宽度跟屏幕宽度左右居中
    //第二个不换行，自定义位置
    //第三个设定宽度，超出自动换行
    drawText(text = "", width, left, top, fontSize = 20, color = "black") {
      let ctx = this.ctx;
      let FONTSIZE = fontSize;
      ctx.setFillStyle(color);
      ctx.setFontSize(fontSize);
      let metrics = ctx.measureText("菁");
      let CONTENT_ROW_LENGTH =
        Math.trunc((this.windowWidth - left) / metrics.width) * 2; // 正文 单行显示字符长度
      let [contentLeng, contentArray, contentRows] = this.textByteLength(
        text,
        CONTENT_ROW_LENGTH
      );
      ctx.setTextAlign("left");
      ctx.fillText(
        text,
        this.windowWidth / 2 - contentLeng / 2 * metrics.width / 2,
        top
      ); // lfet/2左边距  top上边距
      ctx.draw(true);
    },
    drawTextTwo(text = "", width, left, top, fontSize = 20, color = "black") {
      let ctx = this.ctx;
      let FONTSIZE = fontSize;
      ctx.setFillStyle(color);
      ctx.setFontSize(fontSize);
      let metrics = ctx.measureText("菁");
      let CONTENT_ROW_LENGTH =
        Math.trunc((this.windowWidth - left) / metrics.width) * 2; // 正文 单行显示字符长度
      ctx.setTextAlign("left");
      ctx.fillText(text, left, top); // lfet/2左边距  top上边距
      ctx.draw(true);
    },
    drawTextThree(text = "", width, left, top, fontSize = 20, color = "black") {
      let ctx = this.ctx;
      let FONTSIZE = fontSize;
      ctx.setFillStyle(color);
      ctx.fillStyle = color;
      ctx.font = `normal normal ${FONTSIZE}px 微软雅黑`;
      ctx.setFontSize(fontSize);
      let metrics = ctx.measureText("菁");
      let CONTENT_ROW_LENGTH =
        Math.trunc((this.windowWidth - left) / metrics.width) * 2 - 4; // 正文 单行显示字符长度
      let [contentLeng, contentArray, contentRows] = this.textByteLength(
        text,
        CONTENT_ROW_LENGTH
      );
      ctx.setTextAlign("left");
      let contentHh = FONTSIZE * 1.5; //每行的高度
      for (let m = 0; m < contentArray.length; m++) {
        ctx.fillText(contentArray[m], left - 10, top + contentHh * m); // lfet/2左边距  top上边距
      }
      ctx.draw(true);
    },
    //绘制头像 r半径 cx左边距 cy上边距 src头像地址
    drawHead(r, cx, cy, src) {
      let ctx = this.ctx;
      let d = r * 2;
      ctx.arc(cx + r, cy + r, r, 0, 2 * Math.PI);
      ctx.setFillStyle("white");
      ctx.fill();
      ctx.clip();
      ctx.drawImage(src, cx, cy, d, d);
      ctx.draw(true);
    },
    //绘制背景
    drawBg(src, left, top, WIDTH, HEIGHT) {
      if (!src) return;
      let ctx = this.ctx;
      ctx.drawImage(src, left, top, WIDTH, HEIGHT);
      ctx.draw(true);
    },
    //填充底色
    fillRectFn(WIDTH, HEIGHT) {
      let ctx = this.ctx;
      const grd = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
      grd.addColorStop(0, "#ec3b8b");
      grd.addColorStop(1, "#ff5f4a");
      ctx.setFillStyle(grd);
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.draw(true);
    },
    sendNumBlur(){
    },
    sendNumFocus(){
    },
    sendNumChange(e){
      this.sendNum = e.mp.detail.value;
      this.sendInputValue = e.mp.detail.value;
    },
    //赠送
    sendFn(){
      let that = this;
      wx.showModal({
        title: '温馨提示',
        content: `确定给偶像${that.starData.star_name}支持${that.sendNum}个星币吗？`,
        success(res) {
          if (res.confirm) {
            if( Number(that.sendNum) > Number(that.myFlowers)){
              that.more_xb = true;
              that.sendBoxShow = false;
              return;
            }
            sendFlowers(that.$root.$mp.query.starid,that.sendNum).then(res => {
              if(res.code = "SUCEESS" ){
                that.loadData()
                that.myFlowers = Number(that.myFlowers) - Number(that.sendNum);
                // toast(`感谢您支持${that.starData.star_name}~`)
                that.successAlert = true;
                that.sendBoxShow = false;
                that.sendInputValue = "";

                that.total_sendflowers = res.data.myRankInfo.hits;
                that.total_order = res.data.myRankInfo.order;
              }
            })
          }
        }
      })
    },
    getfansInviteRank(changtype,pageIndex){
      let that = this;
      fansInviteRank(this.$root.$mp.query.starid,pageIndex).then(res => {
        if(res.code != "SUCCESS") return;
        let _list = res.data.lists;
        if (changtype == 1) {
          that.inviteList = res.data.lists;
          that.invitePage = res.data.pages;
          that.inviteLoading = false;
        } else {
          let _nowLists = that.inviteList.concat(_list);
          that.inviteList = _nowLists;
          that.invitePage = res.data.pages;
          that.inviteLoading = false;
        }
      })
    },
    getfansHitRank(changtype,pageIndex){
      let that = this;
      fansHitRank(this.$root.$mp.query.starid,pageIndex).then(res => {
        if(res.code != "SUCCESS") return;
        let _list = res.data.lists.map(function(item,index){
          if(item.hits){
            if(Number(item.hits) < 2000 ){
              item.star = [1]
            }else if(Number(item.hits) >= 2000 && Number(item.hits) < 10000){
              item.star = [1,2]
            }else if(Number(item.hits) >= 10000 && Number(item.hits) < 50000){
              item.star = [1,2,3]
            }else if(Number(item.hits) >= 50000 && Number(item.hits) < 100000){
              item.star = [1,2,3,4]
            }else if(Number(item.hits) > 100000){
              item.star = [1,2,3,4,5]
            }
            if(Number(item.hits) >= 10000){
              item.hits = (Number(item.hits)/10000).toFixed(2) + '万'
            }

          }else{
            item.star = [];
          }
           return item;
        });
        if (changtype == 1) {
          that.gxList = res.data.lists;
          that.gxPage = res.data.pages;
          that.gxLoading = false;
        } else {
          let _nowLists = that.gxList.concat(_list);
          that.gxList = _nowLists;
          that.gxPage = res.data.pages;
          that.gxLoading = false;
        }
      })
    },
    loadData(){
        let that = this;
        space(that.$root.$mp.query.starid).then(res => {
          that.starData = res.data;
          if(Number(res.data.starHitWeekInfo.hits) >= 10000 ){
              res.data.starHitWeekInfo.hits = (Number(res.data.starHitWeekInfo.hits)/10000).toFixed(2) + '万'
          }
          if(Number(res.data.starHitMonthInfo.hits) >= 10000 ){
              res.data.starHitMonthInfo.hits = (Number(res.data.starHitMonthInfo.hits)/10000).toFixed(2) + '万'
          }
          that.starHitWeekInfo = res.data.starHitWeekInfo;
          that.starHitMonthInfo = res.data.starHitMonthInfo;
          that.getImageInfoBanner(res.data.star_banner[0]);
          that.getImageInfoAvatar(res.data.star_avatar)
        });
        that.getfansInviteRank(1,1);
        that.getfansHitRank(1,1);
        // rules().then(res => {
        //   that.rulecontents = res.data.rule_text
        // })
    },
    loadmore() {
      let that = this;
      if(that.listType == 1){
        if (that.gxLoading || that.gxPage.current == that.gxPage.last) {
          return;
        }
        that.gxLoading = true;
        that.getfansHitRank(2,that.gxPage.next);
      }else if(that.listType == 2){
        if (that.inviteLoading || that.invitePage.current == that.invitePage.last) {
          return;
        }
        that.inviteLoading = true;
        that.getfansInviteRank(2,that.invitePage.next);
      }
    }
  },
  mounted(){
    let that = this;
    that.sendBoxShow = false;
    that.successAlert = false,
    that.ctx = wx.createCanvasContext("myCanvas"); 
    let _unionid = getStor("sessionid");
    if (!_unionid) {
      that.login = true;
      wx.login({
        success(res) {
          setStor("code", res.code);
        }
      });
    }else{
      rankhit().then(res => {
        that.myFlowers = res.data.myFlowers;
        that.ranklist = res.data.lists;
        that.sendNum = res.data.lists[0].flower_num
      })
    }
    that.loadData()
    if(that.$root.$mp.query.shareid){
      inviteCallBack(that.$root.$mp.query.starid,that.$root.$mp.query.shareid);
      that.showback = true;
    }else{
      that.showback = false;
    }
    wx.getSystemInfo({
    success:function(res){
      if(res.system.indexOf('iOS') > -1) that.isAndroid = false;
    }
  })
  },
  onReachBottom() {
    this.loadmore();
  },
  onShareAppMessage: function (res) {
      let that = this;
      let sessionid = getStor('sessionid') || null;
      return {
        title: `${that.starData.star_name}现在排名第${that.weekCheck?that.starHitWeekInfo.order:that.starHitMonthInfo.order}，喜欢${that.starData.star_name}，就来为TA助力吧！`,
        // imageUrl: `${that.starData.star_banner}`,
        path: `/pages/space/main?starid=${that.$root.$mp.query.starid}&shareid=${sessionid}`
      }
  },
  onPullDownRefresh(){
    this.loadData()
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 500);
  }
};
</script>

<style  lang="scss">
@import "../../assets/styles/mixins.scss";
.container {
  overflow-x: hidden;
  .wx-switch-input {
    width: 40px !important;
    height: 20px !important;
  }

  .wx-switch-input::before {
    width: 40px !important;
    height: 20px !important;
  }

  .wx-switch-input::after {
    width: 18px !important;
    height: 18px !important;
  }
  .say{
    text-align: left;
    color: #fff;
    margin-top: 40rpx;
    padding: 0 30rpx;
  }
  .topBox {
    background: url("https://image-1257827636.cos.ap-shanghai.myqcloud.com/bannerbg20181022134434.png")
      no-repeat;
    background-size: 100% auto;
    padding: 0 30rpx;
    box-sizing: border-box;
    width: 100%;
    min-height: 352rpx;
    .designation {
      width: 404rpx;
      height: 82rpx;
      position: relative;
      margin: 0 auto;
      .name {
        width: 404rpx;
        height: 82rpx;
        color: #fff;
        text-align: center;
        line-height: 82rpx;
        position: absolute;
        font-size: 38rpx;
        left: 0;
        top: 0;
      }
    }
    .starBanner {
      margin-top: 10rpx;
      width: 100%;
      height: 360rpx;
      position: relative;
      .bottomDiv {
        height: 120rpx;
        width: 100%;
        background: rgba(147, 89, 248, 1);
        box-shadow: 10px 0px 0px rgba(165, 237, 114, 0.35);
        opacity: 0.8;
        display: flex;
        justify-content: space-between;
        position: absolute;
        left: 0;
        bottom: 0;
        .starBox {
          width: 55%;
          color: #fff;
          position: relative;
          .headBox {
            height: 100rpx;
            width: 100rpx;
            position: absolute;
            z-index: 99;
            left: 30rpx;
            top: -30rpx;
            .starImg {
              position: absolute;
              top: -18rpx;
              left: -18rpx;
              height: 134rpx;
              width: 138rpx;
              border-radius: 50%;
            }
            .starIcons {
              border-radius: 50%;
            }
            .firstIcon {
              width: 55rpx;
              height: 54rpx;
              position: absolute;
              left: -20rpx;
              top: -20rpx;
            }
          }
          .starName {
            height: 40rpx;
            line-height: 40rpx;
            text-align: left;
            font-size: 28rpx;
            font-family: PingFang-SC-Bold;
            font-weight: bold;
            position: absolute;
            left: 150rpx;
            top: 20rpx;
            @include overhide();
          }
          .getXb {
            position: absolute;
            left: 150rpx;
            top: 70rpx;
            height: 30rpx;
            display: flex;
            align-items: center;
            font-size: 28rpx;
            .xbIcon {
              width: 30rpx;
              height: 30rpx;
              margin-right: 10rpx;
            }
          }
          .noNum {
            position: absolute;
            right: -20rpx;
            bottom: 20rpx;
            background: rgba(241, 158, 194, 1);
            border-radius: 20rpx;
            font-size: 26rpx;
            padding: 5rpx 20rpx;
            font-family: PingFang-SC-Bold;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
          }
        }
        .fansBox {
          width: 45%;
          position: relative;
          .fansImg {
            height: 76rpx;
            width: 76rpx;
            position: absolute;
            right: 10rpx;
            top: -28rpx;
            border-radius: 50%;
          }
          .bestFans {
            font-size: 22rpx;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            text-align: right;
            padding-right: 100rpx;
            margin-top: 15rpx;
            border-radius: 4rpx;
          }
          .intimacy {
            display: flex;
            align-items: center;
            text-align: right;
            flex-direction: row-reverse;
            height: 90rpx;
            padding-right: 20rpx;
            font-size: 24rpx;
            color: #fff;
            .loveicon {
              width: 22rpx;
              height: 20rpx;
              margin-right: 4rpx;
            }
          }
        }
      }
    }
  }
  .switchBox {
    margin-top: 30rpx;
    display: flex;
    padding: 0 20rpx;
    justify-content: space-between;
    .switch {
      width: 35%;
      height: 40px;
      display: flex;
      align-items: center;
      font-size: 30rpx;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      span {
        margin-right: 20rpx;
      }
    }
    .rule {
      width: 25%;
      height: 40px;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      font-size: 30rpx;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      img {
        height: 28rpx;
        width: 28rpx;
        margin-right: 20rpx;
      }
    }
  }
  .btnBox {
    height: 100rpx;
    padding: 0 10rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      height: 93rpx;
      width: 227rpx;
    }
    button{
      border: 0;
      background: none;
    }
  }
  .bestFans {
    padding: 0 30rpx;
    width: 100%;
    height: auto;
    box-sizing: border-box;
    margin: 30rpx 0 0;
    .bestFansBox {
      height: 340rpx;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 5px 5px 0px rgba(106, 86, 225, 0.42);
      display: flex;
      justify-content: space-between;
      .fansWrap {
        width: 33%;
        .headBox {
          width: 187rpx;
          height: 117rpx;
          margin: 150rpx auto 0;
          position: relative;
          background: url("http://image-1257827636.cos.ap-shanghai.myqcloud.com/%E6%A4%AD%E5%9C%8620%E6%8B%B7%E8%B4%9D%402x20181024164702.png")
            no-repeat;
          background-size: 100% 100%;
          &.firstFans {
            margin: 80rpx auto 0;
          }
          img {
            height: 128rpx;
            width: 128rpx;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            top: -40rpx;
            margin-left: -64rpx;
            border: 4rpx solid #ffa4c7;
            z-index: 99;
          }
          .cname {
            width: 130rpx;
            height: 36rpx;
            background: rgba(66, 195, 225, 1);
            border-radius: 18rpx;
            position: absolute;
            font-size: 24rpx;
            color: #fff;
            line-height: 36rpx;
            bottom: 0;
            left: 50%;
            margin-left: -65rpx;
            z-index: 999;
          }
        }
        .uName {
          height: 30rpx;
          line-height: 30rpx;
          font-size: 26rpx;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          margin: 20rpx auto;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .navBox {
    padding: 0 30rpx;
    margin-top: 30rpx;
    height: 46rpx;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .navCheck {
      display: flex;
      align-items: center;
      .nav {
        height: 46rpx;
        width: 160rpx;
        font-size: 30rpx;
        text-align: center;
        color: #fff;
        line-height: 46rpx;
        position: relative;
        background: url("http://image-1257827636.cos.ap-shanghai.myqcloud.com/120181022141755.png")
          no-repeat;
        background-size: 100% 100%;
      }
      .common {
        &.active::before {
          content: "评论";
          position: absolute;
          top: 0;
          left: 8rpx;
          width: 144rpx;
          height: 60rpx;
          line-height: 46rpx;
          text-align: center;
          color: #fff;
          font-size: 30rpx;
          z-index: 999;
          background: linear-gradient(
            0deg,
            rgba(97, 6, 234, 1) 0%,
            rgba(236, 109, 255, 1) 100%
          );
          box-shadow: 0px 2px 8px 0px rgba(157, 140, 255, 0.68);
          border-bottom-left-radius: 30rpx;
          border-bottom-right-radius: 30rpx;
        }
      }
      .month {
        &.active::before {
          content: "邀请";
          position: absolute;
          top: 0;
          left: 8rpx;
          width: 144rpx;
          height: 60rpx;
          line-height: 46rpx;
          text-align: center;
          color: #fff;
          font-size: 30rpx;
          z-index: 999;
          background: linear-gradient(
            0deg,
            rgba(97, 6, 234, 1) 0%,
            rgba(236, 109, 255, 1) 100%
          );
          box-shadow: 0px 2px 8px 0px rgba(157, 140, 255, 0.68);
          border-bottom-left-radius: 30rpx;
          border-bottom-right-radius: 30rpx;
        }
      }
      .week {
        &.active::before {
          content: "贡献";
          position: absolute;
          top: 0;
          left: 8rpx;
          width: 144rpx;
          height: 60rpx;
          line-height: 46rpx;
          text-align: center;
          color: #fff;
          font-size: 30rpx;
          background: linear-gradient(
            0deg,
            rgba(97, 6, 234, 1) 0%,
            rgba(236, 109, 255, 1) 100%
          );
          box-shadow: 0px 2px 8px 0px rgba(157, 140, 255, 0.68);
          border-bottom-left-radius: 30rpx;
          border-bottom-right-radius: 30rpx;
          z-index: 999;
        }
      }
    }
    .navRight {
      color: #fff;
      font-size: 26rpx;
      border-radius: 14rpx;
      display: flex;
      flex: 1;
      align-items: center;
      flex-direction: row-reverse;
      .downIcon {
        width: 19rpx;
        height: 11rpx;
        margin-left: 5rpx;
      }
    }
  }
  .listBox {
    width: 100%;
    box-sizing: border-box;
    padding: 0 30rpx;
    .list {
      width: 100%;
      height: 180rpx;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 5px 5px 0px rgba(106, 86, 225, 0.42);
      margin-bottom: 10rpx;
      position: relative;
      .rank {
        position: absolute;
        bottom: -40rpx;
        left: -20rpx;
        font-size: 200rpx;
        font-family: Jade2B;
        font-weight: 400;
        color: rgba(157, 140, 255, 1);
        opacity: 0.3;
        transform: rotate(10deg);
        -webkit-transform: rotate(10deg);
        z-index: 9;
      }
      .headBox {
        height: 100rpx;
        width: 100rpx;
        position: absolute;
        z-index: 99;
        border: 3px solid #853eb5;
        left: 50rpx;
        top: 40rpx;
        border-radius: 50%;
        img{
          height: 100%;
          width: 100%;
          border-radius: 50%;
        }
      }
      .starName {
        height: 40rpx;
        line-height: 40rpx;
        text-align: left;
        font-size: 28rpx;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        position: absolute;
        max-width: 260rpx;
        left: 180rpx;
        top: 54rpx;
        @include overhide();
      }
      .inviteName {
        height: 40rpx;
        width: 140rpx;
        line-height: 40rpx;
        text-align: center;
        font-size: 24rpx;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        position: absolute;
        left: 30rpx;
        bottom: 0rpx;
        @include overhide();
      }
      .comment {
        width: 494rpx;
        height: 132rpx;
        background: rgba(243, 241, 255, 1);
        position: absolute;
        right: 10rpx;
        padding: 20rpx;
        box-sizing: border-box;
        top: 24rpx;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        text-align: left;
        line-height: 30rpx;
        font-size: 22rpx;
      }
      .getXb {
        position: absolute;
        left: 180rpx;
        top: 106rpx;
        height: 30rpx;
        display: flex;
        align-items: center;
        font-size: 28rpx;
        .xbIcon {
          width: 30rpx;
          height: 30rpx;
          margin-right: 10rpx;
        }
      }
      .bestFans,
      .guardian {
        width: 256rpx;
        height: 28rpx;
        background: rgba(255, 185, 212, 1);
        border-radius: 14rpx;
        position: absolute;
        right: 20rpx;
      }
      .bestFans {
        top: 20rpx;
        .test {
          position: absolute;
          top: -10rpx;
          left: 20rpx;
          height: 24rpx;
          font-size: 22rpx;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
        .bestFansIcon {
          position: absolute;
          top: -15rpx;
          right: 0rpx;
          height: 32rpx;
          width: 150rpx;
          display: flex;
          align-items: center;
          .loveicon {
            width: 22rpx;
            height: 20rpx;
            margin-right: 4rpx;
          }
        }
      }
      .guardian {
        bottom: 40rpx;
        .test {
          position: absolute;
          top: -10rpx;
          left: 20rpx;
          height: 24rpx;
          font-size: 22rpx;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
  }
  .canvasView {
    height: 667px;
    width: 375px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    transform: translate(-100%, -100%);
  }

  .canvasBox {
    height: 667px;
    width: 375px;
  }
  .xbList {
    height: 545rpx;
    width: 600rpx;
    position: fixed;
    top: 50%;
    margin-top: -290rpx;
    left: 50%;
    margin-left: -300rpx;
    border-radius: 5px;
    z-index: 9999999;
    background: #fff;
    font-size: 24rpx;
    padding: 30rpx;
    box-sizing: border-box;
    text-align: left;
    .close{
      position: absolute;
      bottom: -90rpx;
      left: 50%;
      margin-left: -45rpx;
      height: 70rpx;
      width: 70rpx;
      img{
        height: 100%;
        width: 100%;
      }
    }
    .sureBox {
      height: 70rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30rpx;
        input {
          width: 340rpx;
          height: 70rpx;
          border: 1px solid #A292FF;
          border-radius: 10rpx;
          text-align: center;
        }
        .iKonw {
          text-align: center;
          color: #fff;
          font-size: 28rpx;
          width: 150rpx;
          height: 70rpx;
          line-height: 70rpx;
          background: #A292FF;
          border-radius: 10rpx;
        }
    }
    .ruleContBox {
      overflow-y: auto;
      height: 300rpx;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      font-size: 24rpx;
      margin-top: 10rpx;
      .choseBox {
        box-sizing: border-box;
        padding-left: 60rpx;
        width: 150rpx;
        height: 70rpx;
        border-radius: 10rpx;
        border: 3rpx solid #A292FF;
        margin: 20rpx 0 0;
        display: flex;
        align-items: center;
        color: #A292FF;
        font-size: 34rpx;
        position: relative;
        text-align: left;
        image {
          width: 30rpx;
          height: 30rpx;
          position:absolute;
          left: 15rpx
        }
      }
      .active {
        background: #A292FF;
        color: #fff;
      }
    }
    .myXb{
      height: 60rpx;
      line-height: 60rpx;
      font-size: 28rpx;
      display: flex;
      align-items: center;
      justify-content:space-between;
      .red{
        color: #A292FF;
      }
      .big{
        font-size: 36rpx;
      }
    }
  }
}

</style>
