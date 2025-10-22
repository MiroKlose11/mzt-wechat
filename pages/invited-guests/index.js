Page({
  data: {
    statusBarHeight: 20,
    keyword: '',
    currentAnchor: '',
    selectedLetter: '',
    alpha: ['C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
    availableLetters: {},
    sections: []
  },

  onLoad() {
    const sys = wx.getSystemInfoSync();
    const statusBarHeight = sys.statusBarHeight || 20;
    this.setData({ statusBarHeight });

    // 示例数据（按原型展示C/D两组）
    const guests = [
      { id: 'c1', letter: 'C', name: '周亚刚', desc: '鲁脂道医生集团核心专家', avatar: '/images/avatars/avatar1.png' },
      { id: 'c2', letter: 'C', name: '周亚刚', desc: '鲁脂道医生集团核心专家', avatar: '/images/avatars/avatar1.png' },
      { id: 'c3', letter: 'C', name: '周亚刚', desc: '鲁脂道医生集团核心专家', avatar: '/images/avatars/avatar1.png' },
      { id: 'd1', letter: 'D', name: '周亚刚', desc: '鲁脂道医生集团核心专家', avatar: '/images/avatars/avatar1.png' },
      { id: 'd2', letter: 'D', name: '周亚刚', desc: '鲁脂道医生集团核心专家', avatar: '/images/avatars/avatar1.png' },
      { id: 'd3', letter: 'D', name: '周亚刚', desc: '鲁脂道医生集团核心专家', avatar: '/images/avatars/avatar1.png' }
    ];
    this.guestsAll = guests;
    this.applyFilter();
  },

  // 返回
  goBack() {
    wx.navigateBack({ fail: () => wx.switchTab({ url: '/pages/index/index' }) });
  },

  // 搜索
  onKeywordInput(e) {
    this.setData({ keyword: e.detail.value });
  },
  doSearch() {
    this.applyFilter();
  },

  // 右侧字母索引点击滚动
  tapAlpha(e) {
    const letter = e.currentTarget.dataset.letter;
    if (!this.data.availableLetters[letter]) return;
    this.setData({ currentAnchor: 'sec-' + letter, selectedLetter: letter });
  },

  // 过滤并分组，严格按样式输出
  applyFilter() {
    const kw = (this.data.keyword || '').trim().toLowerCase();
    const list = (this.guestsAll || []).filter(g => {
      if (!kw) return true;
      const name = (g.name || '').toLowerCase();
      const desc = (g.desc || '').toLowerCase();
      return name.indexOf(kw) !== -1 || desc.indexOf(kw) !== -1;
    });

    // 按预设字母字段分组
    const map = {};
    list.forEach(g => {
      const letter = g.letter || 'C';
      if (!map[letter]) map[letter] = [];
      map[letter].push(g);
    });

    const sections = Object.keys(map).sort().map(letter => ({ letter, items: map[letter] }));
    const available = {};
    sections.forEach(s => { available[s.letter] = true; });

    this.setData({ sections, availableLetters: available });
  },

  // 卡片点击
  openGuest(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({ title: '打开嘉宾 ' + id, icon: 'none' });
  },

  // 学术安排详情页
  openSchedule(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/invited-guests/schedule/index?id=' + id });
  }
});