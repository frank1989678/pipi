import * as url from './url'
import * as weui from './weui'
import * as regrex from './regrex'
import compareVersion from './compareVersion'

export default {
    regrex,
    compareVersion,
    toast: weui.toast,
    alert: weui.alert,
    confirm: weui.confirm,
    loading: weui.loading,
    getUrlParam: url.getUrlParam,
    hideLoading: weui.hideLoading
}
