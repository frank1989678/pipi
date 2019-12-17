
/**
 * 截取url参数
 * @param name
 * @returns {*}
 */
export const getUrlParam = function (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
};