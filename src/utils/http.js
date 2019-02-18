let baseUrl = "https://www.hz-jingjing.cn/";
import {
  toast,getStor,setStor,removeStor
} from './index.js'
const getApi = (url, datas = {}, types = "POST") => {
  let sessionid = getStor('sessionid');
  datas = Object.assign({
    sessionID:sessionid
  },datas)
  return new Promise(function (r, s) {
    wx.request({
      url: `${baseUrl}${url}`, //仅为示例，并非真实的接口地址
      method: `${types}`,
      data: datas,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        if (res.data) {
          r(res.data)
        }else{
          toast('服务器开小差(⊙x⊙;)')
        }
      },
      fail(err) {
        s(err)
      }
    })
  })
}
export {
  getApi
};
