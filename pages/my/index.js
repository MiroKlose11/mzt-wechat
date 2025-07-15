Page({
  data: {
    statusBarHeight: 0,
    capsuleLeft: 0,
    navOpacity: 0,
    
    // 用户信息
    userInfo: {
      avatar: '',
      name: '戴传昌',
      position: '副主任医师',
      hospital: '西安医学院第二附属医院',
      location: '西安',
      fans: 310,
      courses: 5,
      achievements: 128,
      online: true
    },
    
    // 头衔徽章
    badges: [
      {
        icon: 'CI',
        color: '#ff6b35',
        bg: '#fff'
      },
      {
        icon: '⚡',
        color: '#ffb82f',
        bg: '#fff'
      },
      {
        icon: '✓',
        color: '#4dabf7',
        bg: '#fff'
      },
      {
        icon: 'G+',
        color: '#db4437',
        bg: '#fff'
      },
      {
        icon: '🌐',
        color: '#0f9d58',
        bg: '#fff'
      }
    ],
    
    // 学术圈子
    academicCircles: [
      {
        icon: 'CI',
        color: '#ff6b35',
        bg: '#fff'
      },
      {
        icon: '⚡',
        color: '#ffb82f',
        bg: '#fff'
      },
      {
        icon: '✓',
        color: '#4dabf7',
        bg: '#fff'
      },
      {
        icon: 'G+',
        color: '#db4437',
        bg: '#fff'
      },
      {
        icon: '🌐',
        color: '#0f9d58',
        bg: '#fff'
      }
    ],
    
    // 底部导航标签
    navTabs: [
      { id: 1, name: '学术动态', active: true },
      { id: 2, name: '学术课程', active: false },
      { id: 3, name: '科研成果', active: false },
      { id: 4, name: '临床应用', active: false },
      { id: 5, name: '学术著作', active: false }
    ]
  },

  onLoad() {
    console.log('个人中心页面加载');
    // 获取状态栏高度和胶囊按钮位置
    const systemInfo = wx.getSystemInfoSync();
    const menuButton = wx.getMenuButtonBoundingClientRect();
    
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight,
      capsuleLeft: menuButton.left - 10
    });
    
    this.loadUserData();
  },

  // 页面滚动事件处理
  onPageScroll(e) {
    const scrollTop = e.scrollTop;
    let opacity = 0;
    
    if (scrollTop <= 0) {
      opacity = 0;
    } else if (scrollTop >= 100) {
      opacity = 1;
    } else {
      opacity = scrollTop / 100;
    }
    
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

  // 简介按钮点击
  onIntroTap() {
    wx.showToast({
      title: '个人简介',
      icon: 'none'
    });
  },

  // 私信按钮点击
  onMessageTap() {
    wx.showToast({
      title: '私信功能',
      icon: 'none'
    });
  },

  // 关注按钮点击
  onFollowTap() {
    wx.showToast({
      title: '关注功能',
      icon: 'none'
    });
  },

  // 切换导航标签
  switchNavTab(e) {
    const tabId = e.currentTarget.dataset.id;
    const navTabs = this.data.navTabs.map(tab => ({
      ...tab,
      active: tab.id === tabId
    }));
    
    this.setData({
      navTabs
    });
  },

  // 加载用户数据
  loadUserData() {
    console.log('加载用户数据');
    // 这里可以调用API加载真实数据
  }
}) 