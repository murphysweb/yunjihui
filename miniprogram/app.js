//app.js
var request_tool = require('utils/request.js');
var $ = new request_tool();
App({
  data: {
    // 全局请求域名
    // domain: 'https://www.easy-mock.com/mock/5b6a9e8c91ab8d1a17b1cc2d/miniapp', //本地环境
    domain: 'https://www.chuangyedaoyu.com' //线上环境
  },
  onLaunch: function() {
    // 如果未授权需要跳转到 未取到userInfo信息
    let user_info = wx.getStorageSync('user_info');
    if (!user_info) {
      wx.reLaunch({
        url: 'pages/guide/guide'
      })
    }
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
    var system_info = wx.getSystemInfoSync();
  },
  globalData: {
    
  },
  /**
   * 获取session_key
   */
  getSessionKey: function(cb) {
    var that = this;
    var user_info = wx.getStorageSync('user_info');
    var session_key = user_info.session_key;
    if (!session_key) {
      that.getNewSessionKey(cb);
    } else {
      wx.checkSession({
        success: function() {
          typeof cb == 'function' && cb(session_key);
        },
        fail: function(res) {
          //session_key过期，需要重新获取
          that.getNewSessionKey(cb);
        }
      })
    }
  },

  /**
   * 重新获取session_key
   */
  getNewSessionKey: function(cb) {
    var that = this;
    wx.login({
      success: function(res) {
        console.log("微信授权信息", res)
        var params = {
          code: res.code,
          user_token: that.get_token()
        };
        $.get(that.data.domain + '/auth/getNewSessionKey', params).then(function(res) {
          if (res.code == -999) {
            that.login(function() {
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
  onShow: function(options) {
    var that = this;
    if (wx.getUpdateManager) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function(res) {
        // 请求完新版本信息的回调
        console.log('是否有新版本：' + res.hasUpdate);
      })
      updateManager.onUpdateReady(function() {
        wx.showModal({
          title: '更新提示',
          content: '有新版发布啦，快来体验新功能吧~',
          confirmText: "体验新版",
          success: function(res) {
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
  onHide: function() {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function(msg) {

  },

  /**
   * 登录
   * 默认清除本地缓存再发起登录操作
   */
  login: function(callback) {
    var that = this;
    // wx.setStorageSync('user_info', '');
    wx.login({
      success: function(res) {
        let params = {
          appCode: res.code
        };
        // 获取openid
        $.get(that.data.domain + '/api/token/getOpenId', params).then(res => {
          let userinfo = wx.getStorageSync('user_info');
          let data = {
            openId:res.message,
            nickName: userinfo.nickName,
            image: userinfo.avatarUrl
          }
          $.get(that.data.domain + '/api/token/wlogin2', data, "POST").then(function (res) {
            wx.setStorageSync('token', res.message);
            callback();
          })
        })
        let data = {

        }
        
      }
    })
  },
  getOpenId(params) {
    $.get(this.data.domain + '/api/token/getOpenId', params).then(res => {
      console.log(res)
    })
  },

  /**
   * 获取api请求token
   */
  get_token: function() {
    var user_info = wx.getStorageSync('user_info');
    return user_info.user_token;
  },

  /**
   * 错误提醒
   */
  msg: function(msg) {
    wx.showToast({
      title: msg,
      duration: 2500,
      icon: 'none'
    })
  },

  /**
   *  解析地址栏参数
   */
  parseUlr: function(str, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = str.match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
})