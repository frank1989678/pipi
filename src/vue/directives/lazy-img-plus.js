//  随机的图片背景加载
import Vue from 'vue'

function isDataSrc(el) {
  let dataSrc = el.getAttribute('data-src') + '';
  return dataSrc.indexOf('/') !== -1;
}

import i_lazy_img from '../../assets/images/i_lazy_img.png'

function randomLazySrc() {
  return i_lazy_img
}

function hasClass(elem, cls) {
  cls = cls || '';
  if (cls.replace(/\s/g, '').length === 0) return false; //当cls没有参数时，返回false
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}

Vue.directive('lazy-img-plus', {
  bind: function (el) {
    el.src = randomLazySrc();
    if (isDataSrc(el)) {
      el.classList.add('lazyload');
    }
  },
  update: function (el) {
    if (isDataSrc(el) && !hasClass(el, 'lazyload')) {
      el.classList.add('lazyload');
    }
  }
});
