Page({
  data: {
    statusBarHeight: 20,
    guest: {
      name: '岳大鹏',
      desc: '甘南藏族自治州 单尼一中(初三)',
      avatar: '/images/avatars/avatar1.png'
    },
    schedules: [
      { id: 's1', date: '2025.9.27–28', time: '8:30–9:00', title: '理念重塑：从“粗放填充”到“三维精准诊断”', place: '一楼荧光厅', hall: '大会开幕式' },
      { id: 's2', date: '2025.9.27–28', time: '8:30–9:00', title: '2025第三届鲁脂道医生集团脂肪整形与再生医学学术年会开幕式', place: '一楼荧光厅', hall: '大会开幕式' },
      { id: 's3', date: '2025.9.27–28', time: '8:30–9:00', title: '理念重塑：从“粗放填充”到“三维精准诊断”', place: '一楼荧光厅', hall: '大会开幕式' },
      { id: 's4', date: '2025.9.27–28', time: '8:30–9:00', title: '2025第三届鲁脂道医生集团脂肪整形与再生医学学术年会开幕式', place: '一楼荧光厅', hall: '大会开幕式' },
      { id: 's5', date: '2025.9.27–28', time: '8:30–9:00', title: '2025第三届鲁脂道医生集团脂肪整形与再生医学学术年会开幕式', place: '一楼荧光厅', hall: '大会开幕式' }
    ]
  },

  onLoad(query) {
    const sys = wx.getSystemInfoSync();
    const statusBarHeight = sys.statusBarHeight || 20;
    this.setData({ statusBarHeight });

    // 可根据 query.id 加载真实嘉宾与日程
    if (query && query.id) {
      // TODO: 拉取接口数据
    }
  },

  goBack() {
    wx.navigateBack({ fail: () => wx.switchTab({ url: '/pages/index/index' }) });
  },

  openHomepage() {
    wx.showToast({ title: '打开个人主页', icon: 'none' });
  }
});