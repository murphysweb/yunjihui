/**
 * 封装的一个请求工具，附带签名验证
 */
// 版本号
var version = '3.8.0'
var getSign = require('./getSign.js');

var request = function (init) {
  init = init || {};
}

request.prototype = {
  get: function (url, params) {
    let promise = new Promise(function (resolve, reject) {
      if (!url || !params) return false;
      // console.log('请求网关：' + url);
      // console.log('请求参数：' + JSON.stringify(params));
      //增加时间戳验证
      params.time = Date.parse(new Date()) / 1000;
      //生成请求签名
      params.sign = getSign.make(params);
      params.version = version;
      wx.request({
        url: url,
        data: params,
        success: function (res) {
          var final_result = '';
          try {
            if (typeof res.data == 'object') {
              final_result = res.data;
            } else {
              final_result = JSON.parse(res.data);
            }
          } catch (err) {
            final_result = {
              code: 0,
              result: '',
              message: '服务器错误，请联系管理员'
            };
          }

          resolve(final_result);
        },
        error: function (error) {
          reject(error);
        }
      })
    });

    return promise;
  }
}

module.exports = request;
