// miniprogram/pages/tiebapublish/addtiezi.js
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
    images: [],
    text: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url: app.data.domain
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

  },
  // 上传图片
  upload() {
    let that = this;
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        if (res.tempFiles[0].size > 5242880) {
          app.msg("图片过大");
          return false;
        }
        wx.showLoading({
          title: '上传中...',
        })
        wx.uploadFile({
          url: app.data.domain + "/api/upload/uploadAndCompressImage?maxK=1000", // 仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {},
          success(res) {
            let img = JSON.parse(res.data).data.attachmentUrl;
            that.data.images.push(img);
            that.setData({
              images: that.data.images
            })
          },
          complete(res) {
            wx.hideLoading();
          }
        })
      }
    })
  },
  // 文案输入
  textinput(e) {
    this.setData({
      text: e.detail.value
    })
  },
  // 发表
  publish() {
    let that = this;
    let params = {
      "catId": "44036b31401511e9a8bd0242ac110003",
      "title": "帖子",
      "image": this.data.images[0],
      "content": this.data.text
    }
    if (params.content != '' || !!params.image) {

    } else {
      app.msg("帖子内容不能为空~");
      return false;
    }
    $.get(app.data.domain + '/api/cms/cmsContent/publish', params, "POST", false, false, {
      "content-type": "application/x-www-form-urlencoded"
    }).then(res => {
      if (res.code == 200) {
        wx.reLaunch({
          url: '../tieba/tieba'
        })
      } else {
        app.login(() => {
          this.publish();
        });
      }
      wx.hideLoading();
    })
  }
})