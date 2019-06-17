// miniprogram/pages/addresslist/addresslist.js
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
    addressList:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddressList();
  },
   /**
   * 获取地址列表
   */
  getAddressList(){
    $.get(app.data.domain + "/api/ec/userAddress/myList", {}).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.setData({
            addressList: res.data.data
          })
        } else {
          app.login(() => {
            this.getAddressList();
          });
        }
      })
  },
  // 编辑地址
  edit(e){
    wx.navigateTo({
      url: `/pages/addaddress/addaddress?id=${e.target.dataset.id}`
    })
  },
  // 删除地址
  deletes(e){
    $.get(app.data.domain + `/api/ec/userAddress/delete`, { id: e.target.dataset.id}, "POST", false, false, {
      "content-type": "application/x-www-form-urlencoded"
    }).then(res => {
      if (res.code == 200) {
        this.getAddressList()
      }
      wx.hideLoading();
    })
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
    if(this.data.addressList){
      this.getAddressList();
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

  }
})