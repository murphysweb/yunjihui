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
    pageNum: 1,
    pageSize: 10,
    loading: false,
    isLoad: false,
    banners: null,
    goodsList:null,
    iconList: [{
      icon: 'deliver_fill',
      color: 'red',
      badge: 0,
      name: '快递'
    }, {
      icon: 'goodsnew',
      color: 'orange',
      badge: 0,
      name: '外卖'
    }, {
      icon: 'coin',
      color: 'yellow',
      badge: 0,
      name: '二手'
    }, {
      icon: 'group',
      color: 'olive',
      badge: 0,
      name: '众包'
    }],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.getBanner();
    that.getGoodsList();
    that.setData({
      url: app.data.domain
    })
  },
  // 轮播图广告
  getBanner() {
    $.get(app.data.domain + "/api/cms/adInfo/center", {}).then(res => {
      console.log(res);
      if (res.code == 200) {
        this.setData({
          banners: res.data.data
        })
      } else {
        app.login(() => {
          this.getBanner();
        });
      }
    })
  },
  // 商品列表
  getGoodsList() {
    $.get(app.data.domain + "/api/ec/goodsInfo/center", {}).then(res => {
      console.log(res);
      if (res.code == 200) {
        this.setData({
          goodsList: res.data.data
        })
      } else {
        app.login(() => {
          this.getGoodsList();
        });
      }
    })
  },
  // 改功能暂未开放
  notYetOpen(){
    app.msg("该功能暂未开放")
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
      items: [],
      pageNum: 1
    })
    this.getList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // let that = this;
    // // 如果还有数据
    // if (that.data.isLoad) {
    //   return false;
    // }
    // that.setData({
    //   pageNum: +that.data.pageNum + 1
    // })
    // this.getList();
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