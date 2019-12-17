const dict = {
    'null': '',
    'undefined': ''
}

// 保存token，JSBridge拉起APP登录后会自动保存token到localStorage，
// ios因为无法处理页面跳转后及时更新token，这里将token同步一份到cookie
export const setToken = function(token) {
    Cookie.set('token', token);
}

export const getToken = function() {
    var token = localStorage.getItem('token');
    if (FLPP.Device.ios) {
        token = token || Cookie.get('token');
    }
    return dict[token] ? '' : decodeURIComponent(token);
};

export const isTokenValidateFormat = function(token) {
    return dict[token] ? false : true;
}
