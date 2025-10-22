    // 岗位链高级筛选页面
Page({
  data: {
    searchValue: '', // 搜索框内容
    statusBarHeight: 0, // 状态栏高度
    
    // 筛选数据
    filterData: {
      // 姓名首字母
    nameInitials: [
      { id: 1, name: 'A', selected: false },
      { id: 2, name: 'B', selected: false },
      { id: 3, name: 'C', selected: false },
      { id: 4, name: 'D', selected: false },
      { id: 5, name: 'E', selected: false },
      { id: 6, name: 'F', selected: false },
      { id: 7, name: 'G', selected: false },
      { id: 8, name: 'H', selected: false },
      { id: 9, name: 'I', selected: false },
      { id: 10, name: 'J', selected: false },
      { id: 11, name: 'K', selected: false },
      { id: 12, name: 'L', selected: false },
      { id: 13, name: 'M', selected: false },
      { id: 14, name: 'N', selected: false },
      { id: 15, name: 'O', selected: false },
      { id: 16, name: 'P', selected: false },
      { id: 17, name: 'Q', selected: false },
      { id: 18, name: 'R', selected: false },
      { id: 19, name: 'S', selected: false },
      { id: 20, name: 'T', selected: false },
      { id: 21, name: 'U', selected: false },
      { id: 22, name: 'W', selected: false },
      { id: 23, name: 'X', selected: false },
      { id: 24, name: 'Y', selected: false },
      { id: 25, name: 'Z', selected: false }
    ],
      
      // 职业地区
      regions: [
        { id: 'beijing', name: '北京', selected: false },
        { id: 'shanghai', name: '上海', selected: false },
        { id: 'guangzhou', name: '广州', selected: false },
        { id: 'chengdu', name: '成都', selected: false },
        { id: 'guangzhou2', name: '广州', selected: false },
        { id: 'chengdu2', name: '成都', selected: false }
      ],
      
      // 职称评定
      titles: [
        { id: 'chief_doctor', name: '主任医师', selected: false },
        { id: 'deputy_chief_doctor', name: '副主任医师', selected: false },
        { id: 'attending_doctor', name: '主治医师', selected: false },
        { id: 'resident_doctor', name: '住院医师', selected: false }
      ],
      
      // 增长学科
      subjects: [
        { id: 'clinical_medicine', name: '临床医学', selected: false },
        { id: 'deputy_chief_doctor2', name: '副主任医师', selected: false },
        { id: 'attending_doctor2', name: '主治医师', selected: false },
        { id: 'resident_doctor2', name: '住院医师', selected: false }
      ],
      
      // 职业岗位
      positions: [
        { id: 'clinical_medicine2', name: '临床医学', selected: false },
        { id: 'deputy_chief_doctor3', name: '副主任医师', selected: false },
        { id: 'attending_doctor3', name: '主治医师', selected: false },
        { id: 'resident_doctor3', name: '住院医师', selected: false }
      ],
      
      // 头衔评定
      headTitles: [
        { id: 'clinical_medicine3', name: '临床医学', selected: false },
        { id: 'deputy_chief_doctor4', name: '副主任医师', selected: false },
        { id: 'attending_doctor4', name: '主治医师', selected: false },
        { id: 'resident_doctor4', name: '住院医师', selected: false }
      ],
      
      // 主讲课程
      courses: [
        { id: 'clinical_medicine4', name: '临床医学', selected: false },
        { id: 'deputy_chief_doctor5', name: '副主任医师', selected: false },
        { id: 'attending_doctor5', name: '主治医师', selected: false },
        { id: 'resident_doctor5', name: '住院医师', selected: false }
      ],
      
      // 技术成果
      achievements: [
        { id: 'clinical_medicine5', name: '临床医学', selected: false },
        { id: 'deputy_chief_doctor6', name: '副主任医师', selected: false },
        { id: 'attending_doctor6', name: '主治医师', selected: false },
        { id: 'resident_doctor6', name: '住院医师', selected: false }
      ]
    }
  },

  onLoad: function (options) {
    // 获取系统信息，设置状态栏高度
    const systemInfo = wx.getSystemInfoSync();
    const statusBarHeight = systemInfo.statusBarHeight || 0;
    
    // 设置CSS变量
    wx.nextTick(() => {
      const query = wx.createSelectorQuery().in(this);
      query.select('.filter-container').boundingClientRect();
      query.exec(() => {
        // 通过页面样式设置状态栏高度
        this.setData({
          statusBarHeight: statusBarHeight
        });
      });
    });
  },

  // 搜索框输入事件
  onSearchInput: function(e) {
    this.setData({
      searchValue: e.detail.value
    });
  },

  // 清空搜索
  onClearSearch: function() {
    this.setData({
      searchValue: ''
    });
  },

  // 关闭页面
  onClosePage: function() {
    wx.navigateBack();
  },

  // 筛选项点击事件
  onFilterItemTap: function(e) {
    const { category, index } = e.currentTarget.dataset;
    const filterData = this.data.filterData;
    
    // 切换选中状态
    filterData[category][index].selected = !filterData[category][index].selected;
    
    this.setData({
      filterData: filterData
    });
  },

  // 重置筛选
  onReset: function() {
    const filterData = this.data.filterData;
    
    // 重置所有选中状态
    Object.keys(filterData).forEach(category => {
      filterData[category].forEach(item => {
        item.selected = false;
      });
    });
    
    this.setData({
      filterData: filterData,
      searchValue: ''
    });
  },

  // 完成筛选
  onComplete: function() {
    const filterData = this.data.filterData;
    const selectedFilters = {};
    
    // 收集所有选中的筛选项
    Object.keys(filterData).forEach(category => {
      selectedFilters[category] = filterData[category].filter(item => item.selected);
    });
    
    // 返回上一页并传递筛选结果
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    
    if (prevPage) {
      prevPage.setData({
        selectedFilters: selectedFilters
      });
    }
    
    wx.navigateBack();
  }
});