Page({
  data: {
    message: ''
  },

  onLoad() {
    console.log('联系我们页面加载');
  },

  // 返回上一页
  goBack() {
    wx.navigateBack();
  },

  // 拨打电话
  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: '19506146511',
      success: function() {
        console.log('拨打电话成功');
      },
      fail: function() {
        console.log('拨打电话失败');
      }
    });
  },

  // 发送邮件
  sendEmail() {
    wx.setClipboardData({
      data: '2309129591@qq.com',
      success: function() {
        wx.showToast({
          title: '邮箱已复制到剪贴板',
          icon: 'success'
        });
      }
    });
  },

  // 绑定留言输入
  bindMessageInput(e) {
    this.setData({
      message: e.detail.value
    });
  },

  // 提交留言
  sendMessage() {
    if (!this.data.message) {
      wx.showToast({
        title: '请输入留言内容',
        icon: 'none'
      });
      return;
    }

    // 模拟提交留言
    wx.showToast({
      title: '留言提交中...',
      icon: 'loading'
    });

    setTimeout(() => {
      wx.showToast({
        title: '留言提交成功',
        icon: 'success'
      });

      // 清空留言
      this.setData({
        message: ''
      });
    }, 1500);
  }
});