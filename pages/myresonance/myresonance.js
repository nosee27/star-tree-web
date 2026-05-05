Page({
  data: {
    resonances: [
      {
        id: 1,
        author: '🌸 流浪的星球#2847',
        content: '今天工作压力好大，感觉快要喘不过气了...\n但是还是要坚持下去 💪',
        time: '2026-03-10 15:30',
        tags: ['焦虑', '工作压力', '坚持'],
        likes: 234,
        comments: 45,
        resonance: 123,
        images: []
      },
      {
        id: 2,
        author: '🍃 安静的星球#1092',
        content: '终于完成了这个项目！感谢团队的支持~',
        time: '2026-03-09 10:15',
        tags: ['开心', '成就感', '感恩'],
        likes: 567,
        comments: 89,
        resonance: 345,
        images: []
      },
      {
        id: 3,
        author: '🌙 深夜星球#5678',
        content: '深夜总是让人思考很多，今天想了很多关于未来的事情...',
        time: '2026-03-08 23:45',
        tags: ['思考', '未来', '深夜'],
        likes: 123,
        comments: 23,
        resonance: 67,
        images: []
      }
    ]
  },
  
  onLoad() {
    console.log('我的共鸣页面加载');
  },
  
  // 返回上一页
  goBack() {
    wx.navigateBack();
  },
  
  // 去首页浏览
  goToHome() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },
  
  // 查看原文
  viewOriginal(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '查看原文功能开发中',
      icon: 'none'
    });
  },
  
  // 取消共鸣
  removeResonance(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '取消共鸣',
      content: '确定要取消对这条内容的共鸣吗？',
      success: (res) => {
        if (res.confirm) {
          // 模拟取消共鸣
          const newResonances = this.data.resonances.filter(resonance => resonance.id !== id);
          this.setData({
            resonances: newResonances
          });
          wx.showToast({
            title: '取消共鸣成功',
            icon: 'success'
          });
        }
      }
    });
  }
})