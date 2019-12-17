import utils from '@/utils'
import {getMVPRanks, voteUser, getMVPUserInfo, searchVoteUser} from '@/config/api';
import {getToken} from "@/utils/getToken";

const data = function() {
    return {
        isInit: false,
        voteConfirmModel: false,
        callChecked: false,
        voteModel: false,
        vodeUser: {},
        voteValue: 1,
        customValue: '',
        diamond: 0,
        ticket: 0, // 我的剩余票
        tabList: [
            {value: 1, date: '12.18-01.12', name: '人气榜'},
            {value: 2, date: '12.18-01.12', name: '神豪榜'}
        ],
        tabIdx: 1,
        jackpotRMB: '0',
        popList: [], // 人气榜
        godList: [], // 富豪榜
        recomendUser: {}, // 推荐人
        callList: [],
        callInfo: [],
        broadcast: false,
        mine: {}
    }
}

const methods = {
    supportCheck() {
        const czURL = process.env.VUE_APP_CHONGZHI_URL + '?mode=1&price=' + this.moreDiamond;
        if (this.isPiPiApp && this.nativePull) {
            if (FLPP.JSBridge.os === 'ios') {
                // 此处触发通过ios打开的链接
                FLPP.JSBridge.invoke({
                    cmd: 'func.openBrowser',
                    data: { url: czURL }
                });
                setTimeout(() => {
                    FLPP.JSBridge.invoke({
                        cmd: 'func.goBack'
                    })
                }, 100)

            } else {
                this.onPhoneSearch();
            }
        } else {
            // 不支持原生支付
            this.onPay();
        }
    },
    // 手机号查询个人信息(sessionkey)
    onPhoneSearch() {
        api_getByKeywords({keywords: this.mobile}).then(data => {
            this.createOrder(data.sessionkey || '');
        }, () => {
            this.userInfo = {};
        });
    },
    // 创建订单
    createOrder(sessionkey) {
        const token = getToken() || '';
        const userId = token.split('#')[1] || '';

        const para = {
            sessionkey,
            virtualMoney: this.moreDiamond,
            payment: 3, // 3：支付版， 1：微信
            userId,
            wxPayType: 1,
            aliPayType: 1,
            returnUrl: window.location.href,
            platform: 5
        };

        api_h5ChargeDiamond(para).then( res => {
            const data = res.data || {};
            const requestParameter = data.requestParameter || {};

            if (res.status !== 200) {
                utils.hideLoading();
                utils.toast(res.msg);

            } else if (this.isPiPiApp) {

                this.nativePullPay(res);
                utils.hideLoading();

            } else {
                const div = document.createElement('div');
                div.setAttribute('id', 'AlipayH5Container');
                div.innerHTML = requestParameter.form;
                document.body.appendChild(div);
                document.getElementById('AlipayH5Container').querySelector('form').submit();
            }

        })
    },
    // 拉起原生支付
    // 需要先创建一个订单
    nativePullPay(data) {
        FLPP.JSBridge.invoke({
            cmd: 'pay.pullAlipay',
            data,
            handle: res => {
                this.modalConfirmVisible = false;
                if (res.action === 'success') {
                    utils.toast('充值成功');
                } else {
                    utils.toast('支付失败');
                }
            }
        })
    },
    // 下载app
    downloadApp() {
        window.location.href = 'https://apk.apeiwan.com/';
    },
    // 选择投票数量，打call
    checkVote(num) {
        if (num === 'custom') {
            // 自定义票数
            this.voteValue = '';
            this.callChecked = false;

        } else if (num === 'call') {
            // 打call喇叭
            this.callChecked = !this.callChecked;

        } else {
            this.voteValue = num;
            this.customValue = '';
            this.callChecked = false;
        }
    },
    // 投票弹框
    onVoteModel(user) {
        if (this.isPiPiApp) {
            if (this.isLogin) {
                this.checkVote(1);
                this.voteModel = true;
                this.vodeUser = user;
            } else {
                this.pullLogin().then(res => {
                    this.getUserId(); // 查询用户信息
                    this.onVoteModel(user);
                }, () => {})
            }
        } else {
            this.downloadApp();
        }
    },
    // 投票确认弹框
    onVoteConfirm() {
        const {callChecked, voteValue, customValue, ticket} = this;
        const cost = customValue || voteValue;
        if (!callChecked && !voteValue && !customValue) {
            utils.toast('请先输入投票数量');

        } else if (!callChecked && ticket > cost) {
            // 票够，直接投票给TA
            this.onVoteTa(2);

        } else {
            this.voteConfirmModel = true;
        }
    },
    // 给ta投票
    onVoteTa() {
        const {vodeUser, callChecked, moreDiamond, costMoney} = this;

        if (!this.callChecked && this.moreDiamond) {
            // 跳转到充值页面
            this.onPay();
            return;
        }

        const para = {
            toUserId: vodeUser.userId
        }
        if (callChecked) {
            para.sendType = 1;
            para.ticketCount = 1;
        } else {
            para.sendType = costMoney > 0 ? 3 : 2;
            para.ticketCount = this.customValue || this.voteValue;
        }
        utils.loading('投票中...')
        voteUser(para).then( res => {
            utils.hideLoading();
            if (res.status == 200) {
                // 和app同步只显示昵称的前10个字符，多余的舍弃（不使用省略号）
                const name = (vodeUser.nickname || '').substring(0, 10);
                this.voteConfirmModel = false;
                this.voteModel = false;
                utils.toast('感谢你的支持，成功为' + name + '增添人气');
                // 查询用户数据
                this.init();
            } else {
                utils.toast(res.msg || '投票失败');
            }
        }, err => {
            utils.hideLoading();
            utils.toast('投票失败');
        })
    },
    onPay() {
        const page = {
            'androidRoute': '/khpw/ChongZhi_ZuanShiActivity',
            'ios_route': 'KHMyVirtualWalletController'
        };
        const data = JSON.stringify(page);
        FLPP.JSBridge.invoke({
            cmd: 'func.openAppPage',
            data: { para: data }
        })
        // window.location.href = process.env.VUE_APP_CHONGZHI_URL + '?mode=1&price=' + this.moreDiamond;
    },
    getUserId() {
        const token = getToken() || '';
        const userId = token.split('#')[1] || '';
        console.log('人气mvp页面：', userId, this.isPiPiApp)
        if (this.isPiPiApp && userId) {
            getMVPUserInfo({userId}).then( res => {
                const data = res.data || {};
                this.diamond = data.diamonds || 0;
                this.ticket = data.taskScore || 0;
                ['popRank', 'godRank'].forEach( key => {
                    var value = data[key] ? data[key]['rankValue'] : 0;
                    data[key + 'Text'] = value && value < 30 ? ('我的排名：' + value) : '未上榜';
                })
                this.mine = data;
            })
        }
    },
    init() {
        this.isInit = true;
        // 分享拉票对应用户的id，给Ta投票
        const uid = utils.getUrlParam('userId') || '';

        getMVPRanks().then(res => {
            const data = res.data || {};
            this.jackpotRMB = data.jackpotAmount || 0;
            if (!uid) {
                this.recomendUser = data.recommendInfo || {};
            }
            this.godList = data.godList || [];
            this.popList = data.popList || [];
            this.callList = data.callInfoList || [];
        })

        if (uid) {
            // 分享，查询指定陪玩师信息替代推荐位
            searchVoteUser({userId: uid}).then( res => {
                this.recomendUser = res.data || {};
            })
        }

        // 查询个人信息
        this.getUserId();
    }
};

const watch = {
    // 自定义票数输入校验，最大999999
    customValue(val1) {
        if (val1 === '0') {
            // console.log('第一位不能输入0')
            this.customValue = '';

        } else if (!/^\d*$/.test(val1)) {
            // console.log('不能输入非数字')
            this.customValue = val1.replace(/\D/g,'');

        } else if (val1 > 999999) {
            this.customValue = 999999;

        }
    }
}

const computed = {
    // 投票需花费钻石
    costMoney() {
        const ticket = this.ticket || 0;
        const voteValue = this.customValue || this.voteValue || 0;
        return this.callChecked ? 1000 : 10 * Math.max(0, voteValue - ticket);
    },
    // 还需对少钻
    moreDiamond() {
        return Math.max(0, this.costMoney - this.diamond);
    }
}
export default {
    data,
    watch,
    methods,
    computed,
}
