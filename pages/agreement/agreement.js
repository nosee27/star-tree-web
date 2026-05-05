Page({
  data: {
    // 页面数据
  },

  onLoad() {
    console.log('用户协议页面加载');
  },

  // 返回上一页
  goBack() {
    wx.navigateBack();
  }
});