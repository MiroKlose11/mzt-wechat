Page({
  data: {
    statusBarHeight: 0, // 状态栏高度
    capsuleLeft: 0,     // 胶囊左侧位置
    currentCategory: 1,
    currentTab: 'position', // 当前选中的标签页：position-岗位, department-部门, course-课程
    hasMore: true,
    searchKeyword: '',
    navOpacity: 0,     // 导航栏透明度
    
    // 分类导航
    categories: [
      { id: 1, name: '热搜榜' },
      { id: 2, name: '地区榜' },
      { id: 3, name: '学科榜' },
      { id: 4, name: '专业榜' },
      { id: 5, name: '需求榜' },
      { id: 6, name: '职称榜' },
      { id: 7, name: '医院榜' },
      { id: 8, name: '公司榜' },
      { id: 9, name: '薪资榜' },
      { id: 10, name: '高级筛选' }
    ],
    
    // 专科图标
    specialtyIcons: [
      { id: 1, name: '整形外科', icon: '/images/icons/icon1.png' },
      { id: 2, name: '皮肤美容科', icon: '/images/icons/icon2.png' },
      { id: 3, name: '口腔美容科', icon: '/images/icons/icon3.png' },
      { id: 4, name: '医务科', icon: '/images/icons/icon4.png' },
      { id: 5, name: '护理部', icon: '/images/icons/icon5.png' },
      { id: 6, name: '住院部', icon: '/images/icons/icon6.png' },
      { id: 7, name: '手术室', icon: '/images/icons/icon7.png' },
      { id: 8, name: '麻醉科', icon: '/images/icons/icon8.png' },
      { id: 9, name: '行政部', icon: '/images/icons/icon9.png' },
      { id: 10, name: '所有部门', icon: '/images/icons/icon10.png' }
    ],
    
    // 岗位列表
    positionList: [
      {
        id: 1,
        avatar: '',
        name: '主任医师',
        salary: '25-50万/年',
        company: '上海第九人民医院黄埔分院',
        tags: ['急聘', '高薪'],
        requirement: '临床医学'
      },
      {
        id: 2,
        avatar: '',
        name: '整形外科医生',
        salary: '20-35万/年',
        company: '北京协和医院',
        tags: ['急聘', '高薪'],
        requirement: '临床医学'
      },
      {
        id: 3,
        avatar: '',
        name: '美容咨询师',
        salary: '15-25万/年',
        company: '美莱医疗美容医院',
        tags: ['急聘', '高薪'],
        requirement: '临床医学'
      }
    ]
  },

  onLoad() {
    console.log('岗位页面加载');
    // 获取状态栏高度和胶囊按钮位置
    const systemInfo = wx.getSystemInfoSync();
    const menuButton = wx.getMenuButtonBoundingClientRect();
    
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight,
      capsuleLeft: menuButton.left - 10 // 减去10是为了让标题更贴近左侧
    });
    
    this.loadPositionData();
  },

  // 页面滚动事件处理
  onPageScroll(e) {
    // 当滚动距离超过100px时开始改变导航栏的透明度
    const scrollTop = e.scrollTop;
    let opacity = 0;
    
    if (scrollTop <= 0) {
      opacity = 0;
    } else if (scrollTop >= 100) {
      opacity = 1;
    } else {
      opacity = scrollTop / 100;
    }
    
    // 避免频繁setData
    if (Math.abs(this.data.navOpacity - opacity) > 0.01) {
      this.setData({
        navOpacity: opacity
      });
    }
  },

  // 返回上一页
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  // 搜索
  onSearch(e) {
    const keyword = e.detail.value || this.data.searchKeyword;
    console.log('搜索关键词:', keyword);
    this.setData({
      searchKeyword: keyword
    });
    this.loadPositionData();
  },

  // 打开高级筛选页面
  openAdvancedFilter() {
    wx.navigateTo({
      url: '/pages/position-filter/position-filter'
    });
  },

  // 切换顶部标签页
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    console.log('切换标签:', tab);
    this.setData({
      currentTab: tab
    });
    this.loadPositionData();
  },

  // 点击专科图标
  onIconTap(e) {
    const iconId = e.currentTarget.dataset.id;
    const specialty = this.data.specialtyIcons.find(item => item.id === iconId);
    console.log('点击专科:', specialty ? specialty.name : '未知');
    wx.showToast({
      title: `切换到${specialty ? specialty.name : '未知'}`,
      icon: 'none'
    });
  },
  
  // 查看岗位详情
  viewPositionDetail(e) {
    const positionId = e.currentTarget.dataset.id;
    console.log('查看岗位详情:', positionId);
    wx.navigateTo({
      url: `/pages/position/detail?id=${positionId}`
    });
  },

  // 收藏岗位
  collectPosition(e) {
    e.stopPropagation();
    const positionId = e.currentTarget.dataset.id;
    console.log('收藏岗位:', positionId);
    wx.showToast({
      title: '收藏成功',
      icon: 'success'
    });
  },

  // 申请岗位
  applyPosition(e) {
    e.stopPropagation();
    const positionId = e.currentTarget.dataset.id;
    console.log('申请岗位:', positionId);
    wx.showToast({
      title: '申请成功',
      icon: 'success'
    });
  },

  // 加载岗位数据
  loadPositionData() {
    console.log('加载岗位数据');
    // 这里可以调用API加载真实数据
    // wx.request({
    //   url: 'your-api-endpoint',
    //   data: {
    //     category: this.data.currentCategory,
    //     keyword: this.data.searchKeyword,
    //     tab: this.data.currentTab
    //   },
    //   success: (res) => {
    //     this.setData({
    //       positionList: res.data.list,
    //       hasMore: res.data.hasMore
    //     });
    //   }
    // });
  },

  // 上拉加载更多
  onReachBottom() {
    if (this.data.hasMore) {
      console.log('加载更多');
      // 加载更多数据
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    console.log('下拉刷新');
    this.loadPositionData();
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 1500);
  }
})