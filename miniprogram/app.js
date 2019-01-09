var request_tool = require('tools/request.js');
var $ = new request_tool();
App({
  data: {
    // 全局请求域名
    domain: 'https://www.easy-mock.com/mock/5b6a9e8c91ab8d1a17b1cc2d/miniapp', //本地环境
    //domain: 'https://qt.davdian.com/index' //线上环境
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次
   */
  onLaunch: function (options) {
    var that = this;
    var system_info = wx.getSystemInfoSync();
    console.log("system_info", system_info);
  },

  /**
   * 页面未找到兼容情况
   */
  onPageNotFound: function (res) {
    var params = res.query;
    var query_str = '';
    for (var x in params) {
      query_str += x + '=' + params[x] + '&';
    }
    query_str = query_str.slice(0, -1);

    //兼容简版的品牌会员计划
    if (res.path == 'pages/join_group/index') {
      wx.reLaunch({
        url: '/pages/group_detail/index?' + query_str,
      })
    }
  },

  /**
   * 获取session_key
   */
  getSessionKey: function (cb) {
    var that = this;

    var user_info = wx.getStorageSync('user_info');
    var session_key = user_info.session_key;
    if (!session_key) {
      that.getNewSessionKey(cb);
    } else {
      wx.checkSession({
        success: function () {
          typeof cb == 'function' && cb(session_key);
        },
        fail: function (res) {
          //session_key过期，需要重新获取
          that.getNewSessionKey(cb);
        }
      })
    }
  },

  /**
   * 重新获取session_key
   */
  getNewSessionKey: function (cb) {
    var that = this;
    wx.login({
      success: function (res) {
        console.log("微信授权信息", res)
        var params = {
          code: res.code,
          user_token: that.get_token()
        };
        $.get(that.data.domain + '/auth/getNewSessionKey', params).then(function (res) {
          if (res.code == -999) {
            that.login(function () {
              that.getNewSessionKey(cb);
            })
          } else if (res.code == 100) {
            var user_info = wx.getStorageSync('user_info');
            user_info.session_key = res.result.session_key;
            wx.setStorageSync('user_info', user_info);
            typeof cb == 'function' && cb(res.result.session_key);
          }
        });
      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    var that = this;
    console.log("options", options)
    //记录群访问来源
    var share_ticket = options.shareTicket;
    console.log("5555", share_ticket)
    if (share_ticket) {
      wx.setStorageSync('group_info', share_ticket);
    } else {
      wx.setStorageSync('group_info', '');
    }

    console.log('APPJS：' + JSON.stringify(options));

    var query = options.query;
    //从APP进入的小程序。保存带过来的参数
    if (query.is_app == 1) {
      console.log(query);
      that.data.from_app_params = {
        is_app: 1,
        dvd_user_id: query.dvd_user_id,
        cat_id: query.cat_id
      };
    }

    if (wx.getUpdateManager) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        console.log('是否有新版本：' + res.hasUpdate);
      })
      updateManager.onUpdateReady(function () {
        wx.showModal({
          title: '更新提示',
          content: '有新版发布啦，快来体验新功能吧~',
          confirmText: "体验新版",
          success: function (res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          }
        })
      })
    }
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  },

  /**
   * 登录
   * 默认清除本地缓存再发起登录操作
   */
  login: function (cb) {
    var that = this;
    wx.setStorageSync('user_info', '');
    wx.login({
      success: function (res) {
        var code = res.code;
        var params = {
          code: code
        };
        $.get(that.data.domain + '/auth/login', params).then(function (res) {
          wx.hideLoading();
          if (res.code == 100) {
            if (res.result) {
              wx.setStorageSync('user_info', res.result);
            } else {
              wx.setStorageSync('user_info', '');
            }
            typeof cb == 'function' && cb();
          } else {
            that.msg(res.message);
          }
        })
      }
    })
  },

  /**
   * 保存form_id
   */
  saveFormId: function (form_id, type) {
    return false;

    var that = this;

    var params = {
      user_token: that.get_token(),
      form_id: form_id,
      type: type
    };

    $.get(that.data.domain + '/user/saveFormId', params).then(function (res) {
      if (res.code == -999) {
        that.login(function () {
          that.saveFormId(form_id, type);
        })
      }
    })
  },

  /**
   * 获取api请求token
   */
  get_token: function () {
    var user_info = wx.getStorageSync('user_info');
    return user_info.user_token;
  },

  /**
   * 错误提醒
   */
  msg: function (msg) {
    wx.showToast({
      title: msg,
      duration: 2500,
      icon: 'none'
    })
  },

  /**
   *  解析地址栏参数
   */
  parseUlr: function (str, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = str.match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
})