Page({
  data: {
    statusBarHeight: 20,
    keyword: '',
    showDetail: false,
    sessionDetail: {
      title: '',
      date: '',
      time: '',
      venue: '',
      host: null,
      nodes: []
    },
    dates: [
      { id: 1, mmdd: '05.09', week: '星期一' },
      { id: 2, mmdd: '05.10', week: '星期二' },
      { id: 3, mmdd: '05.11', week: '星期三' },
      { id: 4, mmdd: '05.12', week: '星期四' },
      { id: 5, mmdd: '05.13', week: '星期五' },
      { id: 6, mmdd: '05.14', week: '星期六' },
      { id: 7, mmdd: '05.15', week: '星期日' }
    ],
    activeDateId: 1,
    venues: [
      { id: 101, floor: '一楼', name: '宏光厅' },
      { id: 102, floor: '二楼', name: '宏明厅' },
      { id: 103, floor: '二楼', name: '宏伟厅' },
      { id: 104, floor: '三楼', name: '学术厅' }
    ],
    activeVenueId: 101,
    sessions: [
      // 模拟数据：按日期与会场区分
      { id: 's1', dateId: 1, venueId: 101, time: '8:30-9:00', title: '2025第三届鲁脂道医美集团脂肪整形与再生医学学术年会开幕式' },
      { id: 's2', dateId: 1, venueId: 101, time: '9:00-9:30', title: '脂肪移植关键技术进展' },
      { id: 's3', dateId: 1, venueId: 102, time: '8:30-9:00', title: '面部年轻化新策略' },
      { id: 's4', dateId: 2, venueId: 101, time: '8:30-9:00', title: '干细胞与再生应用前沿' }
    ],
    filteredSessions: []
  },

  onLoad() {
    const sys = wx.getSystemInfoSync();
    const statusBarHeight = sys.statusBarHeight || 20;
    this.setData({ statusBarHeight }, () => {
      this.applyFilter();
    });
  },

  // 返回
  goBack() {
    if (this.data.showDetail) {
      this.setData({ showDetail: false });
    } else {
      wx.navigateBack({ fail: () => wx.switchTab({ url: '/pages/index/index' }) });
    }
  },

  // 输入与搜索
  onKeywordInput(e) {
    this.setData({ keyword: e.detail.value });
  },
  doSearch() {
    this.applyFilter();
  },

  // 切换日期
  onTapDate(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({ activeDateId: id }, () => this.applyFilter());
  },

  // 切换会场
  onTapVenue(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({ activeVenueId: id }, () => this.applyFilter());
  },

  // 过滤
  applyFilter() {
    const { sessions, activeDateId, activeVenueId, keyword } = this.data;
    const kw = (keyword || '').trim();
    const list = sessions.filter(s => s.dateId === activeDateId && s.venueId === activeVenueId)
      .filter(s => (kw ? s.title.indexOf(kw) !== -1 : true));
    this.setData({ filteredSessions: list });
  },

  // 进入详情
  openSession(e) {
    const id = e.currentTarget.dataset.id;
    // TODO: 根据 id 请求真实数据，这里先用演示数据
    const picked = this.data.sessions.find(s => s.id === id) || {};
    const detail = {
      title: picked.title || '2025第三届鲁脂道医生集团脂肪整形与再生医学学术年会开幕式',
      date: '2025.7.28',
      time: picked.time || '8:30-9:00',
      venue: '一楼 宏光厅',
      host: { name: '周亚刚', desc: '鲁脂道医生集团核心专家', avatar: '/images/avatars/avatar1.png' },
      nodes: [
        {
          time: '8:30-9:00',
          title: '大会开幕式致辞',
          speaker: { name: '周亚刚', desc: '鲁脂道医生集团核心专家', avatar: '/images/avatars/avatar1.png' }
        },
        {
          time: '9:00-9:10',
          title: '开幕式致辞',
          speaker: { name: '周亚刚', desc: '整形再生医学专业委员会秘书长', avatar: '/images/avatars/avatar1.png' }
        },
        {
          time: '9:10-9:20',
          title: '开幕式致辞',
          speaker: { name: '周亚刚', desc: '整形再生医学专业委员会秘书长', avatar: '/images/avatars/avatar1.png' }
        }
      ]
    };
    this.setData({ showDetail: true, sessionDetail: detail });
  }
});