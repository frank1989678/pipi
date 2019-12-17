import axios from 'axios'
import {getToken} from "@/utils/token";

const qs = function(params) {
    const arr = [];
    for (let i in params) {
        arr.push(i + '=' + params[i]);
    }
    return arr.join('&');
}
/**
 * axios 配置
 */
axios.defaults.timeout = 35000;

/**
 * axios  请求拦截器
 */
axios.interceptors.request.use(config => {
    if (config.url.indexOf('http') == -1) {
        config.url = process.env.VUE_APP_API_BASEURL + config.url;
    }
    config.data = qs(config.data);
    config.headers['token'] = getToken()
    return config;
}, err => {
    return Promise.reject(err);
});

/**
 * axios  响应拦截器
 */
axios.interceptors.response.use(response => {
    return Promise.resolve(response.data)
}, err => {
    return Promise.reject(err);
});
