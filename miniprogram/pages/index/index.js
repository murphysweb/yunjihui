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
    var that = this;
    var user_info = wx.getStorageSync('user_info');
   
    if (!user_info) {
     
    } else {
      //如果用户已经绑定授权了用户信息，调到群列表页
      if ((user_info.nickname || user_info.avatarUrl)) {
        setTimeout(function () {
          wx.reLaunch({
            url: '/pages/tieba/tieba',
          })
        }, 300);
        return false;
      }

      that.setData({
        user_info: user_info
      })
    }
    wx.hideLoading();

    //清楚缓存数据
    wx.setStorageSync('need_refresh_page', false);
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
        url: '../tieba/tieba'
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;

    //是否需要重新刷新页面
    var need_refresh_page = wx.getStorageSync('need_refresh_page');
    if (need_refresh_page) {
      that.startBrandPlan();
      wx.setStorageSync('need_refresh_page', false);
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 采集form_id
   */
  fetchFormId: function (e) {
    var form_id = e.detail.formId;
    var type = e.detail.target.dataset.type;

    app.saveFormId(form_id, type);
  },
})
