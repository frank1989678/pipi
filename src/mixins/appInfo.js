

const methods = {
    // 打开app页面
    goAppPage(key, query) {
        if (FLPP.JSBridge.isPiPiApp) {
            const router = AppRouters[key];
            const minVersion = router['version'];
            const ver = FLPP.JSBridge.version;
            if (ver && minVersion && this.compareVersion(ver, minVersion) < 0) {
                console.log('版本过低');

            } else {
                const data = JSON.stringify(router.para(query));
                FLPP.JSBridge.invoke({
                    cmd: 'func.openAppPage',
                    data: {para: data}
                })
            }
        }
    },
    openIm(item) {
        if (this.supportOpenIm) {
            const {imId, nickname} = item;
            FLPP.JSBridge.invoke({
                cmd: 'func.openIm',
                data: {imId, nickname},
                handle: function (res) {
                    utils.alert(JSON.stringify(res));
                    console.log(res)
                }
            })
        } else {
            this.$toast('对方暂不支持消息沟通，请等待考核官与你联系');
        }
    }
};

const data = function() {
    return {
        allPage: links,
        supportCropImg: false,
        supportRouter: false,
        supportOpenIm: false
    }
}

const created = function() {
};

export default {
    data,
    methods,
    created
}
