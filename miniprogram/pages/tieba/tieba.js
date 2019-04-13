// pages/tieba/tieba.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    lists: [{
        name: "文小港",
        desc: "贾师傅啊可接受的来附近阿道夫埃里克森京东方来看加快了时代峻峰奥斯卡大姐夫拉克束带结发",
        img: [
          'https://image.weilanwl.com/img/square-3.jpg',
          'https://image.weilanwl.com/img/square-3.jpg',
          'https://image.weilanwl.com/img/square-3.jpg'
        ]
      },
      {
        name: "文小港",
        desc: "贾师傅啊可接受的来附近阿道夫埃里克森京东方来看加快了时代峻峰奥斯卡大姐夫拉克束带结发",
        img: [
          'https://image.weilanwl.com/img/square-3.jpg',
          'https://image.weilanwl.com/img/square-3.jpg',
          'https://image.weilanwl.com/img/square-3.jpg'
        ]
      }
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
    // 请求改页数据
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