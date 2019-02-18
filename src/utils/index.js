function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

const  formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')
  return `${t1} ${t2}`
}
const toast = (msg,types = "none",times = 2000) => {
  wx.showToast({
    title: `${msg}`,
    icon: `${types}`,
    duration: times
  })
}
const setStor = (name,value ) => {
  if(!name) return;
  wx.setStorageSync(name,value) ;
}
const getStor = (name) => {
  if(!name) return;
  return wx.getStorageSync(name) ;
}
const removeStor = (name) => {
  if(!name) return;
  wx.removeStorageSync(name) ;
}
const getSystemInfo = () =>  {
  wx.getSystemInfo({
    success:function(res){
      console.log(res)
      if(res.platform == "devtools"){
            return 'PC'
      }else if(res.platform == "ios"){
            return 'IOS'
      }else if(res.platform == "android"){
            return 'android'
      }
    }
  })
}
export  {
  getSystemInfo,
  formatTime,
  toast,
  setStor,
  getStor,
  removeStor
}
