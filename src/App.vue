<script>
import { getSysFlowers } from "@/utils/api.js";
export default {
  created() {
    getSysFlowers('dayLogin')
  }
};
</script>

<style lang="scss">
@import "./assets/styles/reset.scss";
.container {
  min-height: 100%;
  box-sizing: border-box;
  background: url("https://image-1257827636.cos.ap-shanghai.myqcloud.com/listbg20181022094912.png")
    repeat;
}
image {
  height: 100%;
  width: 100%;
}
.b_pink{
  background: #FFA4C7 !important;
}
.b_violet{
  background: #D042E1 !important;
}
.formidBtn button{
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0 !important;
  z-index: 99;
  border:0;
}
@font-face {
  font-family: "Jade2B";
  src: url("https://xcx-img.vdailian.com/studio_course/20180730151202.ttf");
}
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
