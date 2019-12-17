//button点击防并发，0.3s内禁止第二次点击
import Vue from 'vue'

Vue.directive('down-app', {
  bind: function (el, binding) {
    let bindingData = binding.value
    el.addEventListener('click', function () {
      this.disabled = true;
      let that = this;
      let down_url = bindingData ? bindingData.android : window.APP_DOWN_Android_Channel.index;
      window.downApp(down_url);
      /*添加下载的统计*/
      if (window._hmt) {
        window._hmt.push(['_trackEvent', '下载APP', bindingData.name || window.location.href]);
      }
      setTimeout(function () {
        that.disabled = false;
      }, 300)
    });
  }
});
