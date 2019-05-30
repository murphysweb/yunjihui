// miniprogram/pages/createsend/createsend.js
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
    title: "",
    text: "",
    ColorList: [{
        title: '20',
        name: 'red',
        color: '#e54d42'
      },
      {
        title: '40',
        name: 'orange',
        color: '#f37b1d'
      },
      {
        title: '60',
        name: 'yellow',
        color: '#fbbd08'
      },
      {
        title: '80',
        name: 'olive',
        color: '#8dc63f'
      },
      {
        title: '100',
        name: 'green',
        color: '#39b54a'
      }
    ],
    point: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  // 标题输入
  titleinput(e) {
    this.setData({
      title: e.detail.value
    })
  },
  // 文案输入
  textinput(e) {
    this.setData({
      text: e.detail.value
    })
  },
  // 发布
  publish() {
    let that = this;
    let params = {
      "catId": "9c0727005ccc11e9a7360242ac110002",
      "point": that.data.point,
      "name": this.data.title,
      "detail": this.data.text
    }
    if (params.name == "") {
      app.msg("请输入标题");
      return false;
    }
    if (params.detail == "") {
      app.msg("请输入配送详情");
      return false;
    }
    if (params.point == "") {
      app.msg("请选择悬赏积分");
      return false;
    }
    $.get(app.data.domain + '/api/task/task/insert', params, "POST", false, false, {
      "content-type": "application/x-www-form-urlencoded"
    }).then(res => {
      if (res.code == 200) {
        wx.reLaunch({
          url: '../send/send'
        })
      } else {
        app.login(() => {
          this.publish();
        });
      }
      wx.hideLoading();
    }).catch(err) 
    {
      wx.hideLoading();
    }
  },
  // 积分选择
  pointtap(e) {
    let num = e.currentTarget.dataset.num;
    this.setData({
      point: +num
    })
  }
})