/*
 * axios response 拦截
 * 防止页面异步请求中没有 reject 错误，因此这里兜底处理 catch
 * @param requestPromise
 * @returns {Promise<any>}
 */
import {hideLoading, toast} from './weui'

export const responsePromiseInterceptors = requestPromise => {
    return new Promise(resolve => {
        requestPromise.then(data => {
            resolve(data)
        }, err => {
            /**
             * 服务器错误异常处理
             * @param err
             */
            hideLoading();
            toast('网络超时，请稍后再试');
            if (process.env.NODE_ENV !== 'production') {
                console.info('%c [axios catch error]:', "color:#F56C6C;font-weight:bold", err)
            }
        }).catch()
    })
}
