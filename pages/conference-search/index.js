Page({
  data: {
    // 系统信息
    statusBarHeight: 0,
    navBarHeightPx: 88,
    headerPadBottomPx: 0,
    bannerHeightPx: 0,
    bannerOverlapPx: 0,
    
    // 当前选中的分类
    currentCategory: 'medical',
    
    // 选中的专业领域标签
    selectedTags: ['all'],
    
    // 选中的会议地区标签
    selectedRegions: ['all'],
    
    // 搜索关键词
    searchKeyword: '',

    // 底部文章列表（用于展示会议动态样式的卡片）
    articleList: [
      { id: 1, title: '第三届美员时代医生集团学术年会在上海举办！', time: '2025-03-01 15:00', image: '/images/news/news1.svg' },
      { id: 2, title: '激活女性企业家潜力，共探商业向善——长江商学院与卡地亚企业合作项目成功...', time: '2025-03-01 15:00', image: '/images/news/news2.svg' },
      { id: 3, title: '长江基石计划2024年启动仪式暨首次年会成功举办！', time: '2025-03-01 15:00', image: '/images/news/news3.svg' }
    ]
  },

  onLoad(options) {
    this.initSystemInfo();
  },

  // 初始化系统信息
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

  // 返回上一页
  goBack() {
    wx.navigateBack();
  },

  // 搜索输入
  onSearchInput(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
  },

  // 搜索确认
  onSearchConfirm(e) {
    const keyword = e.detail.value.trim();
    if (keyword) {
      this.performSearch(keyword);
    }
  },

  // 执行搜索
  performSearch(keyword) {
    console.log('搜索关键词:', keyword);
    // TODO: 实现搜索逻辑
    wx.showToast({
      title: `搜索: ${keyword}`,
      icon: 'none'
    });
  },

  // 切换分类
  switchCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      currentCategory: category,
      // 切换分类时重置专业领域选择
      selectedTags: ['all']
    });
  },

  // 切换专业领域标签
  toggleTag(e) {
    const tag = e.currentTarget.dataset.tag;
    let { selectedTags } = this.data;
    
    if (tag === 'all') {
      // 选择全部时，清空其他选择
      selectedTags = ['all'];
    } else {
      // 选择具体标签时，移除"全部"
      selectedTags = selectedTags.filter(t => t !== 'all');
      
      if (selectedTags.includes(tag)) {
        // 如果已选中，则取消选择
        selectedTags = selectedTags.filter(t => t !== tag);
        // 如果没有选中任何标签，则默认选择"全部"
        if (selectedTags.length === 0) {
          selectedTags = ['all'];
        }
      } else {
        // 如果未选中，则添加选择
        selectedTags.push(tag);
      }
    }
    
    this.setData({ selectedTags });
    this.onFilterChange();
  },

  // 切换会议地区标签
  toggleRegion(e) {
    const region = e.currentTarget.dataset.region;
    let { selectedRegions } = this.data;
    
    if (region === 'all') {
      // 选择全部时，清空其他选择
      selectedRegions = ['all'];
    } else {
      // 选择具体地区时，移除"全部"
      selectedRegions = selectedRegions.filter(r => r !== 'all');
      
      if (selectedRegions.includes(region)) {
        // 如果已选中，则取消选择
        selectedRegions = selectedRegions.filter(r => r !== region);
        // 如果没有选中任何地区，则默认选择"全部"
        if (selectedRegions.length === 0) {
          selectedRegions = ['all'];
        }
      } else {
        // 如果未选中，则添加选择
        selectedRegions.push(region);
      }
    }
    
    this.setData({ selectedRegions });
    this.onFilterChange();
  },

  // 筛选条件变化时的处理
  onFilterChange() {
    const { currentCategory, selectedTags, selectedRegions } = this.data;
    
    console.log('筛选条件变化:', {
      category: currentCategory,
      tags: selectedTags,
      regions: selectedRegions
    });
    
    // TODO: 根据筛选条件获取会议数据
    this.loadConferenceData();
  },

  // 加载会议数据
  loadConferenceData() {
    // TODO: 实现数据加载逻辑
    wx.showLoading({
      title: '加载中...'
    });
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '筛选完成',
        icon: 'success'
      });
    }, 1000);
  },

  // 点击文章卡片
  onArticleTap(e) {
    const id = e.currentTarget.dataset.id;
    console.log('点击文章:', id);
    // TODO: 跳转文章/会议详情
    wx.showToast({ title: '点击文章 ' + id, icon: 'none' });
  }
});