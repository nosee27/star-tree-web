Page({
  data: {
    // 页面数据
  },

  onLoad() {
    console.log('隐私政策页面加载');
  },

  // 返回上一页
  goBack() {
    wx.navigateBack();
  }
});