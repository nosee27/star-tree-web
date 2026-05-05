Page({
  data: {
    keyword: '',
    hasSearched: false,
    searchResults: [],
    // 模拟数据
    allPosts: [
      {
        id: 1,
        author: '🌸 流浪的星球#2847',
        time: '2小时前',
        visibility: '🌍 公开',
        content: '今天工作压力好大，感觉快要喘不过气了...\n但是还是要坚持下去 💪',
        tags: ['焦虑', '工作压力', '坚持'],
        likes: 234,
        comments: 45,
        shares: 12
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
        shares: 34
      },
      {
        id: 3,
        author: '🌙 深夜星球#5678',
        time: '5小时前',
        visibility: '🌍 公开',
        content: '深夜总是让人思考很多，今天想了很多关于未来的事情...',
        tags: ['思考', '未来', '深夜'],
        likes: 123,
        comments: 23,
        shares: 5
      },
      {
        id: 4,
        author: '☀️ 阳光星球#9876',
        time: '1天前',
        visibility: '🌍 公开',
        content: '今天天气真好，心情也跟着好起来了！出去散步感觉整个人都放松了~',
        tags: ['开心', '阳光', '放松'],
        likes: 345,
        comments: 67,
        shares: 18
      },
      {
        id: 5,
        author: '🌧️ 雨天星球#4321',
        time: '2天前',
        visibility: '🌍 公开',
        content: '下雨天真的很适合在家看书，听着雨声，感觉很安静很舒服',
        tags: ['安静', '阅读', '雨天'],
        likes: 210,
        comments: 34,
        shares: 10
      },
      {
        id: 6,
        author: '🌟 希望星球#7654',
        time: '3天前',
        visibility: '🌍 公开',
        content: '无论遇到什么困难，都要保持希望！明天会更好的 ✨',
        tags: ['希望', '乐观', '正能量'],
        likes: 456,
        comments: 78,
        shares: 25
      },
      {
        id: 7,
        author: '🔥 热情星球#3210',
        time: '4天前',
        visibility: '🌍 公开',
        content: '今天参加了一个很棒的活动，认识了很多新朋友，感觉很充实！',
        tags: ['热情', '社交', '充实'],
        likes: 289,
        comments: 45,
        shares: 15
      },
      {
        id: 8,
        author: '💧 平静星球#6789',
        time: '5天前',
        visibility: '🌍 公开',
        content: '最近开始练习冥想，感觉整个人都变得平静了，推荐给大家！',
        tags: ['平静', '冥想', '健康'],
        likes: 321,
        comments: 56,
        shares: 19
      },
      {
        id: 9,
        author: '🎵 音乐星球#5432',
        time: '1周前',
        visibility: '🌍 公开',
        content: '音乐真的是治愈心灵的良药，今天听了一首很棒的歌，分享给大家~',
        tags: ['音乐', '治愈', '分享'],
        likes: 412,
        comments: 89,
        shares: 32
      },
      {
        id: 10,
        author: '📚 学习星球#8765',
        time: '1周前',
        visibility: '🌍 公开',
        content: '今天学习了新的知识，感觉很有收获！不断学习，不断进步 💪',
        tags: ['学习', '进步', '收获'],
        likes: 278,
        comments: 43,
        shares: 14
      },
      {
        id: 11,
        author: '🍔 美食星球#2109',
        time: '2周前',
        visibility: '🌍 公开',
        content: '今天尝试做了一道新菜，味道还不错！分享一下我的烹饪心得~',
        tags: ['美食', '烹饪', '分享'],
        likes: 356,
        comments: 67,
        shares: 22
      },
      {
        id: 12,
        author: '🚶 运动星球#9870',
        time: '2周前',
        visibility: '🌍 公开',
        content: '坚持运动真的很重要，今天又完成了一次晨跑，感觉充满活力！',
        tags: ['运动', '健康', '坚持'],
        likes: 298,
        comments: 54,
        shares: 17
      },
      {
        id: 13,
        author: '🌈 多彩星球#6543',
        time: '3周前',
        visibility: '🌍 公开',
        content: '生活是多彩的，我们要学会发现身边的美好，保持积极的心态！',
        tags: ['积极', '美好', '心态'],
        likes: 423,
        comments: 76,
        shares: 28
      },
      {
        id: 14,
        author: '🌱 成长星球#3219',
        time: '3周前',
        visibility: '🌍 公开',
        content: '每个人都在不断成长，遇到困难不要害怕，那是成长的机会！',
        tags: ['成长', '困难', '机会'],
        likes: 378,
        comments: 65,
        shares: 23
      },
      {
        id: 15,
        author: '🌺 美丽星球#7650',
        time: '1个月前',
        visibility: '🌍 公开',
        content: '今天看到了美丽的日落，大自然真的很神奇，让人心情愉悦！',
        tags: ['美丽', '自然', '心情'],
        likes: 489,
        comments: 92,
        shares: 35
      }
    ]
  },

  onLoad(options) {
    // 接收从首页传递过来的搜索关键词
    if (options.keyword) {
      this.setData({
        keyword: options.keyword
      });
      // 自动执行搜索
      this.handleSearch();
    }
  },

  // 绑定搜索输入
  bindSearchInput(e) {
    this.setData({
      keyword: e.detail.value
    });
  },

  // 处理搜索
  handleSearch() {
    const keyword = this.data.keyword.trim();
    if (!keyword) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      });
      return;
    }

    // 模拟搜索逻辑：匹配内容、标签或作者
    const filteredPosts = this.data.allPosts.filter(post => {
      // 匹配内容
      if (post.content.includes(keyword)) {
        return true;
      }
      // 匹配标签
      if (post.tags.some(tag => tag.includes(keyword))) {
        return true;
      }
      // 匹配作者
      if (post.author.includes(keyword)) {
        return true;
      }
      return false;
    });

    this.setData({
      searchResults: filteredPosts,
      hasSearched: true
    });
  },

  // 处理取消
  handleCancel() {
    wx.navigateBack();
  },

  // 点赞
  likePost(e) {
    const id = e.currentTarget.dataset.id;
    const newResults = this.data.searchResults.map(item => {
      if (item.id === id) {
        return {
          ...item,
          likes: item.likes + 1
        };
      }
      return item;
    });
    
    this.setData({
      searchResults: newResults
    });
  },

  // 评论
  commentPost(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '发表评论',
      content: '',
      placeholderText: '写下你的评论...',
      confirmText: '发布',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 模拟评论成功
          const newResults = this.data.searchResults.map(item => {
            if (item.id === id) {
              return {
                ...item,
                comments: item.comments + 1
              };
            }
            return item;
          });
          
          this.setData({
            searchResults: newResults
          });
          
          wx.showToast({
            title: '评论成功',
            icon: 'success'
          });
        }
      }
    });
  },

  // 分享
  sharePost(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '分享功能开发中',
      icon: 'none'
    });
  },

  // 共鸣
  resonancePost(e) {
    const id = e.currentTarget.dataset.id;
    // 模拟共鸣成功
    const newResults = this.data.searchResults.map(item => {
      if (item.id === id) {
        return {
          ...item,
          resonance: (item.resonance || 0) + 1
        };
      }
      return item;
    });
    
    this.setData({
      searchResults: newResults
    });
    
    wx.showToast({
      title: '共鸣成功',
      icon: 'success'
    });
  }
})