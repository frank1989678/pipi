import app from './appRouter';
import utils from '@/utils'
import {setToken, getToken, isTokenValidateFormat} from '@/utils/token';

const data = function() {
    return {
        isCanIUserLogin: false,
        isCanGoTab: false,
        pageLoaded: false,
        isPiPiApp: false,
        isLogin: false,
        isReady: false
    }
}
const methods = {
    // app官方下载
    downLoadApp() {
        window.location.href = process.env.VUE_APP_DOWN_APP_URL;
    },
    // 拉起app登录，需要app版本大于1.2.9
    pullLogin() {
        this.isLogin = false;
        return new Promise((resolve, reject) => {
            if (this.isCanIUserLogin) {
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

    },
    // 拉起app分享
    goToShare() {
        if (this.isLogin) {
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
        if (this.isCanGoTab) {
            const para = app.routers.openAppTab(tabIdx);
            app.invoke(para);
        } else {
            this.goBackToApp();
        }
    },
    // 打开我的下单记录
    goToOrderPage() {
        if (this.isLogin) {
            const para = app.routers.openOrderList();
            app.invoke(para);
        } else {
            this.pullLogin( this.goToOrderPage )
        }
    },
    // 关闭页面，返回app
    goBackToApp() {
        if (this.isPiPiApp) {
            FLPP.JSBridge.invoke({
                cmd: 'func.goBack',
                data: {}
            })
        } else {
            window.history.go(-1);
        }
    },
    pageReady() {
        if (FLPP.JSBridge.isPiPiApp) {
            FLPP.JSBridge.func.ready(res => {
                const data = res.data || {};
                const token = data.token || getToken();
                this.isLogin = isTokenValidateFormat(token);
                this.isReady = true;
                this.isPiPiApp = true;
                this.isCanGoTab = utils.compareVersion(window.FLPPJSBridge.version, '1.3.3') >= 0;
                this.isCanIUserLogin = utils.compareVersion(window.FLPPJSBridge.version, '1.2.9') >= 0;
                // 初始化
                this.initFetch && this.initFetch(true);
            })
        } else {
            this.isLogin = false;
            this.isReady = true;
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