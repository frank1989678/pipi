import axios from 'axios'
import {axiosCancelResInterceptors} from "@/config/axios";
import {responsePromiseInterceptors} from '@/utils/http'

// 活动时间，倒计时
export const getActiveTime = params => responsePromiseInterceptors(axios.post('/api/v1/year-end/activity-info', params))

// 分享
export const share = params => responsePromiseInterceptors(axios.post('/api/v1/activity/eleven-lottery/share', params))

// 荣耀殿堂
export const getRYDTRanks = params => responsePromiseInterceptors(axios.post('/api/v1/activity/year-mvp/final-rank', params))

// 公会对决字典配置（活动时间）
export const getDictGHDJ = params => responsePromiseInterceptors(axios.post('/api/v1/activity/year-end/dic/config', params))
// 公会对决-排位赛
export const getUnionRankList = params => responsePromiseInterceptors(axios.post('/api/v1/activity/year-end/rank/list', params))
// 公会对决-pk赛
export const getUnionPkList = params => responsePromiseInterceptors(axios.post('/api/v1/activity/year-end/pk/list', params))
// 公会对决-火力全开
export const getUnionHLQKList = params => responsePromiseInterceptors(axios.post('/api/v1/activity/year-end/hlqk/list', params))


// 最强赛区活动信息
export const getDictZQSQ = params => responsePromiseInterceptors(axios.post('/api/v1/year-end/strongest-area/main-info', params))
// 最强赛区-个人任务完成情况信息
export const getZQSQUserInfo = params => axiosCancelResInterceptors().post('/api/v1/year-end/strongest-area/mission-complete-info', params)
// 最强赛区-积分记录
export const getZQSQScoreRecords = params => responsePromiseInterceptors(axios.post('/api/v1/year-end/strongest-area/score-records', params))
// 最强赛区-榜单信息
export const getZQSQRanks = params => responsePromiseInterceptors(axios.post('/api/v1/year-end/strongest-area/tops', params))
// 最强赛区-pk榜
export const getZQSQPkList = params => responsePromiseInterceptors(axios.post('/api/v1/year-end/strongest-area/whole-ranking-pk-tops', params))
// 最强赛区-pk帮-个人信息
export const getZQSQPkUser = params => axiosCancelResInterceptors().post('/api/v1/year-end/strongest-area/whole-ranking-pk-user', params)


// 年度MVP-榜单信息
export const getMVPRanks = params => responsePromiseInterceptors(axios.post('/api/v1/activity/year-mvp/activity-info', params))
// 用户信息
export const getMVPUserInfo = params => responsePromiseInterceptors(axios.post('/api/v1/activity/year-mvp/user-info', params))
// 年度MVP-投票
export const voteUser = params => responsePromiseInterceptors(axios.post('/api/v1/activity/year-mvp/send-ticket', params))
// 年度MVP-搜索用户
export const searchMVPUser = params => responsePromiseInterceptors(axios.post('/api/v1/activity/year-mvp/query-rank', params))
// 年度MVP-给用户投票
export const searchVoteUser = params => responsePromiseInterceptors(axios.post('/api/v1/activity/year-mvp/search/user-info', params))