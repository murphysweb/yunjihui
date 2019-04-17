/**
 * 封装的一个请求工具
 * @param url {String} 请求接口
 * @param data {Obj} 请求参数
 * @param method {String} 请求方法 默认get
 * @param noLoading {boolean} 是否开启loading
 * @param header {obj} 添加的请求头配置
 * @param codeControl {boolean} 是否通过code码执行操作
 */
// 签名生成
var request = function (init) {
  init = init || {};
}
request.prototype = {
  get(url, data, method, noLoading, codeControl, headers) {
    // 添加参数时间戳
    data.timestamp = (Date.parse(new Date())) / 1000;
    // 请求公参注入header
    let header = {
      "X-Auth-Token": wx.getStorageSync('token') || ""
    }
    // 合并请求头信息
    header = Object.assign(headers || {}, header);
    let promise = new Promise(function (resolve, reject) {
      // 没有请求url或参数终止请求
      if (!url || !data) return false;
      // 默认所有请求触发加载状态
      if (!noLoading) {
        wx.showLoading({
          content: '加载中...',
          delay: 1000,
        });
      }
      wx.request({
        url,
        method: method || 'GET',
        header,
        data,
        success(res) {
          if (!noLoading) {
            wx.hideLoading();
          }
          var final_result = '';
          try {
            if (typeof res.data == 'object') {
              final_result = res.data;
            } else {
              final_result = JSON.parse(res.data);
            }
          } catch (err) {
            wx.showToast({
              content: "返回数据错误",
              duration: 2000
            });
          }
          resolve(final_result);
        },
        fail: (error) => {
          let apiArr = url.split("/");
          let api = apiArr[apiArr.length - 1]
          wx.showToast({
            content: "请求出错["+api+"][" + error.status + "]",
            duration: 3000
          });
          console.error(error.data);
          reject(error);
        }
      })
    });
    return promise;
  }
}
function isBoolean(value) {
  return Object.prototype.toString.call(value) === "[object Boolean]";
}
module.exports = request;
