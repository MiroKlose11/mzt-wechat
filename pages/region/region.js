Page({
  data: {
    statusBarHeight: 0,
    selectedRegion: '全国',
    regions: [
      { id: 'all', name: '全国' },
      { id: 'beijing', name: '北京' },
      { id: 'shanghai', name: '上海' },
      { id: 'sichuan', name: '四川' },
      { id: 'guangzhou', name: '广州' },
      { id: 'wuhan', name: '武汉' },
      { id: 'fujian', name: '福建' },
      { id: 'anhui', name: '安徽' },
      { id: 'henan', name: '河南' },
      { id: 'jiangsu', name: '江苏' },
      { id: 'jiangxi', name: '江西' }
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
        title: '米米搭世-挂机',
        subtitle: '技术专家'
      },
      {
        id: 5,
        image: '/images/content/content5.jpg',
        title: '米米搭世-挂机',
        subtitle: '技术专家'
      },
      {
        id: 6,
        image: '/images/content/content6.jpg',
        title: '米米搭世-挂机',
        subtitle: '技术专家'
      },
      {
        id: 7,
        image: '/images/content/content7.jpg',
        title: '米米搭世-挂机',
        subtitle: '技术专家'
      },
      {
        id: 8,
        image: '/images/content/content8.jpg',
        title: '米米搭世-挂机',
        subtitle: '技术专家'
      },
      {
        id: 9,
        image: '/images/content/content9.jpg',
        title: '米米搭世-挂机',
        subtitle: '技术专家'
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

  // 选择地区
  selectRegion(e) {
    const region = e.currentTarget.dataset.region
    this.setData({
      selectedRegion: region
    })
    // 这里可以添加根据地区筛选内容的逻辑
    this.loadContentByRegion(region)
  },

  // 根据地区加载内容
  loadContentByRegion(region) {
    // 模拟根据地区加载不同内容
    console.log('加载地区内容:', region)
    // 实际项目中这里会调用API获取对应地区的数据
  },

  // 轮播图切换
  onCarouselChange(e) {
    this.setData({
      currentCarousel: e.detail.current
    })
  },

  // 点击内容项
  onContentTap(e) {
    const item = e.currentTarget.dataset.item
    console.log('点击内容项:', item)
    // 这里可以跳转到详情页
  },

  // 点击更多
  onMoreTap() {
    console.log('查看更多')
    // 这里可以跳转到更多页面或加载更多内容
  }
})