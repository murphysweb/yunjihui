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
    region: ['请选择省', '请选择市', '请选择区'],
    formData: {
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
    this.setData(options);
    if (this.data.id) {
      this.getEditData();
    }
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
  bindRegionChange(v) {
    this.setData({
      region: v.detail.value,
      'formData.zipCode': v.detail.postcode,
      'formData.provinceld': v.detail.code[0],
      'formData.province': v.detail.value[0],
      'formData.cityId': v.detail.code[1],
      'formData.city': v.detail.value[1],
      'formData.areaId': v.detail.code[2],
      'formData.area': v.detail.value[2],
    })
  },
  // 输入框输入事件
  oninput(e) {
    console.log(e);
    let name = e.target.dataset.name;
    let names = 'formData.' + name;
    this.setData({
      ['formData.' + name]: e.detail.value,
    })
  },
  // 保存或更新地址
  save() {
    let param = this.data.formData;
    if (param.receiver == "") {
      app.msg("请输入收件人");
      return false;
    }
    var phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
    if (!phoneReg.test(param.mobilePhone)) {
      app.msg("请输入有效的手机号");
      return false;
    }
    if (param.provinceld == "") {
      app.msg("请选择地址");
      return false;
    }
    if (param.address == "") {
      app.msg("请输入详细地址");
      return false;
    }
    $.get(app.data.domain + `/api/ec/userAddress/${this.data.formData.id ? 'update' :'insert'}`, this.data.formData, "POST", false, false, {
      "content-type": "application/x-www-form-urlencoded"
    }).then(res => {
      if (res.code == 200) {
        wx.navigateBack({
          delta: 1
        })
      }
      wx.hideLoading();
    })
  },
  // 获取编辑信息
  getEditData() {
    $.get(app.data.domain + '/api/ec/userAddress/detail', { id: this.data.id }, "GET").then(res => {
      if (res.code == 200) {
         this.setData({
           formData:res.data,
           region: [res.data.province, res.data.city, res.data.area]
         })
      }
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