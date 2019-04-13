// pages/tieba/tieba.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    items: [
      
    ],
    mainTaps:[
      {
        name:"关注",
        id:0
      },
      {
        name: "首页",
        id: 1
      }
    ],
    tapValue:1
  },
    /**
   * tab切换
   */
  tabSelect(e){
    let id = e.currentTarget.dataset.id;
    this.setData({
      tapValue:id
    })
    // 请求新的数据
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 请求改页数据
    wx.request({
      url: app.globalData.url+"/api/cms/cmsContent/list",
      data: {

      },
      method: 'GET',
      success: function (res) {
        console.log(res.data.data.data);
        that.setData({
          items: res.data.data.data
        })
      },
      fail: function () {

      }
    })
    that.setData({
      url: app.globalData.url
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

  },
  lookImg: function(e) {
    console.log(e);
    let data = {
      urls: e.target.dataset.img,
      current: e.target.dataset.img[e.target.dataset.idx]
    }
    console.log(data);
    wx.previewImage(data);
  }
})