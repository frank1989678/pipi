import * as url from './url'
import * as weui from './weui'
import * as regrex from './regrex'
import compareVersion from './compareVersion'

export default {
    regrex,
    compareVersion,
    getUrlParam: url.getUrlParam,
    toast: weui.toast,
    alert: weui.alert,
    confirm: weui.confirm,
    loading: weui.loading,
    hideLoading: weui.hideLoading
}
