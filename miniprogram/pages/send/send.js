const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    cardCur: 0,
    TabCur: 0,
    scrollLeft: 0,
    items:[]
  },
  onLoad: function (options) {
    var that = this;
    // this.towerSwiper('tower');
    // 初始化towerSwiper 传已有的数组名即可
    wx.request({
      url: app.globalData.url +"/api/task/task/list",
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
  }
})