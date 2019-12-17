let pages = require('./pages.config');

module.exports = {
  devServer: {
    port: 9366
  },
  pages,
  outputDir: process.env.VUE_APP_BUILD_OUTPUT_DIR,
  assetsDir: 'static',
  publicPath: '/',
  productionSourceMap: false,
  lintOnSave: false, // 关闭eslint验证,
  configureWebpack: {
    /*忽略以下文件打包*/
    externals: process.env.NODE_ENV === 'production' ? {
      vue: 'Vue'
    } : {}
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('./postcss-vw')({
            propertyBlacklist: [],
            selectorBlackList: [],
            viewportWidth: 1080,
            viewportUnit: 'vw',
            minPixelValue: 1,
            unitPrecision: 3,
            mediaQuery: false
          })
        ]
      }
    }
  }
};
