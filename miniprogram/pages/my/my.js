const app = getApp();
var request_tool = require('../../utils/request.js');
var $ = new request_tool();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var user_info = wx.getStorageSync('user_info');
    this.setData(user_info);
    // 获取用户数据
    this.getMyData();
  },
  getMyData() {
    $.get(app.data.domain + "/api/userprofile/userProfile/center", {}).then(res => {
      if (res.code == 200) {
        this.setData({
          users: res.data
        })
      } else {
        app.login(() => {
          this.getMyData();
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})