Page({
  data: {
    statusBarHeight: 0,
    searchKeyword: '',
    bannerHeightPx: 0,
    bannerOverlapPx: 0,
    headerPadBottomPx: 0,
    navBarHeightPx: 44,

    // 学术动态示例数据
    newsList: [
      {
        id: 'n1',
        title: '第三届美鼻时代医生集团学术年会在上海举办！',
        summary: '大会聚焦鼻整形前沿技术与安全标准，邀请国内外专家分享最新临床研究与手术实践，促进学术交流与规范化发展。',
        img: 'https://picsum.photos/320/220?1'
      },
      {
        id: 'n2',
        title: '第三届美鼻时代医生集团学术年会在上海举办！',
        summary: '会议同期发布多项学术共识与指南，设置青年论坛与手术演示环节，推动行业人才培养与成果转化。',
        img: 'https://picsum.photos/320/220?2'
      }
    ],

    // 学术会议示例数据
    confList: [
      { id: 'c1', title: '第三届鲁脂道医生集团学术年会暨第三届脂肪整形手术演示大会', date: '2025年9月26—29日', location: '湖北武汉', host: '鲁脂道医生集团', organizer: '仁爱时光医疗美容', img: '' },
      { id: 'c2', title: '第三届鲁脂道医生集团学术年会暨第三届脂肪整形手术演示大会', date: '2025年9月26—29日', location: '湖北武汉', host: '鲁脂道医生集团', organizer: '仁爱时光医疗美容', img: '' }
    ]
  },

  onLoad() {
    const sys = wx.getSystemInfoSync();
    const winW = sys.windowWidth; // px
    const rpx2px = winW / 750;    // 1rpx 等于多少 px
    const bannerW = winW - 60 * rpx2px; // 左右 30rpx 内边距
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
      bannerOverlapPx: Math.round(bannerH / 2),
      headerPadBottomPx: Math.round(bannerH / 2),
      navBarHeightPx
    });
  },

  // 跳转类交互（后续对接真实页面时替换）
  onTapSectionMore(e) {
    const type = e.currentTarget.dataset.type;
    console.log('more:', type);
  },
  onTapNewsItem(e) {
    const id = e.currentTarget.dataset.id;
    console.log('news item:', id);
  },
  onTapConfItem(e) {
    const id = e.currentTarget.dataset.id;
    console.log('conf item:', id);
  },

  goBack() {
    wx.navigateBack({ delta: 1 });
  },
  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value });
  },
  onSearchConfirm() {}
});