import { getApi } from './http.js'
//获取时间列表
const getRankCycleList = () => {
    return getApi('index/getRankCycleList')
}
//首页明星列表
const starRank = (startDate,endDate,page = 1,limit = 11) => {
    return getApi('index/starRank',{
        startDate, 
        endDate,
        page, 
        limit
    })
}
//活动列表
const activityList = (page = 1,limit = 10) => {
    return getApi('activity/list',{
        page, 
        limit
    })
}
//登录验证
const logins = (code,encryptedData,iv) => {
    return getApi('login',{
        code,
        encryptedData,
        iv
    })
}
//明星空间
const space = (starid) => {
    return getApi('space',{
        star_id:starid
    })
}
//明星搜索
const search = (star_name) => {
    return getApi('index/search',{
        star_name
    })
}
//获取系统星币
const getSysFlowers = (source) => {
    return getApi('index/getSysFlowers',{
        source
    })
}
//爱豆列表
const getMyIdolList = () => {
    return getApi('index/getMyIdolList')
}
//打榜列表
const rankhit = (page = 1,limit = 10) => {
    return getApi('rank/hit',{
        page, 
        limit
    })
}
//活动邀请列表
const ac_rank = (activity_id,page = 1,limit = 10) => {
    return getApi('activity/rank',{
        activity_id,
        page, 
        limit
    })
}
//明星空间邀请列表
const fansInviteRank = (star_id,page = 1,limit = 10) => {
    return getApi('space/fansInviteRank',{
        star_id,
        page, 
        limit
    })
}
//明星空间邀请回调
const inviteCallBack = (star_id,u_sessionID) => {
    return getApi('space/inviteCallBack',{
        star_id,
        u_sessionID
    })
}
//明星空间粉丝贡献排行榜
const fansHitRank = (star_id,page = 1,limit = 10) => {
    return getApi('space/fansHitRank',{
        star_id,
        page, 
        limit
    })
}
//明星星币记录
const myFlowersDetail = (type,page = 1,limit = 20) => {
    return getApi('my/myFlowersDetail',{
        type,
        page, 
        limit
    })
}
//星币赠送
const sendFlowers = (star_id,send_flowernum) => {
    return getApi('rank/sendFlowers',{
        star_id, 
        send_flowernum
    })
}
//应援
const ac_join = (activity_id) => {
    return getApi('activity/join',{
        activity_id
    })
}
//充值
const pay = (flower_num,sourceUrl,platForm) => {
    return getApi('pay/pay',{
        flower_num,
        sourceUrl,
        platForm
    })
}
//删除爱豆
const delMyIdol = (star_id) => {
    return getApi('index/delMyIdol',{
        star_id
    })
}
//充值列表
const charge = () => {
    return getApi('rank/charge')
}
//banner
const getBannerInfo = () => {
    return getApi('index/getBannerInfo')
}
//banner
const rules = () => {
    return getApi('index/rule')
}
//开屏
const getLaunchScreen = () => {
    return getApi('index/getLaunchScreen')
}
//应援邀请回调
const ac_jinviteCallBack = (activity_id,u_sessionID) => {
    let _data = {
        activity_id, 
        u_sessionID
    }
    return getApi('activity/inviteCallBack',_data)
}
//活动详情
const ac_detail = (activity_id,u_sessionID) => {
    let _data = {
        activity_id, 
        u_sessionID
    }
    return getApi('activity/detail',_data)
}
export {rules,myFlowersDetail,getLaunchScreen,getBannerInfo,charge,pay,inviteCallBack,delMyIdol,getSysFlowers,fansInviteRank,fansHitRank,ac_rank,ac_jinviteCallBack,ac_join,ac_detail,sendFlowers,rankhit,search,getMyIdolList,space,starRank,getRankCycleList,activityList,logins};