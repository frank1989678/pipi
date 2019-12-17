import Vue from 'vue'

/**
 * 阿里云图片裁剪
 */
Vue.filter('aliyunThumb', function(value, w, h) {
    value = value ? value.replace('http:', 'https:') : '';
    if (value.indexOf('.webp') > -1) {
        return value;
    }
    return value ? ((value.indexOf('.aliyuncs.') !== -1) ? (value + '?x-oss-process=image/resize,m_fill,h_' + h + ',w_' + w + '') : value) : value
});

/**
 * 阿里云图片http改https
 */
Vue.filter('aliyunHttps', function(value) {
    return value.indexOf('.aliyuncs.') !== -1 ? value.replace('http:', 'https:') : value
});


/**
 * 性别默认图片地址
 */
Vue.filter('genderUrl', function(value) {
    return value == 1
        ? 'https://game-play.oss-cn-hangzhou.aliyuncs.com/h5/img/2019091703/boy.png'
        : 'https://game-play.oss-cn-hangzhou.aliyuncs.com/h5/img/2019091703/girl.png';
});
