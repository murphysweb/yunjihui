const app = getApp();
var request_tool = require('../../utils/request.js');
var $ = new request_tool();
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
    $.get(app.data.domain + "/api/task/task/list", {}).then(res => {
      console.log(res);
      that.setData({
        items: res.data.data
      })
    })
    that.setData({
      url: app.data.domain
    })
  },
  toDetail(){
    wx.navigateTo({
      url: "../detail/detail"
    })
  }
})