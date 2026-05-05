Page({
  data: {
    achievements: [
      {
        id: 1,
        name: '星球探索者',
        description: '探索第一个星球',
        icon: '🪐',
        earned: true,
        earnedDate: '2024-01-15',
        progress: 1,
        target: 1
      },
      {
        id: 2,
        name: '星际旅行者',
        description: '探索5个不同的星球',
        icon: '🚀',
        earned: true,
        earnedDate: '2024-01-20',
        progress: 5,
        target: 5
      },
      {
        id: 3,
        name: '社交达人',
        description: '在星球上互动10次',
        icon: '💬',
        earned: false,
        progress: 7,
        target: 10
      },
      {
        id: 4,
        name: '信号大师',
        description: '发送20个信号',
        icon: '📡',
        earned: false,
        progress: 12,
        target: 20
      },
      {
        id: 5,
        name: '共鸣者',
        description: '获得50次共鸣',
        icon: '❤️',
        earned: false,
        progress: 25,
        target: 50
      }
    ],
    totalAchievements: 5,
    earnedAchievements: [],
    unearnedAchievements: []
  },

  onLoad() {
    this.updateAchievementStats();
  },

  updateAchievementStats() {
    const earned = this.data.achievements.filter(achievement => achievement.earned);
    const unearned = this.data.achievements.filter(achievement => !achievement.earned);
    
    this.setData({
      earnedAchievements: earned,
      unearnedAchievements: unearned
    });
  },

  goBack() {
    wx.navigateBack();
  },

  goToExplore() {
    wx.switchTab({
      url: '/pages/explore/explore'
    });
  }
});