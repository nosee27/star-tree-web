Page({
  data: {
    content: '',
    selectedEmotions: [],
    selectedImages: [],
    selectedVideo: '',
    selectedLocation: '',
    selectedTopics: [],
    anonymous: true,
    private: false,
    audit: true,
    comments: true
  },
  
  onLoad() {
    console.log('发布情绪页面加载');
  },
  
  // 关闭页面
  close() {
    wx.navigateBack();
  },
  
  // 绑定内容输入
  bindContentInput(e) {
    this.setData({
      content: e.detail.value
    });
  },
  
  // 选择情绪
  selectEmotion(e) {
    const emotion = e.currentTarget.dataset.emotion;
    const selectedEmotions = this.data.selectedEmotions;
    
    if (selectedEmotions.includes(emotion)) {
      // 取消选择
      this.setData({
        selectedEmotions: selectedEmotions.filter(item => item !== emotion)
      });
    } else {
      // 添加选择并将表情添加到文本中
      this.setData({
        selectedEmotions: [...selectedEmotions, emotion],
        content: this.data.content + emotion
      });
    }
  },
  
  // 切换匿名发布
  toggleAnonymous() {
    this.setData({
      anonymous: !this.data.anonymous
    });
  },
  
  // 切换仅自己可见
  togglePrivate() {
    this.setData({
      private: !this.data.private
    });
  },
  
  // 切换内容审核
  toggleAudit() {
    this.setData({
      audit: !this.data.audit
    });
  },
  
  // 切换允许评论
  toggleComments() {
    this.setData({
      comments: !this.data.comments
    });
  },
  
  // 添加图片
  addImage() {
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
  
  // 添加位置
  addLocation() {
    wx.chooseLocation({
      success: (res) => {
        console.log('选择的位置:', res);
        this.setData({
          selectedLocation: res.name,
          content: this.data.content + `📍 ${res.name}`
        });
        wx.showToast({
          title: '位置添加成功',
          icon: 'success'
        });
      },
      fail: (err) => {
        console.error('选择位置失败:', err);
        if (err.errCode === 1) {
          wx.showToast({
            title: '取消选择位置',
            icon: 'none'
          });
        } else {
          wx.showToast({
            title: '选择位置失败',
            icon: 'none'
          });
        }
      }
    });
  },
  
  // 添加话题
  addTopic() {
    wx.showModal({
      title: '添加话题',
      content: '请输入话题名称',
      editable: true,
      placeholderText: '例如：开心、工作压力',
      success: (res) => {
        if (res.confirm && res.content) {
          const topic = res.content.trim();
          if (topic) {
            const newTopic = `#${topic}`;
            this.setData({
              selectedTopics: [...this.data.selectedTopics, newTopic],
              content: this.data.content + ` ${newTopic}`
            });
            wx.showToast({
              title: '话题添加成功',
              icon: 'success'
            });
          } else {
            wx.showToast({
              title: '话题不能为空',
              icon: 'none'
            });
          }
        }
      }
    });
  },
  
  // 添加视频
  addVideo() {
    wx.chooseVideo({
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      maxDuration: 60, // 拍摄视频最长拍摄时间，单位秒。最长支持60秒
      camera: 'back', // 默认拉起的是前置还是后置摄像头。默认是前后都有，即：['front', 'back']
      success: (res) => {
        console.log('选择的视频:', res);
        // 存储视频信息
        this.setData({
          selectedVideo: res.tempFilePath,
          content: this.data.content + ' 🎬 [视频]'
        });
        wx.showToast({
          title: '视频添加成功',
          icon: 'success'
        });
      },
      fail: (err) => {
        console.error('选择视频失败:', err);
        if (err.errCode === 1) {
          wx.showToast({
            title: '取消选择视频',
            icon: 'none'
          });
        } else {
          wx.showToast({
            title: '选择视频失败',
            icon: 'none'
          });
        }
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
  
  // 删除视频
  deleteVideo() {
    this.setData({
      selectedVideo: '',
      content: this.data.content.replace(' 🎬 [视频]', '')
    });
  },
  
  // 发布
  publish() {
    if (!this.data.content && this.data.selectedImages.length === 0 && !this.data.selectedVideo) {
      wx.showToast({
        title: '请输入内容或选择图片/视频',
        icon: 'none'
      });
      return;
    }
    
    // 模拟发布
    wx.showToast({
      title: '发布中...',
      icon: 'loading'
    });
    
    // 模拟发布成功
    setTimeout(() => {
      wx.showToast({
        title: '发布成功',
        icon: 'success'
      });
      
      // 发布成功后返回上一页
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }, 1500);
  }
})