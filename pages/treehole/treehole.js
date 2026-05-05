Page({
  data: {
    content: '',
    leaves: [],
    messages: [],
    showHistory: false
  },
  
  onLoad() {
    console.log('树洞页面加载');
  },
  
  // 绑定文本域输入
  bindTextAreaInput(e) {
    this.setData({
      content: e.detail.value
    });
  },
  
  // 发布心事
  publish() {
    if (!this.data.content) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      });
      return;
    }
    
    // 模拟发布
    wx.showToast({
      title: '发布中...',
      icon: 'loading'
    });
    
    setTimeout(() => {
      wx.showToast({
        title: '发布成功',
        icon: 'success'
      });
      
      // 增加叶子数量，最多999片
      let newLeaves = [...this.data.leaves];
      if (newLeaves.length < 999) {
        newLeaves.push({id: Date.now() + Math.random()});
      }
      
      // 添加消息到历史记录
      const newMessage = {
        id: Date.now() + Math.random(),
        content: this.data.content,
        time: new Date().toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      
      let newMessages = [newMessage, ...this.data.messages];
      
      // 清空输入并更新叶子和消息
      this.setData({
        content: '',
        leaves: newLeaves,
        messages: newMessages
      });
    }, 1500);
  },
  
  // 切换历史消息显示
  toggleHistory() {
    this.setData({
      showHistory: !this.data.showHistory
    });
  },
  
  // 删除历史消息
  deleteMessage(e) {
    const id = e.currentTarget.dataset.id;
    const newMessages = this.data.messages.filter(msg => msg.id !== id);
    this.setData({
      messages: newMessages
    });
    wx.showToast({
      title: '消息已删除',
      icon: 'success'
    });
  }
})