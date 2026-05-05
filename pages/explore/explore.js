Page({
  data: {
    // 探索次数
    exploreCount: 7,
    maxExploreCount: 10,
    // 信号次数
    signalCount: 2,
    maxSignalCount: 3,
    // 评论相关
    showCommentModal: false,
    currentPlanetId: null,
    commentContent: '',
    // 最近探索列表
    recentExplores: [
      {
        id: 1,
        author: '🪐 匿名用户#****',
        time: '2小时前',
        status: '状态：连接中',
        type: '📝 倾诉星球',
        info: '已连接 2 次，收到回复 1 条',
        content: '今天心情很糟糕，工作压力太大了，感觉快要坚持不下去了...',
        likes: 12,
        comments: 3,
        commentList: [
          {
            id: 301,
            author: '🪐 匿名用户#1234',
            time: '1小时前',
            content: '我能理解你的感受，我也经历过这样的时期。'
          },
          {
            id: 302,
            author: '🪐 匿名用户#5678',
            time: '30分钟前',
            content: '坚持住，明天会更好的！'
          }
        ]
      }
    ]
  },
  
  onLoad() {
    console.log('探索页面加载');
  },
  
  // 探索新星球
  explorePlanet() {
    // 检查探索次数
    if (this.data.exploreCount <= 0) {
      wx.showToast({
        title: '今日探索次数已用完',
        icon: 'none'
      });
      return;
    }
    
    wx.showToast({
      title: '探索中...',
      icon: 'loading'
    });
    
    setTimeout(() => {
      // 减少探索次数
      const newExploreCount = this.data.exploreCount - 1;
      
      // 随机生成星球类型和内容
      const planetTypes = [
        '📝 倾诉星球',
        '💚 共鸣星球',
        '🌟 祝福星球',
        '❓ 问答星球',
        '🌳 树洞的星球'
      ];
      
      const planetContents = [
        '今天心情很糟糕，工作压力太大了，感觉快要坚持不下去了...',
        '最近总是失眠，不知道该怎么办，有什么好的建议吗？',
        '今天收到了一个好消息，感觉整个人都充满了动力！',
        '想找个人聊聊心事，感觉有些话不知道该跟谁说...',
        '最近遇到了一些困难，但是我相信自己能够克服！'
      ];
      
      const randomType = planetTypes[Math.floor(Math.random() * planetTypes.length)];
      const randomContent = planetContents[Math.floor(Math.random() * planetContents.length)];
      
      // 添加到最近探索
      const newExplore = {
        id: Date.now(),
        author: '🪐 匿名用户#****',
        time: '刚刚',
        status: '状态：连接中',
        type: randomType,
        info: '已连接 1 次，收到回复 0 条',
        content: randomContent,
        likes: 0,
        comments: 0
      };
      
      this.setData({
        recentExplores: [newExplore, ...this.data.recentExplores],
        exploreCount: newExploreCount
      });
      
      // 显示探索成功弹窗
      wx.showModal({
        title: '探索成功！',
        content: `发现了一颗新的${randomType}\n\n${randomContent}`,
        confirmText: '查看详情',
        cancelText: '关闭',
        success: (res) => {
          if (res.confirm) {
            // 跳转到星球详情页
            wx.navigateTo({
              url: '/pages/planet-detail/planet-detail',
              success: function(res) {
                // 传递星球数据
                res.eventChannel.emit('acceptDataFromOpenerPage', {
                  planet: newExplore
                })
              }
            })
          }
        }
      });
    }, 1500);
  },
  
  // 发信号
  sendSignal() {
    // 检查信号次数
    if (this.data.signalCount <= 0) {
      wx.showToast({
        title: '今日信号次数已用完',
        icon: 'none'
      });
      return;
    }
    
    wx.showModal({
      title: '发送信号',
      content: '',
      placeholderText: '写下你的信号内容...',
      confirmText: '发送',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 减少信号次数
          const newSignalCount = this.data.signalCount - 1;
          this.setData({
            signalCount: newSignalCount
          });
          
          wx.showToast({
            title: '信号发送成功',
            icon: 'success'
          });
        }
      }
    });
  },
  
  // 我的星球
  myPlanets() {
    wx.navigateTo({
      url: '/pages/myplanets/myplanets'
    });
  },
  
  // 成就
  achievements() {
    wx.navigateTo({
      url: '/pages/achievements/achievements'
    });
  },
  
  // 筛选标签点击
  handleFilterTag(e) {
    // 这里可以添加筛选逻辑
    console.log('筛选标签点击:', e.currentTarget.dataset.tag);
  },
  
  // 点赞星球
  likePlanet(e) {
    const id = e.currentTarget.dataset.id;
    const newExplores = this.data.recentExplores.map(item => {
      if (item.id === id) {
        return {
          ...item,
          likes: item.likes + 1
        };
      }
      return item;
    });
    
    this.setData({
      recentExplores: newExplores
    });
    
    wx.showToast({
      title: '点赞成功',
      icon: 'success'
    });
  },
  
  // 评论星球
  commentPlanet(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({
      showCommentModal: true,
      currentPlanetId: id,
      commentContent: ''
    });
  },
  
  // 绑定评论输入
  bindCommentInput(e) {
    this.setData({
      commentContent: e.detail.value
    });
  },
  
  // 关闭评论模态框
  closeCommentModal() {
    this.setData({
      showCommentModal: false,
      currentPlanetId: null,
      commentContent: ''
    });
  },
  
  // 提交评论
  submitComment() {
    if (!this.data.commentContent) {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      });
      return;
    }
    
    const id = this.data.currentPlanetId;
    // 模拟评论成功
    const newExplores = this.data.recentExplores.map(item => {
      if (item.id === id) {
        // 创建新评论
        const newComment = {
          id: Date.now() + Math.random(),
          author: '🪐 我的星球#' + Math.floor(Math.random() * 9999),
          time: '刚刚',
          content: this.data.commentContent
        };
        
        return {
          ...item,
          comments: item.comments + 1,
          commentList: [newComment, ...(item.commentList || [])]
        };
      }
      return item;
    });
    
    this.setData({
      recentExplores: newExplores,
      showCommentModal: false,
      currentPlanetId: null,
      commentContent: ''
    });
    
    wx.showToast({
      title: '评论成功',
      icon: 'success'
    });
  },
  

})