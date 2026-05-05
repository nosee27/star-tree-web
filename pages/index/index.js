Page({
  data: {
    // 发布内容
    publishContent: '',
    selectedEmotion: '',
    selectedImages: [],
    // 搜索相关
    searchKeyword: '',
    originalContentList: [],
    // 评论相关
    showCommentModal: false,
    currentPostId: null,
    commentContent: '',
    // 内容列表
    contentList: [
      {
        id: 1,
        author: '🌸 流浪的星球#2847',
        time: '2小时前',
        visibility: '🌍 公开',
        content: '今天工作压力好大，感觉快要喘不过气了...\n但是还是要坚持下去 💪',
        tags: ['焦虑', '工作压力', '坚持'],
        likes: 234,
        comments: 45,
        shares: 12,
        commentList: [
          {
            id: 101,
            author: '🪐 匿名用户#1234',
            time: '1小时前',
            content: '我也有同样的感受，一起加油！'
          },
          {
            id: 102,
            author: '🪐 匿名用户#5678',
            time: '30分钟前',
            content: '相信自己，一切都会好起来的！'
          }
        ]
      },
      {
        id: 2,
        author: '🍃 安静的星球#1092',
        time: '3小时前',
        visibility: '🌍 公开',
        content: '终于完成了这个项目！感谢团队的支持~',
        tags: ['开心', '成就感', '感恩'],
        likes: 567,
        comments: 89,
        shares: 34,
        commentList: [
          {
            id: 201,
            author: '🪐 匿名用户#9876',
            time: '2小时前',
            content: '恭喜你！你的努力终于有了回报。'
          },
          {
            id: 202,
            author: '🪐 匿名用户#4321',
            time: '1小时前',
            content: '团队合作的力量是无穷的！'
          }
        ]
      }
    ]
  },
  
  onLoad() {
    // 页面加载时执行
    console.log('首页加载');
    // 初始化原始内容列表
    this.setData({
      originalContentList: [...this.data.contentList]
    });
  },
  
  // 绑定发布输入
  bindPublishInput(e) {
    this.setData({
      publishContent: e.detail.value
    });
  },

  // 绑定搜索输入
  bindSearchInput(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
  },

  // 处理搜索
  handleSearch() {
    const keyword = this.data.searchKeyword.trim();
    if (!keyword) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      });
      return;
    }

    // 跳转到搜索结果页面
    wx.navigateTo({
      url: `/pages/search/search?keyword=${encodeURIComponent(keyword)}`
    });
  },
  
  // 选择情绪
  selectEmotion(e) {
    const emotion = e.currentTarget.dataset.emotion;
    this.setData({
      selectedEmotion: emotion,
      publishContent: this.data.publishContent + emotion
    });
  },
  
  // 选择图片
  selectImage() {
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log('选择的图片:', tempFilePaths);
        
        // 存储选择的图片
        this.setData({
          selectedImages: [...this.data.selectedImages, ...tempFilePaths]
        });
        
        // 这里可以添加图片预览或上传逻辑
        wx.showToast({
          title: `选择了 ${tempFilePaths.length} 张图片`,
          icon: 'success'
        });
      },
      fail: (err) => {
        console.error('选择图片失败:', err);
        wx.showToast({
          title: '选择图片失败',
          icon: 'none'
        });
      }
    });
  },
  
  // 预览图片
  previewImage(e) {
    const index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: this.data.selectedImages[index], // 当前显示图片的http链接
      urls: this.data.selectedImages // 需要预览的图片http链接列表
    });
  },
  
  // 删除图片
  deleteImage(e) {
    const index = e.currentTarget.dataset.index;
    const newImages = this.data.selectedImages.filter((_, i) => i !== index);
    this.setData({
      selectedImages: newImages
    });
  },
  
  // 预览内容图片
  previewContentImage(e) {
    const images = e.currentTarget.dataset.images;
    const index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: images[index], // 当前显示图片的http链接
      urls: images // 需要预览的图片http链接列表
    });
  },
  
  // 发布内容
  publish() {
    if (!this.data.publishContent && this.data.selectedImages.length === 0) {
      wx.showToast({
        title: '请输入内容或选择图片',
        icon: 'none'
      });
      return;
    }
    
    // 模拟发布
    const newPost = {
      id: Date.now(),
      author: '🪐 我的星球#' + Math.floor(Math.random() * 9999),
      time: '刚刚',
      visibility: '🌍 公开',
      content: this.data.selectedEmotion ? this.data.selectedEmotion + ' ' + this.data.publishContent : this.data.publishContent,
      images: this.data.selectedImages,
      tags: [],
      likes: 0,
      comments: 0,
      shares: 0
    };
    
    // 更新内容列表和原始内容列表
    const updatedList = [newPost, ...this.data.contentList];
    this.setData({
      contentList: updatedList,
      originalContentList: [newPost, ...this.data.originalContentList],
      publishContent: '',
      selectedEmotion: '',
      selectedImages: []
    });
    
    wx.showToast({
      title: '发布成功',
      icon: 'success'
    });
  },
  
  // 点赞
  likePost(e) {
    const id = e.currentTarget.dataset.id;
    const newList = this.data.contentList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          likes: item.likes + 1
        };
      }
      return item;
    });
    
    this.setData({
      contentList: newList
    });
  },
  
  // 评论
  commentPost(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({
      showCommentModal: true,
      currentPostId: id,
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
      currentPostId: null,
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
    
    const id = this.data.currentPostId;
    // 模拟评论成功
    const newList = this.data.contentList.map(item => {
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
      contentList: newList,
      showCommentModal: false,
      currentPostId: null,
      commentContent: ''
    });
    
    wx.showToast({
      title: '评论成功',
      icon: 'success'
    });
  },
  

  
  // 共鸣
  resonancePost(e) {
    const id = e.currentTarget.dataset.id;
    // 模拟共鸣成功
    const newList = this.data.contentList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          resonance: (item.resonance || 0) + 1
        };
      }
      return item;
    });
    
    this.setData({
      contentList: newList
    });
    
    wx.showToast({
      title: '共鸣成功',
      icon: 'success'
    });
  },
  
  // 举报
  reportPost(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '举报功能开发中',
      icon: 'none'
    });
  },
  
  // 更多
  morePost(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '更多功能开发中',
      icon: 'none'
    });
  },
  
  // 加载更多
  loadMore() {
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    });
    
    setTimeout(() => {
      // 模拟加载更多数据
      const morePosts = [
        {
          id: Date.now() + 1,
          author: '🌙 深夜星球#5678',
          time: '5小时前',
          visibility: '🌍 公开',
          content: '深夜总是让人思考很多，今天想了很多关于未来的事情...',
          tags: ['思考', '未来', '深夜'],
          likes: 123,
          comments: 23,
          shares: 5
        }
      ];
      
      this.setData({
        contentList: [...this.data.contentList, ...morePosts],
        originalContentList: [...this.data.originalContentList, ...morePosts]
      });
      
      wx.showToast({
        title: '加载成功',
        icon: 'success'
      });
    }, 1500);
  },
  
  // 导航到树洞页面
  navigateToTreehole() {
    wx.navigateTo({
      url: '/pages/treehole/treehole'
    });
  },
  
  // 导航到探索页面
  navigateToExplore() {
    wx.navigateTo({
      url: '/pages/explore/explore'
    });
  },
  
  // 导航到情绪报告页面
  navigateToReport() {
    wx.navigateTo({
      url: '/pages/report/report'
    });
  },
  
  // 导航到个人中心页面
  navigateToProfile() {
    wx.switchTab({
      url: '/pages/profile/profile'
    });
  },
  
  // 左侧导航栏点击事件
  handleNavItemClick(e) {
    // 这里可以添加导航逻辑
    console.log('导航项点击:', e.currentTarget.dataset.index);
  },
  
  // 顶部导航点击事件
  handleTopNavClick(e) {
    // 这里可以添加导航逻辑
    console.log('顶部导航点击:', e.currentTarget.dataset.index);
  },
  

  
  // 发布按钮点击事件
  handlePublishClick() {
    wx.navigateTo({
      url: '/pages/publish/publish'
    });
  },
  
  // 个人中心按钮点击事件
  handleUserClick() {
    wx.switchTab({
      url: '/pages/profile/profile'
    });
  }
})