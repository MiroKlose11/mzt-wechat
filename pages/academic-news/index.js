Page({
  data: {
    statusBarHeight: 0,
    bannerHeightPx: 0,
    bannerOverlapPx: 0,
    headerPadBottomPx: 0,
    navBarHeightPx: 44,
    activeTab: 'all',
    newsList: [
      {
        id: 1,
        title: '第三届美鼻时代医生集团学术年会在上海举办！',
        time: '2025-03-01  15:00',
        image: '/images/news/news1.svg'
      },
      {
        id: 2,
        title: '激活女性企业家潜力，共探商业向善——长江商学院与卡地亚企业合作项目成功...',
        time: '2025-03-01  15:00',
        image: '/images/news/news2.svg'
      },
      {
        id: 3,
        title: '长江基石计划2024年启动仪式暨首次年会成功举办！',
        time: '2025-03-01  15:00',
        image: '/images/news/news3.svg'
      }
    ]
  },
  onLoad() {
    const sys = wx.getSystemInfoSync();
    const winW = sys.windowWidth;
    const rpx2px = winW / 750;
    const bannerW = winW - 60 * rpx2px;
    const bannerH = Math.round((bannerW * 9) / 16);

    let navBarHeightPx = 44;
    try {
      const rect = wx.getMenuButtonBoundingClientRect();
      const gap = Math.max(0, rect.top - (sys.statusBarHeight || 0));
      navBarHeightPx = Math.round(rect.height + gap * 2);
    } catch (e) {}

    this.setData({
      statusBarHeight: sys.statusBarHeight || 0,
      bannerHeightPx: bannerH,
      bannerOverlapPx: Math.round(bannerH / 3),
      headerPadBottomPx: Math.round(bannerH / 3),
      navBarHeightPx
    });
  },
  onShow() {
    const sys = wx.getSystemInfoSync();
    const winW = sys.windowWidth;
    const rpx2px = winW / 750;
    const bannerW = winW - 60 * rpx2px;
    const bannerH = Math.round((bannerW * 9) / 16);

    let navBarHeightPx = 44;
    try {
      const rect = wx.getMenuButtonBoundingClientRect();
      const gap = Math.max(0, rect.top - (sys.statusBarHeight || 0));
      navBarHeightPx = Math.round(rect.height + gap * 2);
    } catch (e) {}

    this.setData({
      statusBarHeight: sys.statusBarHeight || 0,
      bannerHeightPx: bannerH,
      bannerOverlapPx: Math.round(bannerH / 3),
      headerPadBottomPx: Math.round(bannerH / 3),
      navBarHeightPx
    });
  },
  goBack() { wx.navigateBack({ delta: 1 }); },
  onSearchInput(e) { this.setData({}); },
  onSearchConfirm() {},
  onTabChange(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
  },
  onNewsItemTap(e) {
    const id = e.currentTarget.dataset.id;
    console.log('点击新闻项:', id);
  },
  onQuickLinkTap(e) {
    const type = e.currentTarget.dataset.type;
    if (type === 'home') {
      wx.switchTab({ url: '/pages/index/index' });
    } else if (type === 'academic') {
      wx.navigateTo({ url: '/pages/academic-chain/index' });
    } else if (type === 'site') {
      // 暂无独立页面，用首页代替或后续替换
      wx.switchTab({ url: '/pages/index/index' });
    }
  }
});