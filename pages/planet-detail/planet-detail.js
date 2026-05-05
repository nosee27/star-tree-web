Page({
  data: {
    planetInfo: {
      id: '',
      author: '',
      time: '',
      status: '',
      type: '',
      info: '',
      content: '',
      likes: 0,
      comments: 0,
      shares: 0
    },
    comments: [],
    commentContent: ''
  },

  onLoad(options) {
    console.log('星球详情页面加载', options);
    
    // 获取eventChannel
    const eventChannel = this.getOpenerEventChannel();
    
    // 监听来自上一个页面的数据
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      console.log('接收星球数据:', data);
      this.setData({
        planetInfo: data.planet
      });
    });
  },

  // 返回上一页
  goBack() {
    wx.navigateBack();
  },

  // 点赞星球
  likePlanet() {
    const updatedPlanetInfo = {
      ...this.data.planetInfo,
      likes: this.data.planetInfo.likes + 1
    };
    this.setData({
      planetInfo: updatedPlanetInfo
    });
    wx.showToast({
      title: '点赞成功',
      icon: 'success'
    });
  },

  // 评论星球
  commentPlanet() {
    // 这里可以打开评论输入框或跳转到评论页面
    wx.showToast({
      title: '评论功能已打开',
      icon: 'success'
    });
  },

  // 分享星球
  sharePlanet() {
    const updatedPlanetInfo = {
      ...this.data.planetInfo,
      shares: (this.data.planetInfo.shares || 0) + 1
    };
    this.setData({
      planetInfo: updatedPlanetInfo
    });
    wx.showToast({
      title: '分享成功',
      icon: 'success'
    });
  },

  // 绑定评论输入
  bindCommentInput(e) {
    this.setData({
      commentContent: e.detail.value
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

    const newComment = {
      id: Date.now(),
      author: '🪐 我的星球#' + Math.floor(Math.random() * 9999),
      time: '刚刚',
      content: this.data.commentContent
    };

    const updatedComments = [newComment, ...this.data.comments];
    const updatedPlanetInfo = {
      ...this.data.planetInfo,
      comments: this.data.planetInfo.comments + 1
    };

    this.setData({
      comments: updatedComments,
      planetInfo: updatedPlanetInfo,
      commentContent: ''
    });

    wx.showToast({
      title: '评论发布成功',
      icon: 'success'
    });
  }
});