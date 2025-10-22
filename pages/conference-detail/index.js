Page({
  data: {
    statusBarHeight: 0,
    navBarHeightPx: 44,
    headerPadBottomPx: 0,
    bannerHeightPx: 0,
    bannerOverlapPx: 0,
    title: '鲁脂道第三届年会',
    gridList: [
      { type: 'intro', title: '大会简介', sub: 'Introduction', icon: '/images/academic/intro.png' },
      { type: 'agenda', title: '大会议程', sub: 'Agenda', icon: '/images/academic/agenda.png' },
      { type: 'speaker', title: '特邀嘉宾', sub: 'Speaker', icon: '/images/academic/speaker.png' },
      { type: 'exhibitor', title: '参展厂商', sub: 'Exhibitor', icon: '/images/academic/exhibitor.png' },
      { type: 'hotel', title: '酒店预订', sub: 'Hotel', icon: '/images/academic/hotel.png' },
      { type: 'meal', title: '餐券领销', sub: 'Meal vouchers', icon: '/images/academic/meal.png' },
      { type: 'guide', title: '参会指南', sub: 'Guide', icon: '/images/academic/guide.png' },
      { type: 'live', title: '大会直播', sub: 'live', icon: '/images/academic/live.png' },
      { type: 'contact', title: '大会联络', sub: 'Contact', icon: '/images/academic/contact.png' }
    ],
    showIntro: false
  },

  onLoad() {
    this.initSystemInfo();
  },

  initSystemInfo() {
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

  goBack() {
    if (this.data.showIntro) {
      this.setData({ showIntro: false });
    } else {
      wx.navigateBack({ delta: 1 });
    }
  },
  onMore() { wx.showActionSheet({ itemList: ['收藏', '举报'] }); },
  onShare() { wx.showShareMenu({ withShareTicket: true }); },
  onSearchConfirm(e) { wx.showToast({ title: '搜索: ' + (e.detail.value || ''), icon: 'none' }); },

  onAction(e) {
    const type = e.currentTarget.dataset.type;
    wx.showToast({ title: '点击：' + type, icon: 'none' });
  },

  onGridTap(e) {
    const { type } = e.currentTarget.dataset;
    if (type === 'intro') {
      this.setData({ showIntro: true });
      return;
    }
    if (type === 'agenda') {
      wx.navigateTo({ url: '/pages/conference-agenda/index' });
      return;
    }
    if (type === 'speaker') {
      wx.navigateTo({ url: '/pages/invited-guests/index' });
      return;
    }
    // 其他类型暂保留占位提示
    wx.showToast({ title: '进入：' + type, icon: 'none' });
  },

  closeIntro() {
    this.setData({ showIntro: false });
  }
});