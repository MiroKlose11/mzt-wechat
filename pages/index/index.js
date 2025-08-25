// index.js
const { iconUrls } = require('../../utils/icons');
const api = require('../../utils/api');

Page({
  data: {
    // 当前主导航
    currentNav: 'home',
    
    // 下拉刷新状态
    isRefreshing: false,
    
    // 顶部导航
    navTabs: [
      { id: 'home', name: '首页', active: true },
      { id: 'news', name: '新闻资讯', active: false },
      { id: 'about', name: '了解研究院', active: false },
      { id: 'business', name: '商务合作', active: false }
    ],
    
    // 职业过滤（如有用到）
    professionFilters: [
      { id: 'doctor', name: '医生', active: true },
      { id: 'consultant', name: '咨询师', active: false },
      { id: 'quality', name: '质群师', active: false },
      { id: 'planner', name: '企划运营', active: false },
      { id: 'more', name: '更多职业', active: false }
    ],
    
    // 后端动态数据
    currentBanner: 0,
    showBackToTop: false,
    banners: [],
    categories: [],
    iconCategories: [],
    iconRows: [],
    quickCategories: [],
    eliteCategories: [],
    techCategories: [],
    smartCategories: [],
    eliteMembers: [], // 当前tab下成员
    eliteMembersTop8: [],
    roleList: [],     // 后端返回的所有角色
    activeEliteCategory: '', // 当前激活tab分类名
    _eliteReady: false, // 标记eliteCategories是否已到
    _roleReady: false,  // 标记roleList是否已到
    _eliteInitDone: false, // 防止重复初始化
    courses: [],
    schools: [],
    schoolsFirstRow: [], // 权重最高的5个学校，供医学院校模块渲染
    schoolsSecondRow: [], // 权重最高的5个学校，供医学院校模块渲染
  },
  
  onLoad() {
    // 页面加载时执行的逻辑
    console.log('首页加载完成');
    this.setTabBarStyle();
    
    // 获取系统信息设置状态栏高度
    wx.getSystemInfo({
      success: (res) => {
          this.setData({
          statusBarHeight: res.statusBarHeight
          });
      }
    });
    
    this.fetchBanner();
    this.fetchCategories();
    this.fetchRoleList();
    this.fetchCourses();
    this.fetchSchools();
  },
  
  onShow() {
    // 每次显示页面时执行
  },
  
  onPullDownRefresh() {
    // 下拉刷新逻辑
    console.log('下拉刷新');
    this.setData({ isRefreshing: true });
    
    // 模拟数据刷新
    setTimeout(() => {
      // 更新完成后，关闭下拉刷新
      this.setData({ isRefreshing: false });
      wx.stopPullDownRefresh();
    }, 1500);
  },
  
  // 设置TabBar样式
  setTabBarStyle() {
    // 如果需要动态设置TabBar样式
    wx.setTabBarStyle({
      color: '#999999',
      selectedColor: '#4B99FF',
      backgroundColor: '#ffffff',
      borderStyle: 'white'
    });
  },
  
  // 切换顶部导航
  switchNavTab(e) {
    const id = e.currentTarget.dataset.id;
    const navTabs = this.data.navTabs.map(tab => {
      return { ...tab, active: tab.id === id };
    });
    this.setData({ navTabs });
  },
  
  // 点击功能图标
  onIconTap(e) {
    const id = e.currentTarget.dataset.id;
    console.log('点击功能图标：', id);
    // 根据不同的图标跳转到不同的页面
    wx.navigateTo({
      url: `/pages/function/detail?id=${id}`
    });
  },
  
  // 点击快捷功能
  onQuickFunctionTap(e) {
    const id = e.currentTarget.dataset.id;
    console.log('点击快捷功能：', id);
    
    switch(id) {
      case 1: // 美职通
        wx.navigateTo({ url: '/pages/career/index' });
        break;
      case 2: // 鼻大师
        wx.navigateTo({ url: '/pages/nose/master' });
        break;
      case 3: // 针美大师
        wx.navigateTo({ url: '/pages/beauty/master' });
        break;
      case 4: // 美鼻时代
        wx.navigateTo({ url: '/pages/nose/era' });
        break;
      case 5: // 奥秘龄
        wx.navigateTo({ url: '/pages/secret/age' });
        break;
    }
  },
  
  // 查看更多课程
  viewMoreCourses() {
    wx.navigateTo({
      url: '/pages/course/list'
    });
  },
  
  // 查看课程详情
  viewCourseDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/course/detail?id=${id}`
    });
  },
  
  // 切换职业过滤器
  switchProfessionFilter(e) {
    const id = e.currentTarget.dataset.id;
    const professionFilters = this.data.professionFilters.map(filter => {
      return { ...filter, active: filter.id === id };
    });
    this.setData({ professionFilters });
    // 加载对应职业的精英数据
    this.loadElitesByProfession(id);
  },
  
  // 加载指定职业的精英
  loadElitesByProfession(professionId) {
    // 实际应用中可能需要请求后端API
    console.log('加载职业精英：', professionId);
  },
  
  // 查看精英详情
  viewEliteDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/elite/detail?id=${id}`
    });
  },
  
  // 了解更多活动
  viewMoreActivity() {
    wx.navigateTo({
      url: '/pages/activity/detail'
    });
  },
  
  // 切换主导航
  switchMainNav(e) {
    const nav = e.currentTarget.dataset.nav;
    this.setData({
      currentNav: nav
    });
    
    // 可以在这里加载对应页面的数据
    console.log('切换到导航:', nav);
  },
  
  onSwiperChange: function(e) {
    this.setData({
      currentBanner: e.detail.current
    });
  },
  
  onPageScroll: function(e) {
    this.setData({
      showBackToTop: e.scrollTop > 100
    });
  },
  
  backToTop: function() {
    wx.pageScrollTo({ scrollTop: 0, duration: 100 });
  },
  
  fetchBanner() {
    api.index.getBanner().then(result => {
      this.setData({ banners: result.data || [] });
    }).catch(error => {
      console.error('获取Banner失败:', error);
    });
  },

  fetchCourses() {
    api.course.getList().then(result => {
      this.setData({
        courses: (result.data || []).slice(0, 2)
      });
    }).catch(error => {
      console.error('获取课程列表失败:', error);
    });
  },

  // 新增：初始化tab和成员
  initEliteTabAndMembers() {
    if (
      !this.data._eliteInitDone &&
      this.data._eliteReady &&
      this.data._roleReady &&
      this.data.eliteCategories &&
      this.data.eliteCategories.length > 0 &&
      this.data.roleList &&
      this.data.roleList.length > 0
    ) {
      this.setData({ _eliteInitDone: true });
      let doctorTab = this.data.eliteCategories.find(item => item.name === '医生');
      if (doctorTab) {
        this.setData({ activeEliteCategory: doctorTab.name });
        this.fetchEliteMembersByCategory(doctorTab.name);
      } else {
        this.setData({ activeEliteCategory: this.data.eliteCategories[0].name });
        this.fetchEliteMembersByCategory(this.data.eliteCategories[0].name);
      }
    }
  },

  fetchCategories() {
    api.index.getCategories().then(result => {
      const data = result.data || {};
      let iconCategories = (data.icon || []).slice();
      iconCategories.sort((a, b) => (a.sort || 0) - (b.sort || 0));
      let quickCategories = (data.quick || []).slice();
      quickCategories.sort((a, b) => (a.sort || 0) - (b.sort || 0));
      const quickColors = ['#ff6b6b', '#1ecaff', '#2ecc71', '#b39ddb', '#1abc9c'];
      quickCategories = quickCategories.map((item, idx) => ({
        ...item,
        iconBgColor: item.iconBgColor || quickColors[idx % quickColors.length]
      }));
      let eliteCategories = (data.elite || []).slice();
      eliteCategories.sort((a, b) => (a.sort || 0) - (b.sort || 0));
      let techCategories = (data.tech || []).slice();
      techCategories.sort((a, b) => (a.sort || 0) - (b.sort || 0));
      let smartCategories = (data.smart || []).slice();
      smartCategories.sort((a, b) => (a.sort || 0) - (b.sort || 0));
      let positionCategories = (data.position || []).slice();
      positionCategories.sort((a, b) => (a.sort || 0) - (b.sort || 0));
      this.setData({
        iconCategories,
        iconRows: [
          iconCategories.slice(0, 5),
          iconCategories.slice(5, 10)
        ],
        quickCategories,
        eliteCategories,
        techCategories,
        smartCategories,
        positionCategories,
        _eliteReady: true
      }, () => {
        this.initEliteTabAndMembers();
      });
    }).catch(error => {
      console.error('获取分类数据失败:', error);
    });
  },
  
  // 获取所有角色列表
  fetchRoleList() {
    api.role.getList().then(result => {
      console.log('角色列表接口返回', result);
      this.setData({ roleList: result.data || [], _roleReady: true }, () => {
        this.initEliteTabAndMembers();
      });
    }).catch(error => {
      console.error('获取角色列表失败:', error);
    });
  },
  
  // 根据tab分类项名称查找角色并请求成员
  fetchEliteMembersByCategory(categoryName) {
    console.log('查找角色', categoryName, this.data.roleList);
    const role = (this.data.roleList || []).find(r => r.name === categoryName);
    if (role) {
      console.log('找到角色', role);
      this.fetchEliteMembers(role.id);
    } else {
      console.log('未找到角色', categoryName);
      this.setData({ eliteMembers: [] }); // 没有对应角色则清空
    }
  },

  // 请求成员列表
  fetchEliteMembers(roleId) {
    console.log('请求成员列表，roleId:', roleId);
    api.member.getPage({
      roleId: roleId,
      status: 1,
      size: 50, // 一次最多取50条
      current: 1
    }).then(result => {
      console.log('成员接口返回', result);
      let members = (result.data && result.data.records) ? result.data.records : [];
      // 只显示isElite为1的成员，并按weight降序排列
      members = members.filter(item => item.isElite === 1).sort((a, b) => (b.weight || 0) - (a.weight || 0));
      this.setData({
        eliteMembers: members,
        eliteMembersTop8: members.slice(0, 8)
      });
    }).catch(error => {
      console.error('获取成员列表失败:', error);
    });
  },

  // tab切换事件（假设tab项有data-name属性）
  onEliteCategoryTab(e) {
    const categoryName = e.currentTarget.dataset.name;
    this.setData({ activeEliteCategory: categoryName });
    this.fetchEliteMembersByCategory(categoryName);
  },

  fetchSchools() {
    api.organization.getList().then(result => {
      let schools = (result.data || []).filter(item => item.typeId === 3);
      schools = schools.sort((a, b) => (b.weight || 0) - (a.weight || 0));
      this.setData({
        schools,
        schoolsFirstRow: schools.slice(0, 3),
        schoolsSecondRow: schools.slice(3, 5)
      });
    }).catch(error => {
      console.error('获取机构列表失败:', error);
    });
  },

  goToPersonnel() {
    console.log('点击了消息按钮，准备跳转到人员链页面');
    wx.navigateTo({
      url: '/pages/personnel/index',
      fail: function(err) {
        console.error('跳转失败', err);
      }
    });
  }
})
