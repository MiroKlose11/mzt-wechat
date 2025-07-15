Page({
  data: {
    navBarHeight: 88, // 默认导航栏高度
    navBarTop: 44,    // 默认导航栏顶部padding
    capsuleRight: 20, // 胶囊右侧间距
    tabs: [
      { id: 1, name: '热搜榜', active: true },
      { id: 2, name: '地区榜', active: false },
      { id: 3, name: '学科榜', active: false },
      { id: 4, name: '岗位榜', active: false },
      { id: 5, name: '专利榜', active: false },
      { id: 6, name: '职称榜', active: false },
      { id: 7, name: '课程榜', active: false },
      { id: 8, name: '技术榜', active: false },
      { id: 9, name: '姓氏榜', active: false },
      { id: 10, name: '高级筛选', active: false }
    ],
    bannerList: [
      { id: 1, img: '/images/banner/banner1.jpg' },
      { id: 2, img: '/images/banner/banner2.jpg' },
      { id: 3, img: '/images/banner/banner3.jpg' }
    ],
    personList: [
      {
        id: 1,
        avatar: '/images/avatar/doctor1.jpg',
        name: '戴传昌',
        title: '主任医师',
        hospital: '上海第九人民医院黄埔分院',
        major: '擅长学科：鼻整形、脂肪整形',
        tags: ['核心专家', '核心专家'],
        verified: true
      },
      {
        id: 2,
        avatar: '/images/avatar/doctor2.jpg',
        name: '曾高',
        title: '副主任医师',
        hospital: '北京协和医院',
        major: '擅长学科：面部整形',
        tags: ['核心专家'],
        verified: true
      },
      {
        id: 3,
        avatar: '/images/avatar/doctor3.jpg',
        name: '谭书兵',
        title: '主治医师',
        hospital: '四川华西医院',
        major: '擅长学科：眼部整形',
        tags: ['核心专家'],
        verified: false
      }
    ]
  },
  onLoad() {
    // 获取系统胶囊信息，动态设置导航栏高度
    const menuButton = wx.getMenuButtonBoundingClientRect();
    this.setData({
      navBarHeight: menuButton.bottom + menuButton.top,
      navBarTop: menuButton.top,
      capsuleRight: wx.getSystemInfoSync().windowWidth - menuButton.right
    });
  },
  navBack() {
    wx.navigateBack();
  }
}) 