import Vue from 'vue'

/**
 * 格式化时间
 */
Vue.filter('yymmdd', function(value, w, h) {
    const currDate = new Date();
    const t = new Date(value.replace(/-/g, '/'));
    const a1 = t.getFullYear() == currDate.getFullYear();
    const a2 = a1 ? t.getMonth() == currDate.getMonth() : false;
    const a3 = a2 ? t.getDate() == currDate.getDate() : false;
    return !value ? value : a3 ? '今日' : [t.getMonth() + 1, t.getDate()].map( num => {
        return num < 10 ? '0' + num : num
    }).join('.')
});