Page({
  data: {
    // 页面数据
  },

  // 导航到情绪报告页面
  navigateToReport: function() {
    wx.navigateTo({
      url: '/pages/report/report'
    })
  },

  // 导航到我的星球页面
  navigateToMyPlanets: function() {
    wx.navigateTo({
      url: '/pages/myplanets/myplanets'
    })
  },

  // 导航到我的树洞页面
  navigateToMyTreehole: function() {
    // 这里可以导航到我的树洞页面，目前暂未实现
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  },

  // 导航到成就徽章页面
  navigateToAchievements: function() {
    wx.navigateTo({
      url: '/pages/achievements/achievements'
    })
  },

  // 切换夜间模式
  toggleNightMode: function() {
    // 这里可以实现夜间模式的切换逻辑
    wx.showToast({
      title: '夜间模式已切换',
      icon: 'success'
    })
  },

  // 导航到心理援助资源页面（跳转到豆包）
  navigateToResources: function() {
    wx.navigateTo({
      url: '/pages/webview/webview?url=' + encodeURIComponent('https://www.doubao.com')
    });
  },

  // 导航到用户协议和隐私政策页面
  navigateToTerms: function() {
    wx.navigateTo({
      url: '/pages/agreement/agreement'
    })
  },

  // 导航到我的发布页面
  navigateToMyPosts: function() {
    wx.navigateTo({
      url: '/pages/myposts/myposts'
    })
  },

  // 导航到我的共鸣页面
  navigateToMyResonance: function() {
    wx.navigateTo({
      url: '/pages/myresonance/myresonance'
    })
  },

  // 退出登录
  logout: function() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: function(res) {
        if (res.confirm) {
          // 这里可以实现退出登录的逻辑
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  }
})