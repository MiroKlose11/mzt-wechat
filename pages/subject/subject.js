Page({
  data: {
    statusBarHeight: 0,
    selectedSubject: '全部学科',
    subjects: [
      { id: 'all', name: '全部学科' },
      { id: 'nose', name: '鼻整形' },
      { id: 'eye', name: '眼整形' },
      { id: 'fat', name: '脂肪整形' },
      { id: 'breast', name: '乳房整形' },
      { id: 'private', name: '私密整形' },
      { id: 'skin', name: '皮肤美容' },
      { id: 'oral', name: '口腔美容' },
      { id: 'injection', name: '注射美容' },
      { id: 'hair', name: '毛发移植' },
      { id: 'face', name: '颌面整形' }
    ],
    carouselImages: [
      {
        id: 1,
        image: '/images/carousel/carousel1.jpg',
        title: '精选推荐1'
      },
      {
        id: 2,
        image: '/images/carousel/carousel2.jpg',
        title: '精选推荐2'
      }
    ],
    currentCarousel: 0,
    contentList: [
      {
        id: 1,
        image: '/images/content/content1.jpg',
        title: '张成武',
        subtitle: '副主任医师'
      },
      {
        id: 2,
        image: '/images/content/content2.jpg',
        title: '牛勇敢',
        subtitle: '主任医师'
      },
      {
        id: 3,
        image: '/images/content/content3.jpg',
        title: '廖连平',
        subtitle: '副主任医师'
      },
      {
        id: 4,
        image: '/images/content/content4.jpg',
        title: '李明华',
        subtitle: '主治医师'
      },
      {
        id: 5,
        image: '/images/content/content5.jpg',
        title: '王丽娟',
        subtitle: '副主任医师'
      },
      {
        id: 6,
        image: '/images/content/content6.jpg',
        title: '陈建国',
        subtitle: '主任医师'
      },
      {
        id: 7,
        image: '/images/content/content7.jpg',
        title: '赵雅芳',
        subtitle: '主治医师'
      },
      {
        id: 8,
        image: '/images/content/content8.jpg',
        title: '刘志强',
        subtitle: '副主任医师'
      },
      {
        id: 9,
        image: '/images/content/content9.jpg',
        title: '孙美丽',
        subtitle: '主任医师'
      }
    ]
  },

  onLoad() {
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync()
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight
    })
  },

  // 返回上一页
  goBack() {
    wx.navigateBack()
  },

  // 选择学科
  selectSubject(e) {
    const subject = e.currentTarget.dataset.subject
    this.setData({
      selectedSubject: subject
    })
    // 这里可以添加根据学科筛选内容的逻辑
    this.loadContentBySubject(subject)
  },

  // 根据学科加载内容
  loadContentBySubject(subject) {
    // 模拟根据学科加载不同内容
    console.log('加载学科内容:', subject)
    // 实际项目中这里会调用API获取对应学科的数据
  },

  // 轮播图切换
  onCarouselChange(e) {
    this.setData({
      currentCarousel: e.detail.current
    })
  },

  // 点击内容项
  onContentTap(e) {
    const item = e.currentTarget.dataset.item;
    console.log('点击内容项:', item);
    // TODO: 跳转到详情页面
  },

  // 点击更多
  onMoreTap(e) {
    console.log('点击更多');
    // TODO: 跳转到更多页面
  }
})