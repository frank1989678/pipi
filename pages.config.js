/**
 *  站点多页面配置
 */
let template = 'public/index.html'; // 默认模板路径
module.exports = {
    'index': {
        entry: 'src/pages/index/index.js',
        filename: 'index.html',
        template,
        title: '年度盛典',
        chunks: ['chunk-vendors', 'chunk-common', 'chunk-index-vendors', 'index']
    }
};
