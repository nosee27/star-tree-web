Page({
  data: {
    selectedType: 'all',
    messages: [
      {
        id: 1,
        type: '星球回复',
        typeIcon: '🪐',
        author: '匿名用户#**** 回复了你的星球',
        content: '"抱抱你，我在这里陪你~"',
        time: '10分钟前',
        showReply: true
      },
      {
        id: 2,
        type: '共鸣',
        typeIcon: '❤️',
        author: '匿名用户#**** 与你的情绪产生了共鸣',
        content: '"我也经历过类似的事情，一起加油！"',
        time: '1小时前',
        showReply: true
      },
      {
        id: 3,
        type: '系统通知',
        typeIcon: '📢',
        author: '',
        content: '你的每日情绪报告已生成，点击查看~',
        time: '今天 08:00',
        showReply: false
      },
      {
        id: 4,
        type: '关怀提醒',
        typeIcon: '🚨',
        author: '',
        content: '注意到你最近情绪较低落，这里有心理援助资源...',
        time: '昨天 22:00',
        showReply: false
      }
    ]
  },
  
  onLoad() {
    console.log('消息中心页面加载');
  },
  
  // 选择消息类型
  selectType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      selectedType: type
    });
    
    // 这里可以根据类型筛选消息
    console.log('选择消息类型:', type);
  },
  
  // 查看消息
  viewMessage(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '查看消息功能开发中',
      icon: 'none'
    });
  },
  
  // 回复消息
  replyMessage(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '回复消息功能开发中',
      icon: 'none'
    });
  },
  
  // 清空消息
  clearMessages() {
    wx.showModal({
      title: '清空消息',
      content: '确定要清空所有消息吗？',
      success: res => {
        if (res.confirm) {
          this.setData({
            messages: []
          });
          wx.showToast({
            title: '消息已清空',
            icon: 'success'
          });
        }
      }
    });
  }
})