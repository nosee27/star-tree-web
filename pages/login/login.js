Page({
  data: {
    activeTab: 'login',
    rememberMe: false,
    account: '',
    verificationCode: '',
    registerAccount: '',
    registerPassword: '',
    registerVerificationCode: ''
  },
  
  onLoad() {
    console.log('登录页面加载');
  },
  
  // 切换到登录标签
  switchToLogin() {
    this.setData({
      activeTab: 'login'
    });
  },
  
  // 切换到注册标签
  switchToRegister() {
    this.setData({
      activeTab: 'register'
    });
  },
  
  // 绑定账号输入
  bindAccountInput(e) {
    this.setData({
      account: e.detail.value
    });
  },
  

  
  // 绑定注册账号输入
  bindRegisterAccountInput(e) {
    this.setData({
      registerAccount: e.detail.value
    });
  },
  
  // 绑定验证码输入
  bindVerificationCodeInput(e) {
    this.setData({
      verificationCode: e.detail.value
    });
  },
  
  // 绑定注册验证码输入
  bindRegisterVerificationCodeInput(e) {
    this.setData({
      registerVerificationCode: e.detail.value
    });
  },
  
  // 获取登录验证码
  getLoginVerificationCode() {
    if (!this.data.account) {
      wx.showToast({
        title: '请输入账号',
        icon: 'none'
      });
      return;
    }
    
    // 验证账号格式
    if (!this.validateAccount(this.data.account)) {
      wx.showToast({
        title: '请输入正确的手机号或邮箱',
        icon: 'none'
      });
      return;
    }
    
    // 模拟获取验证码
    wx.showToast({
      title: '验证码已发送',
      icon: 'success'
    });
  },

  // 绑定注册密码输入
  bindRegisterPasswordInput(e) {
    this.setData({
      registerPassword: e.detail.value
    });
  },
  
  // 记住我 checkbox 绑定
  bindRememberMe(e) {
    this.setData({
      rememberMe: e.detail.value.includes('remember')
    });
  },
  
  // 验证账号格式
  validateAccount(account) {
    // 手机号格式验证
    const phoneRegex = /^1[3-9]\d{9}$/;
    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (phoneRegex.test(account)) {
      return true; // 手机号格式正确
    } else if (emailRegex.test(account)) {
      return true; // 邮箱格式正确
    } else {
      return false; // 格式不正确
    }
  },

  // 登录
  login() {
    if (!this.data.account) {
      wx.showToast({
        title: '请输入账号',
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
    
    // 验证账号格式
    if (!this.validateAccount(this.data.account)) {
      wx.showToast({
        title: '请输入正确的手机号或邮箱',
        icon: 'none'
      });
      return;
    }
    
    // 模拟登录
    wx.showToast({
      title: '登录中...',
      icon: 'loading'
    });
    
    setTimeout(() => {
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      });
      
      // 登录成功后跳转到首页
      wx.switchTab({
        url: '/pages/index/index'
      });
    }, 1500);
  },
  
  // 注册
  register() {
    if (!this.data.registerAccount) {
      wx.showToast({
        title: '请输入账号',
        icon: 'none'
      });
      return;
    }
    
    // 验证账号格式
    if (!this.validateAccount(this.data.registerAccount)) {
      wx.showToast({
        title: '请输入正确的手机号或邮箱',
        icon: 'none'
      });
      return;
    }
    
    if (!this.data.registerVerificationCode) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      });
      return;
    }
    
    if (!this.data.registerPassword) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      });
      return;
    }
    
    // 验证密码长度
    if (this.data.registerPassword.length < 8) {
      wx.showToast({
        title: '密码长度至少8位',
        icon: 'none'
      });
      return;
    }
    
    // 模拟注册
    wx.showToast({
      title: '注册中...',
      icon: 'loading'
    });
    
    setTimeout(() => {
      wx.showToast({
        title: '注册成功',
        icon: 'success'
      });
      
      // 注册成功后切换到登录标签
      this.setData({
        activeTab: 'login'
      });
    }, 1500);
  },
  
  // 获取验证码
  getVerificationCode() {
    if (!this.data.registerAccount) {
      wx.showToast({
        title: '请输入账号',
        icon: 'none'
      });
      return;
    }
    
    // 验证账号格式
    if (!this.validateAccount(this.data.registerAccount)) {
      wx.showToast({
        title: '请输入正确的手机号或邮箱',
        icon: 'none'
      });
      return;
    }
    
    // 模拟获取验证码
    wx.showToast({
      title: '验证码已发送',
      icon: 'success'
    });
  },
  

  
  // 第三方登录
  loginWithWechat() {
    wx.showToast({
      title: '正在登录...',
      icon: 'loading'
    });
    
    // 调用微信登录API
    wx.login({
      success: (res) => {
        if (res.code) {
          // 这里可以将code发送到后端服务器进行验证
          console.log('微信登录code:', res.code);
          
          // 模拟登录成功
          setTimeout(() => {
            wx.showToast({
              title: '登录成功',
              icon: 'success'
            });
            
            // 登录成功后跳转到首页
            wx.switchTab({
              url: '/pages/index/index'
            });
          }, 1500);
        } else {
          console.log('登录失败:', res.errMsg);
          wx.showToast({
            title: '登录失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.log('登录失败:', err);
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        });
      }
    });
  },

  // 第三方注册
  registerWithWechat() {
    wx.showToast({
      title: '正在注册...',
      icon: 'loading'
    });
    
    // 调用微信登录API
    wx.login({
      success: (res) => {
        if (res.code) {
          // 这里可以将code发送到后端服务器进行验证和注册
          console.log('微信注册code:', res.code);
          
          // 模拟注册成功
          setTimeout(() => {
            wx.showToast({
              title: '注册成功',
              icon: 'success'
            });
            
            // 注册成功后跳转到首页
            wx.switchTab({
              url: '/pages/index/index'
            });
          }, 1500);
        } else {
          console.log('注册失败:', res.errMsg);
          wx.showToast({
            title: '注册失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.log('注册失败:', err);
        wx.showToast({
          title: '注册失败',
          icon: 'none'
        });
      }
    });
  },
  

  
  // 显示用户协议
  showUserAgreement() {
    wx.navigateTo({
      url: '/pages/agreement/agreement'
    });
  },
  
  // 显示隐私政策
  showPrivacyPolicy() {
    wx.navigateTo({
      url: '/pages/privacy/privacy'
    });
  },
  
  // 显示联系我们
  showContact() {
    wx.navigateTo({
      url: '/pages/contact/contact'
    });
  },
  
  // 显示帮助中心
  showHelp() {
    wx.navigateTo({
      url: '/pages/help/help'
    });
  },
  
  // 跳转到注册页面
  navigateToRegister() {
    wx.navigateTo({
      url: '/pages/register/register'
    });
  }
})