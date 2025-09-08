Page({
  data: {
    statusBarHeight: 0, // 状态栏高度
    capsuleLeft: 0,     // 胶囊左侧位置
    currentCategory: 1,
    hasMore: true,
    searchKeyword: '',
    navOpacity: 0,     // 导航栏透明度
    
    // 分类导航
    categories: [
      { id: 1, name: '热搜榜' },
      { id: 2, name: '地区榜' },
      { id: 3, name: '学科榜' },
      { id: 4, name: '岗位榜' },
      { id: 5, name: '专利榜' },
      { id: 6, name: '职称榜' },
      { id: 7, name: '课程榜' },
      { id: 8, name: '技术榜' },
      { id: 9, name: '姓氏榜' },
      { id: 10, name: '高级筛选' }
    ],
    
    // 快捷图标
    quickIcons: [
      { id: 1, name: '普通', icon: '' },
      { id: 2, name: '管家', icon: '' },
      { id: 3, name: '管家', icon: '' },
      { id: 4, name: '管家', icon: '' },
      { id: 5, name: '管家', icon: '' }
    ],
    
    // 人员列表
    personnelList: [
      {
        id: 1,
        avatar: '',
        name: '戴传昌',
        position: '主任医师',
        hospital: '上海第九人民医院黄埔分院',
        tags: ['核心专家', '核心专家'],
        specialty: '鼻整形、脂肪整形'
      },
      {
        id: 2,
        avatar: '',
        name: '戴传昌',
        position: '主任医师',
        hospital: '上海第九人民医院黄埔分院',
        tags: ['核心专家', '核心专家'],
        specialty: '鼻整形、脂肪整形'
      },
      {
        id: 3,
        avatar: '',
        name: '戴传昌',
        position: '主任医师',
        hospital: '上海第九人民医院黄埔分院',
        tags: ['核心专家', '核心专家'],
        specialty: '鼻整形、脂肪整形'
      }
    ]
  },

  onLoad(options) {
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight,
      capsuleLeft: menuButtonInfo.left
    });
    
    this.loadPersonnelData();
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
    this.loadPersonnelData();
  },

  // 切换分类
  switchCategory(e) {
    const categoryId = e.currentTarget.dataset.id;
    console.log('切换分类:', categoryId);
    
    // 如果点击地区榜，跳转到地区榜页面
    if (categoryId == 2) {
      wx.navigateTo({
        url: '/pages/region/region'
      });
      return;
    }
    
    // 如果点击学科榜，跳转到学科榜页面
    if (categoryId == 3) {
      wx.navigateTo({
        url: '/pages/subject/subject'
      });
      return;
    }
    
    // 如果点击岗位榜，跳转到岗位榜页面
    if (categoryId == 4) {
      wx.navigateTo({
        url: '/pages/position-rank/position-rank'
      });
      return;
    }
    
    this.setData({
      currentCategory: categoryId
    });
    this.loadPersonnelData();
  },

  // 点击图标
  onIconTap(e) {
    const iconId = e.currentTarget.dataset.id;
    console.log('点击图标:', iconId);
  },
  
  // 查看医生详情
  viewDoctorDetail(e) {
    const doctorId = e.currentTarget.dataset.id;
    console.log('查看医生详情:', doctorId);
    wx.navigateTo({
      url: `/pages/personnel/detail?id=${doctorId}`
    });
  },

  // 查看人员详情
  viewPersonnelDetail(e) {
    const personnelId = e.currentTarget.dataset.id;
    console.log('查看人员详情:', personnelId);
    wx.navigateTo({
      url: `/pages/personnel/detail?id=${personnelId}`
    });
  },

  // 关注人员
  contactPersonnel(e) {
    e.stopPropagation();
    const personnelId = e.currentTarget.dataset.id;
    console.log('关注人员:', personnelId);
    wx.showToast({
      title: '已关注',
      icon: 'success'
    });
  },

  // 私信人员
  messagePersonnel(e) {
    e.stopPropagation();
    const personnelId = e.currentTarget.dataset.id;
    console.log('私信人员:', personnelId);
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 加载人员数据
  loadPersonnelData() {
    console.log('加载人员数据');
    // 这里可以调用API加载真实数据
    // wx.request({
    //   url: 'your-api-endpoint',
    //   data: {
    //     category: this.data.currentCategory,
    //     keyword: this.data.searchKeyword
    //   },
    //   success: (res) => {
    //     this.setData({
    //       personnelList: res.data.list,
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
  }
})