function getScrollTop() {
    var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}

//文档的总高度
function getScrollHeight() {
    var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

export let scrollListener = {
    scrollEl: null,
    throttlePullUpScroll: function() {

    },
    /**
     * 滚动绑定
     * @param handle
     * @param {{debounce: number}} params
     * @param {number=} params.debounce
     * @param {HTMLElement} params.scrollEl
     * @param {HTMLElement=} params.contentEl
     */
    bind: function(handle, params) {
        let opts = {
            debounce: 200,
            ...params
        };

        //浏览器视口的高度
        // let windowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //文档的总高度
        // let documentScrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
        // 滚动条在Y轴上的滚动距离
        // let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        let contentEl = opts.contentEl;
        let scrollEl = opts.scrollEl;
        this.scrollEl = scrollEl;
        // document.addEventListener('mousemove', function () {
        //   scrollEl.style.zIndex = '3'
        // }, false);

        function scrollHandle() {
            // scrollEl.style.zIndex = '3';
            //内容的实际高度
            let contentClientHeight = contentEl ? contentEl.clientHeight : scrollEl.scrollHeight;
            // 滚动条在Y轴上的滚动距离
            let scrollTop = scrollEl.scrollTop;
            if (scrollEl.location) {
                contentClientHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
                scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            }
            handle && handle({
                windowClientHeight: getWindowHeight(),
                contentClientHeight,
                isScrollBottom: (getScrollTop() + getWindowHeight()) + 10 > getScrollHeight(),
                scrollTop: getScrollTop(),
                contentEl,
                scrollEl
            })
        }

        this.throttlePullUpScroll = window.throttle(scrollHandle, opts.debounce);
        scrollEl.addEventListener('scroll', this.throttlePullUpScroll, false);
    },
    remove: function() {
        this.scrollEl && this.scrollEl.removeEventListener('scroll', this.throttlePullUpScroll)
    },
};

export default scrollListener
