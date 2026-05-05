Page({
  data: {
    // 页面数据
  },

  onLoad: function(options) {
    // 页面加载时的初始化
  },

  // 可以添加更多功能，如刷新报告、导出报告等
  refreshReport: function() {
    wx.showToast({
      title: '报告已更新',
      icon: 'success'
    })
  },

  // 导出报告
  exportReport: function() {
    wx.showToast({
      title: '报告导出功能开发中',
      icon: 'none'
    })
  }
})