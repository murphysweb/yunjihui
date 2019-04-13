const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    iconList: [{
      img: 'http://gw.alicdn.com/tps/i2/TB19BluIVXXXXX6XpXXN4ls0XXX-183-129.png?imgtag=avatar',
      name: 'VR'
    }, {
      img: 'http://gw.alicdn.com/tps/TB1FDOHLVXXXXcZXFXXXXXXXXXX-183-129.png?imgtag=avatar',
      name: '录像'
    }, {
      img: 'http://gw.alicdn.com/tps/TB1PlmNLVXXXXXEXFXXXXXXXXXX-183-129.png?imgtag=avatar',
      name: '图像'
    }, {
      img: 'http://gw.alicdn.com/tps/TB1RN0HMFXXXXXNXpXXXXXXXXXX-183-129.png?imgtag=avatar',
      name: '通知'
    }, {
      img: 'http://gw.alicdn.com/tps/TB1exaOLVXXXXXeXFXXXXXXXXXX-183-129.png?imgtag=avatar',
      name: '排行榜'
    }, {
      img: 'http://img.alicdn.com/tps/TB1GzMJLXXXXXXoXXXXXXXXXXXX-183-129.png',
      name: '皮肤'
    }, {
      img: 'http://gw.alicdn.com/tps/i3/TB1Ewu2KVXXXXXkapXXN4ls0XXX-183-129.png',
      name: '发现'
    }, {
      img: 'http://gw.alicdn.com/tps/TB1cniBJpXXXXataXXXXXXXXXXX-183-129.png?imgtag=avatar',
      name: '帮助'
    }, {
      img: 'http://img.alicdn.com/tps/TB1caopLVXXXXaDaXXXXXXXXXXX-183-129.png',
      name: '问答'
    }],
    cardCur: 0,
    tower: [{
      id: 0,
      url: 'https://image.weilanwl.com/img/4x3-1.jpg'
    }, {
      id: 1,
      url: 'https://image.weilanwl.com/img/4x3-2.jpg'
    }, {
      id: 2,
      url: 'https://image.weilanwl.com/img/4x3-3.jpg'
    }, {
      id: 3,
      url: 'https://image.weilanwl.com/img/4x3-4.jpg'
    }, {
      id: 4,
      url: 'https://image.weilanwl.com/img/4x3-2.jpg'
    }, {
      id: 5,
      url: 'https://image.weilanwl.com/img/4x3-4.jpg'
    }, {
      id: 6,
      url: 'https://image.weilanwl.com/img/4x3-2.jpg'
    }],
    TabCur: 0,
    scrollLeft: 0
  },
  onLoad() {
    // this.towerSwiper('tower');
    // 初始化towerSwiper 传已有的数组名即可
  }
})