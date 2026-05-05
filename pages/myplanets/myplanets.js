Page({
  data: {
    connectedPlanets: [
      {
        id: 1,
        type: '🌞 恒星',
        status: '活跃',
        name: '快乐星球',
        content: '充满欢声笑语的星球，居民们每天都很开心',
        interactions: 128,
        connectTime: '2024-01-15'
      },
      {
        id: 2,
        type: '🌍 行星',
        status: '活跃',
        name: '智慧星球',
        content: '居民们热爱学习和探索，充满智慧',
        interactions: 89,
        connectTime: '2024-01-18'
      }
    ],
    totalInteractions: 217,
    activePlanets: [1, 2]
  },

  goBack() {
    wx.navigateBack();
  },

  goToExplore() {
    wx.switchTab({
      url: '/pages/explore/explore'
    });
  },

  viewPlanetDetail(e) {
    const planetId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/myplanets/planet-detail?id=${planetId}`
    });
  },

  disconnectPlanet(e) {
    const planetId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认断开',
      content: '确定要断开与该星球的连接吗？',
      success: (res) => {
        if (res.confirm) {
          const updatedPlanets = this.data.connectedPlanets.filter(planet => planet.id !== planetId);
          const updatedActivePlanets = this.data.activePlanets.filter(id => id !== planetId);
          const totalInteractions = updatedPlanets.reduce((sum, planet) => sum + planet.interactions, 0);
          
          this.setData({
            connectedPlanets: updatedPlanets,
            activePlanets: updatedActivePlanets,
            totalInteractions: totalInteractions
          });
          
          wx.showToast({
            title: '已断开连接',
            icon: 'success'
          });
        }
      }
    });
  }
});