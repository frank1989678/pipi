const methods = {
    blurHandle() {
        if (this.IS_IOS) {
            // https://www.jianshu.com/p/9457a0efec16
            // https://blog.csdn.net/User_Lily/article/details/93169733
            setTimeout(() => {
                var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            }, 100)
        }
    },
};

const computed = {
    IS_IOS() {
        var ua = window.navigator.userAgent;
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        if (ipad || iphone || ipod) {
            return true;
        }
        return false;
    }
}
export default {
    methods,
    computed
}
