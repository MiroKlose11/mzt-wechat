Page({
  data: {
    statusBarHeight: 0,
    selectedPosition: '全部岗位',
    selectedDept: '临床医疗',
    jobList: [
      { id: 1, title: '主治医生', stars: 4, subtitle: '临床医疗岗' },
      { id: 2, title: '主治医生', stars: 5, subtitle: '临床医疗岗' },
      { id: 3, title: '主治医生', stars: 4, subtitle: '临床医疗岗' },
      { id: 4, title: '主治医生', stars: 5, subtitle: '临床医疗岗' }
    ]
  },

  onLoad() {
    const systemInfo = wx.getSystemInfoSync()
    this.setData({ statusBarHeight: systemInfo.statusBarHeight })
  },

  goBack() {
    wx.navigateBack()
  },

  selectPosition(e) {
    const position = e.currentTarget.dataset.position
    this.setData({ selectedPosition: position })
    // TODO: 根据职位分类过滤右侧数据
  },

  selectDept(e) {
    const dept = e.currentTarget.dataset.dept
    this.setData({ selectedDept: dept })
    // TODO: 根据部门过滤右侧数据
  },

  onMoreTap() {
    // 查看更多
  },

  viewDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}&type=position` })
  }
})