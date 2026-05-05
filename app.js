App({
  onLaunch() {
    // 初始化登录状态
    this.checkLoginStatus();
    
    // 初始化云开发
    if (wx.cloud) {
      wx.cloud.init({
        env: 'your-cloud-env-id',
        traceUser: true
      });
    }
  },
  
  checkLoginStatus() {
    // 检查登录状态
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已授权，获取用户信息
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo;
            }
          });
        }
      }
    });
  },
  
  globalData: {
    userInfo: null,
    emotionData: []
  }
})