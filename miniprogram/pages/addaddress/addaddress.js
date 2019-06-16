// miniprogram/pages/addaddress/addaddress.js
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
    region: ['广东省', '广州市', '海珠区'],
    formData:{
      id: "",
      userId: "",
      receiver: "",
      mobilePhone: "",
      address: "",
      zipCode: "",
      provinceld: "",
      province: "",
      cityId: "",
      city: "",
      areaId: "",
      area: ""
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  // 地址选择变化
  bindRegionChange(v){
    console.log(v);
    this.setData({
      region:v.detail.value,
      'formData.zipCode': v.detail.postcode,
      'formData.provinceld': v.detail.code[0],
      'formData.province': v.detail.value[0],
      'formData.cityId': v.detail.code[1],
      'formData.city': v.detail.value[1],
      'formData.areaId': v.detail.code[2],
      'formData.area': v.detail.value[2],
    })
  },
  oninput(e){
    console.log(e);
    let name = e.target.dataset.name;
    let names = 'formData.'+name;
    this.setData({
      ['formData.' + name]: e.detail.value,
    })
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