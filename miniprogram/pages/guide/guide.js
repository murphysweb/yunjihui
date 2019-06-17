var app = getApp();
var request_tool = require('../../utils/request.js');
var $ = new request_tool();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 获取微信信息绑定
   */
  getUserInfos: function (event) {
    var that = this;
    var user_info = event.detail.userInfo;
    wx.setStorageSync('user_info', user_info);
    if (!user_info) {
      app.msg('允许授权后才能进行相关操作');
      return false;
    }

    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    app.login(() => {
      wx.reLaunch({
        url: '../index/index'
      })
    });
  }
})
