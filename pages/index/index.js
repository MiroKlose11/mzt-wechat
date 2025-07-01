// index.js
const { iconUrls } = require('../../utils/icons');

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
    
    // 功能图标
    iconGrid: [
      [
        { id: 'person', name: '人员链', icon: '/images/icons/person.png' },
        { id: 'position', name: '岗位链', icon: '/images/icons/position.png' },
        { id: 'machine', name: '械科链', icon: '/images/icons/machine.png' },
        { id: 'academic', name: '学术链', icon: '/images/icons/academic.png' },
        { id: 'tech', name: '技术链', icon: '/images/icons/tech.png' }
      ],
      [
        { id: 'course', name: '课程链', icon: '/images/icons/course.png' },
        { id: 'org', name: '机构链', icon: '/images/icons/org.png' },
        { id: 'research', name: '科研链', icon: '/images/icons/research.png' },
        { id: 'project', name: '品项链', icon: '/images/icons/project.png' },
        { id: 'smart', name: '智库链', icon: '/images/icons/smart.png' }
      ]
    ],
    
    // 快捷功能
    quickFunctions: [
      { id: 1, name: '美职通', icon: '/images/functions/job.png', bgColor: 'red' },
      { id: 2, name: '鼻大师', icon: '/images/functions/doctor.png', bgColor: 'blue' },
      { id: 3, name: '针美大师', icon: '/images/functions/beauty.png', bgColor: 'green' },
      { id: 4, name: '美鼻时代', icon: '/images/functions/agent.png', bgColor: 'purple' },
      { id: 5, name: '奥秘龄', icon: '/images/functions/lab.png', bgColor: 'green-dark' }
    ],
    
    // 精品课程
    courses: [
      {
        id: 1,
        name: '营养保健师',
        desc: '健康服务专业资格证培训课程',
        image: '/images/courses/nutrition.png',
        tags: ['初级', '中级', '高级', '营养师', '保健师'],
        org: '营养保健系统课程联合会'
      },
      {
        id: 2,
        name: '心理咨询师·初级',
        desc: '专业技能授权培训课程体系课程',
        image: '/images/courses/psychology.png',
        tags: ['初级', '中级', '高级', '心理学', '咨询师'],
        org: '心理认知高级研修协会'
      }
    ],
    
    // 职业过滤
    professionFilters: [
      { id: 'doctor', name: '医生', active: true },
      { id: 'consultant', name: '咨询师', active: false },
      { id: 'quality', name: '质群师', active: false },
      { id: 'planner', name: '企划运营', active: false },
      { id: 'more', name: '更多职业', active: false }
    ],
    
    // 精英列表
    elites: [
      [
        { id: 1, name: '曾高', avatar: '/images/avatars/doctor1.png' },
        { id: 2, name: '罗德丰', avatar: '/images/avatars/doctor2.png' },
        { id: 3, name: '周柯', avatar: '/images/avatars/doctor3.png' },
        { id: 4, name: '王旭明', avatar: '/images/avatars/doctor4.png' }
      ],
      [
        { id: 5, name: '戴传昌', avatar: '/images/avatars/doctor5.png' },
        { id: 6, name: '白向有', avatar: '/images/avatars/doctor6.png' },
        { id: 7, name: '谭书友', avatar: '/images/avatars/doctor7.png' },
        { id: 8, name: '杜亚东', avatar: '/images/avatars/doctor8.png' }
      ]
    ],
    
    // 学术活动
    academicNews: [
      {
        id: 1,
        title: '第二届长安美调西部医学整形美容高峰论坛将于11月22日在西安召开',
        image: '/images/news/conference.jpg',
        time: '09-06 14:36'
      },
      {
        id: 2,
        title: '世界内镜医师协会中国整形美容西部联盟年会将于12月在成都召开',
        image: '/images/news/midautumn.jpg',
        time: '09-06 13:58'
      }
    ],
    
    // 好碰优品
    goodsItems: {
      featured: {
        id: 1,
        title: 'VR展示',
        subtitle: '预览效果图',
        image: '/images/goods/vr.png',
        isNew: true
      },
      daily: {
        id: 2,
        title: '今日爆品',
        subtitle: '每日惊喜享不停',
        image: '/images/goods/daily.png'
      },
      services: [
        {
          id: 3,
          title: '金融服务',
          image: '/images/goods/finance.png'
        },
        {
          id: 4,
          title: '工地直播',
          image: '/images/goods/site.png'
        }
      ],
      ads: [
        { id: 1, image: '/images/goods/ad1.jpg' },
        { id: 2, image: '/images/goods/ad2.jpg' }
      ]
    },
    
    // 合作机构
    partners: {
      liveBanner: {
        id: 1,
        image: '/images/partners/live.jpg',
        title: '直击工厂 大型直播'
      },
      products: [
        {
          id: 1,
          name: '山东烟台黄金奶油油桃',
          image: '/images/products/fruit.jpg'
        },
        {
          id: 2,
          name: '【10支装】日式马',
          image: '/images/products/mask.jpg'
        },
        {
          id: 3,
          name: '祛黑眼圈！淡化细纹',
          image: '/images/products/cream.jpg'
        }
      ]
    },
    
    // 医生集团
    doctorGroups: [
      {
        id: 1,
        mainName: '鱼脂道',
        subName: '医生集团',
        image: '/images/doctor-groups/group1.png',
        bgColor: '#ffecf1'
      },
      {
        id: 2,
        mainName: '美鼻时代',
        subName: '医生集团',
        image: '/images/doctor-groups/group2.png',
        bgColor: '#fff8e6'
      },
      {
        id: 3,
        mainName: '美云联',
        subName: '医生集团',
        image: '/images/doctor-groups/group3.png',
        bgColor: '#e6f3ff'
      }
    ],
    
    // 医学院校
    schools: [
      { id: 1, name: '宜春学院美容医学院', image: '/images/schools/school1.jpg' },
      { id: 2, name: '锦州医科大学', image: '/images/schools/school2.jpg' },
      { id: 3, name: '大连医科大学', image: '/images/schools/school3.jpg' },
      { id: 4, name: '宜春学院美容医学院', image: '/images/schools/school4.jpg' },
      { id: 5, name: '宜春学院美容医学院', image: '/images/schools/school5.jpg' }
    ],
    
    // 教育按钮
    educationButtons: [
      { id: 1, name: '继续教育', icon: '/images/icons/education.png', color: '#ffaa00' },
      { id: 2, name: '委培岗位', icon: '/images/icons/training.png', color: '#4b99ff' }
    ],
    
    // 技术成果
    techTabs: [
      { id: 'patent', name: '专利技术', active: true },
      { id: 'special', name: '特色技术', active: false },
      { id: 'academic', name: '学术论文', active: false },
      { id: 'books', name: '著作编译', active: false }
    ],
    
    techItems: [
      [
        { id: 1, name: '鼻整形', image: '/images/tech/tech1.png' },
        { id: 2, name: '脂肪整形', image: '/images/tech/tech2.png' },
        { id: 3, name: '注射美容', image: '/images/tech/tech3.png' },
        { id: 4, name: '乳房整形', image: '/images/tech/tech4.png' },
        { id: 5, name: '眼整形', image: '/images/tech/tech5.png' }
      ],
      [
        { id: 6, name: '私密整形', image: '/images/tech/tech6.png' },
        { id: 7, name: '皮肤美容', image: '/images/tech/tech7.png' },
        { id: 8, name: '颌面整形', image: '/images/tech/tech8.png' },
        { id: 9, name: '口腔美容', image: '/images/tech/tech9.png' },
        { id: 10, name: '毛发整形', image: '/images/tech/tech10.png' }
      ]
    ],
    
    // 美链智库
    smartTabs: [
      { id: 'law', name: '法律法规', active: true },
      { id: 'research', name: '研究报告', active: false },
      { id: 'data', name: '产业数据', active: false },
      { id: 'column', name: '大咖专栏', active: false }
    ],
    
    smartItems: {
      credit: {
        id: 1,
        title: '个人征信查询',
        subtitle: '在线查询便捷贴心',
        link: '去查看 >',
        image: '/images/smart/credit.png'
      },
      services: [
        {
          id: 2,
          title: '医保凭证',
          subtitle: '购物就医免带卡',
          icon: '/images/smart/medical.png'
        },
        {
          id: 3,
          title: '法律援助',
          subtitle: '免费法律咨询',
          icon: '/images/smart/law.png'
        }
      ]
    },
    
    currentBanner: 0
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
  }
})
