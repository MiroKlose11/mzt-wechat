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
    ],

    // 学术组织示例数据
    orgList: [
      { id: 'o1', title: '中国整形美容协会损失治疗与康复分会鼻整形及鼻修复专业委员会', subject: '鼻整形', type: '社会团体', img: '' },
      { id: 'o2', title: '中国整形美容协会损失治疗与康复分会鼻整形及鼻修复专业委员会', subject: '鼻整形', type: '医生集团', img: '' },
      { id: 'o3', title: '中国整形美容协会损失治疗与康复分会鼻整形及鼻修复专业委员会', subject: '鼻整形', type: '医生集团', img: '' }
    ],

    // 学术大赛示例数据
    contestList: [
      { id: 'ct1', title: '第三届鲁脂道医生集团学术年会暨第三届脂肪整形手术演示大会', date: '2025年9月26—29日', location: '湖北武汉', host: '鲁脂道医生集团', organizer: '仁爱时光医疗美容', img: '' },
      { id: 'ct2', title: '第三届鲁脂道医生集团学术年会暨第三届脂肪整形手术演示大会', date: '2025年9月26—29日', location: '湖北武汉', host: '鲁脂道医生集团', organizer: '仁爱时光医疗美容', img: '' }
    ],

    // 学术著作示例数据
    worksList: [
      { id: 'w1', title: '鼻整形高阶技术', author: '曾高', img: '' },
      { id: 'w2', title: '鼻整形高阶技术', author: '曾高', img: '' },
      { id: 'w3', title: '鼻整形高阶技术', author: '曾高', img: '' },
      { id: 'w4', title: '鼻整形高阶技术', author: '曾高', img: '' }
    ],

    // 学术课程示例数据
    courseList: [
      { id: 'cs1', title: '鼻整形高阶技术', lecturer: '曾高', isFree: true, organization: '中国整形美容协会美容医学教育与管理分会专委会', img: '', tags: ['系列课', '论坛讲座'] },
      { id: 'cs2', title: '医生IP打造', lecturer: '龙承万', isFree: false, organization: '中国整形美容协会美容医学教育与管理分会专委会', img: '', tags: ['系列课'] }
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
      bannerOverlapPx: Math.round(bannerH / 3),
      headerPadBottomPx: Math.round(bannerH / 3),
      navBarHeightPx
    });
  },
  onShow() {
    // 热编译或从其他页面返回时，重新计算一次，确保样式更新立即生效
    const sys = wx.getSystemInfoSync();
    const winW = sys.windowWidth;
    const rpx2px = winW / 750;
    const bannerW = winW - 60 * rpx2px;
    const bannerH = Math.round((bannerW * 9) / 16);

    let navBarHeightPx = this.data.navBarHeightPx || 44;
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

  // 跳转类交互（后续对接真实页面时替换）
  onTapSectionMore(e) {
    const type = e.currentTarget.dataset.type;
    console.log('more:', type);
    
    // 跳转到学术动态页面
    if (type === 'news') {
      wx.navigateTo({
        url: '/pages/academic-news/index'
      });
    } else if (type === 'conf') {
      // 跳转到学术会议列表
      wx.navigateTo({
        url: '/pages/academic-conference/index'
      });
    }
  },
  onTapNewsItem(e) {
    const id = e.currentTarget.dataset.id;
    console.log('news item:', id);
  },
  onTapConfItem(e) {
    const id = e.currentTarget.dataset.id;
    console.log('conf item:', id);
    // 跳转到学术会议列表（暂无详情页，先进入列表，可根据 id 做预选）
    wx.navigateTo({
      url: `/pages/academic-conference/index?from=academic&id=${id}`
    });
  },
  onTapOrgItem(e) {
    const id = e.currentTarget.dataset.id;
    console.log('org item:', id);
  },
  onTapContestItem(e) {
    const id = e.currentTarget.dataset.id;
    console.log('contest item:', id);
  },

  // 学术著作项目点击
  onTapWorkItem(e) {
    const { id } = e.currentTarget.dataset;
    console.log('点击学术著作:', id);
    // TODO: 跳转到学术著作详情页
  },

  // 学术课程项目点击
  onTapCourseItem(e) {
    const { id } = e.currentTarget.dataset;
    console.log('点击学术课程:', id);
    // TODO: 跳转到学术课程详情页
  },

  // 宫格按钮点击
  onTapGridItem(e) {
    const type = e.currentTarget.dataset.type;
    console.log('grid item:', type);
    
    // 跳转到学术动态页面
    if (type === 'news') {
      wx.navigateTo({
        url: '/pages/academic-news/index'
      });
    } else if (type === 'conference') {
      // 跳转到学术会议列表
      wx.navigateTo({
        url: '/pages/academic-conference/index'
      });
    }
  },

  goBack() {
    wx.navigateBack({ delta: 1 });
  },
  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value });
  },
  onSearchConfirm() {}
});