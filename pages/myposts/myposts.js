Page({
  data: {
    posts: [
      {
        id: 1,
        content: '今天工作压力好大，感觉快要喘不过气了...\n但是还是要坚持下去 💪',
        time: '2026-03-10 15:30',
        visibility: '🌍 公开',
        tags: ['焦虑', '工作压力', '坚持'],
        likes: 234,
        comments: 45,
        resonance: 123,
        images: []
      },
      {
        id: 2,
        content: '终于完成了这个项目！感谢团队的支持~',
        time: '2026-03-09 10:15',
        visibility: '🌍 公开',
        tags: ['开心', '成就感', '感恩'],
        likes: 567,
        comments: 89,
        resonance: 345,
        images: []
      },
      {
        id: 3,
        content: '深夜总是让人思考很多，今天想了很多关于未来的事情...',
        time: '2026-03-08 23:45',
        visibility: '🌍 公开',
        tags: ['思考', '未来', '深夜'],
        likes: 123,
        comments: 23,
        resonance: 67,
        images: []
      }
    ]
  },
  
  onLoad() {
    console.log('我的发布页面加载');
  },
  
  // 返回上一页
  goBack() {
    wx.navigateBack();
  },
  
  // 去首页发布
  goToHome() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },
  
  // 编辑发布
  editPost(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '编辑功能开发中',
      icon: 'none'
    });
  },
  
  // 删除发布
  deletePost(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '删除发布',
      content: '确定要删除这条发布吗？',
      success: (res) => {
        if (res.confirm) {
          // 模拟删除
          const newPosts = this.data.posts.filter(post => post.id !== id);
          this.setData({
            posts: newPosts
          });
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  }
})