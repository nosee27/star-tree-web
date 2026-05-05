Page({
  data: {
    searchKeyword: '',
    helpItems: [
      {
        id: 1,
        question: '如何注册账号？',
        answer: '您可以通过手机号或邮箱注册树洞的星球账号。在登录页面点击"注册"按钮，输入您的手机号或邮箱，获取验证码，设置密码后即可完成注册。',
        showAnswer: false
      },
      {
        id: 2,
        question: '忘记密码怎么办？',
        answer: '在登录页面点击"忘记密码？"链接，输入您的手机号或邮箱，获取验证码，然后设置新密码即可重置密码。',
        showAnswer: false
      },
      {
        id: 3,
        question: '如何发布内容？',
        answer: '在首页点击"发布"按钮，输入您的内容，选择情绪标签，添加图片（可选），然后点击"发布"即可。',
        showAnswer: false
      },
      {
        id: 4,
        question: '如何探索星球？',
        answer: '在探索页面点击"探索一颗新星球"按钮，系统会随机为您匹配一个星球。每天有一定的探索次数限制。',
        showAnswer: false
      },
      {
        id: 5,
        question: '如何发送信号？',
        answer: '在探索页面点击"发信号"按钮，输入您的信号内容，然后点击"发送"即可。每天有一定的信号发送次数限制。',
        showAnswer: false
      },
      {
        id: 6,
        question: '如何查看我的星球？',
        answer: '在个人中心页面点击"我的星球"链接，即可查看您已连接的星球。',
        showAnswer: false
      },
      {
        id: 7,
        question: '如何查看我的成就徽章？',
        answer: '在个人中心页面点击"成就徽章"链接，即可查看您已获得的成就徽章和未获得的成就。',
        showAnswer: false
      },
      {
        id: 8,
        question: '如何联系客服？',
        answer: '在帮助中心页面点击"联系客服"按钮，或在登录页面底部点击"联系我们"链接，即可查看联系信息。',
        showAnswer: false
      }
    ]
  },

  onLoad() {
    console.log('帮助中心页面加载');
  },

  // 返回上一页
  goBack() {
    wx.navigateBack();
  },

  // 绑定搜索输入
  bindSearchInput(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
    // 这里可以添加搜索逻辑
  },

  // 切换答案显示/隐藏
  toggleAnswer(e) {
    const id = e.currentTarget.dataset.id;
    const updatedHelpItems = this.data.helpItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          showAnswer: !item.showAnswer
        };
      }
      return item;
    });
    this.setData({
      helpItems: updatedHelpItems
    });
  },

  // 跳转到联系我们页面
  goToContact() {
    wx.navigateTo({
      url: '/pages/contact/contact'
    });
  }
});