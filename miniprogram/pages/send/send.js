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
    items:[],
    banners:[]
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      url: app.data.domain
    })
    that.getSends();
    that.getBanner();
  },
  toDetail(){
    wx.navigateTo({
      url: "../detail/detail"
    })
  },
  // 轮播图广告
  getBanner(){
    $.get(app.data.domain + "/api/cms/adInfo/center", {}).then(res => {
      console.log(res);
      this.setData({
        banners: res.data.data
      })
    })
  },
  // 获取配送列表
  getSends(){
    $.get(app.data.domain + "/api/task/task/list", {}).then(res => {
      console.log(res);
      this.setData({
        items: res.data.data
      })
    })
  },
  // 发起配送
  createsend(){
    wx.navigateTo({
      url: '../createsend/createsend'
    })
  }
})