Page({
  data: {
    planetName: '',
    phone: '',
    verificationCode: '',
    countdown: 0
  },
  
  onLoad() {
    console.log('注册页面加载');
  },
  
  // 绑定星球名称输入
  bindPlanetNameInput(e) {
    this.setData({
      planetName: e.detail.value
    });
  },
  
  // 绑定手机号输入
  bindPhoneInput(e) {
    this.setData({
      phone: e.detail.value
    });
  },
  
  // 绑定验证码输入
  bindVerificationCodeInput(e) {
    this.setData({
      verificationCode: e.detail.value
    });
  },
  
  // 获取验证码
  getVerificationCode() {
    if (!this.data.phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return;
    }
    
    if (!/^1[3-9]\d{9}$/.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return;
    }
    
    // 开始倒计时
    this.setData({
      countdown: 60
    });
    
    const timer = setInterval(() => {
      this.setData({
        countdown: this.data.countdown - 1
      });
      
      if (this.data.countdown <= 0) {
        clearInterval(timer);
      }
    }, 1000);
    
    // 模拟发送验证码
    wx.showToast({
      title: '验证码已发送',
      icon: 'success'
    });
  },
  
  // 下一步
  nextStep() {
    if (!this.data.planetName) {
      wx.showToast({
        title: '请输入星球名称',
        icon: 'none'
      });
      return;
    }
    
    if (!this.data.phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return;
    }
    
    if (!/^1[3-9]\d{9}$/.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return;
    }
    
    if (!this.data.verificationCode) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      });
      return;
    }
    
    if (this.data.verificationCode.length !== 6) {
      wx.showToast({
        title: '请输入6位验证码',
        icon: 'none'
      });
      return;
    }
    
    // 模拟验证
    wx.showToast({
      title: '验证中...',
      icon: 'loading'
    });
    
    setTimeout(() => {
      wx.showToast({
        title: '验证成功',
        icon: 'success'
      });
      
      // 跳转到下一步
      // 这里可以根据实际情况跳转到第二步注册页面
      wx.switchTab({
        url: '/pages/index/index'
      });
    }, 1500);
  },
  
  // 跳转到登录页面
  navigateToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },
  
  // 显示用户协议
  showUserAgreement() {
    wx.showToast({
      title: '用户协议功能开发中',
      icon: 'none'
    });
  },
  
  // 显示隐私政策
  showPrivacyPolicy() {
    wx.showToast({
      title: '隐私政策功能开发中',
      icon: 'none'
    });
  }
})