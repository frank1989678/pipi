/**
 * 显示loading
 * @param title
 */
export const loading = title => {
    window.loading = weui.loading(title, {
        className: 'pp-loading'
    });
}

/**
 * 隐藏loading
 */
export const hideLoading = () => {
    window.loading && window.loading.hide();
}

/**
 * alert
 */
export const alert = (content, handle, opt ={}) => {
    const cls = 'pp-dialog ' + (opt.cls ? opt.cls : 'pp-dialog-default');
    weui.alert(content, {
        isAndroid: false,
        className: opt.cls || 'pp-alert',
        title: opt.title || '',
        buttons: [{
            label: opt.cancelVal || '确定',
            type: 'default',
            onClick: () => {
                handle && handle();
            }
        }]
    });
}

/**
 * confirm
 */
export const confirm = (content, handle, opt = {}) => {
    const cls = 'pp-dialog ' + (opt.cls ? opt.cls : 'pp-dialog-default');
    weui.confirm(content, {
        isAndroid: false,
        className: cls,
        title: opt.title || '提示',
        buttons: [{
            label: opt.cancelVal || '取消',
            type: 'default'
        }, {
            label: opt.okVal || '确定',
            type: 'primary',
            onClick: () => {
                handle && handle();
            }
        }]
    })
}

/**
 * toast
 */
export const toast = (content, duration = 3000) => {
    content && weui.toast(content, { duration: duration, className: 'pp-toast' });
}
