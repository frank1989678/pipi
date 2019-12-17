import app from './appRouter';
import utils from '@/utils'
import {setToken, getToken, isTokenValidateFormat} from '@/utils/token';

const data = function() {
    return {
        isPiPiApp: false,
        isLogin: false,
        version: '1.0.0'
    }
}
const methods = {
    // 不在app环境时，无法使用相关功能，是否需要跳转到app下载页（根据项目需要开启或关闭）
    notInApp() {
        // this.downLoadApp();
    },
    // app官方下载
    downLoadApp() {
        window.location.href = process.env.VUE_APP_DOWN_APP_URL;
    },
    // 拉起app登录，需要app版本大于1.2.9
    pullLogin() {
        this.isLogin = false;
        return new Promise((resolve, reject) => {
            if (utils.compareVersion(this.version, '1.2.9') >= 0) {
                FLPP.JSBridge.func.login(res => {
                    if (res.action === 'success') {
                        setToken('token', res.data.token);
                        this.isLogin = true;
                        resolve();
                    } else {
                        reject();
                    }
                }, err => {
                    // 调用失败，或app版本过低
                    utils.alert('请先进行登录APP后操作');
                    reject();
                })

            } else if (this.isPiPiApp) {
                utils.alert('请先进行登录APP后操作');
                reject();

            } else {
                // 非app打开的页面，跳转到下载页
                this.downLoadApp();
                reject();
            }
        })
    },
    // 拉起app分享
    pullShare() {
        const url = window.location.href;
        FLPP.JSBridge.func.share({
            data: {
                title: '就差你的一票啦！',
                content: '我正在参加“皮皮2019年度MVP人气陪练”竞选活动，就差你的一票了，动动手指，为我投票吧！爱你哦~',
                image: process.env.BASE_URL + 'static/images/share.png',
                url: url,
                copy: url
            }
        })
    },
    // 拉起app分享
    goToShare() {
        if (!this.isPiPiApp) {
            this.notInApp();
        } else if (this.isLogin) {
            this.pullShare();
        } else {
            this.pullLogin( this.goToShare );
        }
    },
    /**
     * 打开app tab页面
     * @param  {Number} tabIdx [1: 聊天室, 2: 动态]
     * @return {null}
     */
    goAppTab(tabIdx) {
        if (this.isPiPiApp) {
            this.notInApp();
        } else if (utils.compareVersion(this.version, '1.3.3') >= 0) {
           app.routers.openAppTab(tabIdx);
        } else {
            console.log('版本过低，请先升级app');
        }
    },
    // 打开我的下单记录
    goToOrderPage() {
        if (!this.isPiPiApp) {
            this.notInApp();
        } else if (this.isLogin) {
            app.routers.openOrderList();
        } else {
            this.pullLogin( this.goToOrderPage )
        }
    },
    // 关闭页面，返回app
    goBackToApp() {
        app.routers.goBackToApp();
    },
    pageReady() {
        if (FLPP.JSBridge.isPiPiApp) {
            FLPP.JSBridge.func.ready(res => {
                const data = res.data || {};
                const token = data.token || getToken();
                this.version = data.version;
                this.isLogin = isTokenValidateFormat(token);
                this.isPiPiApp = true;
                // 初始化
                this.initFetch && this.initFetch(true);
            })
        } else {
            this.isLogin = false;
            this.isPiPiApp = false;
            // 初始化
            this.initFetch && this.initFetch(false);
        }
    }
}

const mounted = function() {
    this.pageReady();
}

export default {
    methods,
    mounted,
    data
}