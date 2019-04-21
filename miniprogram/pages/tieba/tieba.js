// pages/tieba/tieba.js
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
    items: [

    ],
    mainTaps: [{
        name: "关注",
        id: 0
      },
      {
        name: "首页",
        id: 1
      }
    ],
    tapValue: 1,
    pageNum: 1,
    pageSize: 10,
    loading: false,
    isLoad: false
  },
  /**
   * tab切换
   */
  tabSelect(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      tapValue: id
    })
    // 请求新的数据
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.getList();
    that.setData({
      url: app.data.domain
    })
  },
  // 请求贴吧列表数据
  getList() {
    let that = this;
    if (that.data.loading) {
      return false;
    }
    // 请求该页数据
    $.get(app.data.domain + "/api/cms/cmsContent/list", {
      pageNum: that.data.pageNum,
      pageSize: that.data.pageSize,
    }).then(function(res) {
      wx.stopPullDownRefresh();
      that.setData({
        items: that.data.items.concat(res.data.data),
        pageNum: that.data.pageNum
      });
      // 如果数据不够10条
      if (res.data.data.length < 10){
        that.setData({
          isLoad:true
        })
      }
    })
  },
  // 发帖子
  addtiezi() {
    wx.navigateTo({
      url: '../addtiezi/addtiezi'
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
    this.setData({
      items:[],
      pageNum: 1
    })
    this.getList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this;
    // 如果还有数据
    if (that.data.isLoad) {
      return false;
    }
    that.setData({
      pageNum: +that.data.pageNum + 1
    })
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 查看大图
  lookImg: function(e) {
    let data = {
      urls: [e.target.dataset.img],
      current: e.target.dataset.img
    }
    wx.previewImage(data);
  },
  // 该功能暂未开放
  notOpen() {
    app.msg("该功能暂未开放")
  }
})