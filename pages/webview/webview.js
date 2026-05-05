Page({
  data: {
    url: ''
  },

  onLoad(options) {
    if (options.url) {
      this.setData({
        url: decodeURIComponent(options.url)
      });
    }
  },

  onMessage(e) {
    console.log('收到来自web-view的消息:', e.detail);
  }
});