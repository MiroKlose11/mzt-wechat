// index.js
const { iconUrls } = require('../../utils/icons');

Page({
  data: {
    // 轮播图配置
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    currentSwiper: 0,
    statusBarHeight: 0, // 状态栏高度
    
    banners: [], // 顶部轮播图数据
    introductionBanners: [], // 平台介绍轮播图数据
    
    // 服务项目数据
    serviceItems: [
      { icon: iconUrls.integrated_training, name: '医美综合培训' },
      { icon: iconUrls.specialized_training, name: '医美专科培训' },
      { icon: iconUrls.career_planning, name: '职业生涯规划' },
      { icon: iconUrls.clinical_orientation, name: '临床定向委培' },
      { icon: iconUrls.job_guidance, name: '临床就业指导' },
      { icon: iconUrls.talent_exchange, name: '人才交流活动' }
    ],
    
    // 平台项目数据
    platformItems: [
      { icon: iconUrls.clinical_hospital, name: '临床院校' },
      { icon: iconUrls.medical_institution, name: '医美机构' },
      { icon: iconUrls.medical_position, name: '医美岗位' },
      { icon: iconUrls.medical_course, name: '医美课程' },
      { icon: iconUrls.teacher_team, name: '师资队伍' },
      { icon: iconUrls.student, name: '毕业生' },
      { icon: iconUrls.excellent_student, name: '优秀学员' },
      { icon: iconUrls.ability_certification, name: '能力认证' }
    ],
    
    // 课程数据
    courseItems: [
      { icon: iconUrls.anti_aging, name: '抗衰整形' },
      { icon: iconUrls.nose_surgery, name: '鼻整形' },
      { icon: iconUrls.fat_sculpting, name: '脂肪整形' },
      { icon: iconUrls.consultant, name: '咨询师' },
      { icon: iconUrls.doctor_ip, name: '医生IP' },
      { icon: iconUrls.career_guidance, name: '就业指导' }
    ],
    
    // 岗位数据
    positionItems: [
      { icon: iconUrls.doctor_tech, name: '医生技术岗' },
      { icon: iconUrls.sales_consultant, name: '销售咨询岗' },
      { icon: iconUrls.service_support, name: '服务支持岗' },
      { icon: iconUrls.operations, name: '运营营销岗' },
      { icon: iconUrls.admin, name: '行政职能类' },
      { icon: iconUrls.other, name: '其他延伸岗' }
    ]
  },
  
  onLoad() {
    // 获取状态栏高度
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight
    });
    
    // 获取轮播图数据
    this.fetchBanners();
    this.fetchIntroductionBanners();
    
    console.log('首页加载完成');
  },
  
  // 获取顶部轮播图数据
  fetchBanners() {
    wx.request({
      url: 'http://localhost:8080/index/banners',
      method: 'GET',
      success: (res) => {
        if (res.data && res.data.code === 200) {
          this.setData({
            banners: res.data.data
          });
        }
      },
      fail: (err) => {
        console.error('获取顶部轮播图失败', err);
      }
    });
  },
  
  // 获取平台介绍轮播图数据
  fetchIntroductionBanners() {
    wx.request({
      url: 'http://localhost:8080/index/introduction-banners',
      method: 'GET',
      success: (res) => {
        if (res.data && res.data.code === 200) {
          this.setData({
            introductionBanners: res.data.data
          });
        }
      },
      fail: (err) => {
        console.error('获取平台介绍轮播图失败', err);
      }
    });
  },
  
  // 轮播图切换事件
  swiperChange(e) {
    const { current } = e.detail;
    this.setData({
      currentSwiper: current
    });
  },
  
  // 导航到详情页
  navigateToDetail(e) {
    const { type, index } = e.currentTarget.dataset;
    let itemData = {};
    
    switch(type) {
      case 'service':
        itemData = this.data.serviceItems[index];
        break;
      case 'platform':
        itemData = this.data.platformItems[index];
        break;
      case 'course':
        itemData = this.data.courseItems[index];
        break;
      case 'position':
        itemData = this.data.positionItems[index];
        break;
    }
    
    // 准备导航参数
    let typeText = '';
    switch(type) {
      case 'service':
        typeText = '服务项目';
        break;
      case 'platform':
        typeText = '平台项目';
        break;
      case 'course':
        typeText = '课程项目';
        break;
      case 'position':
        typeText = '岗位类型';
        break;
    }
    
    wx.navigateTo({
      url: `/pages/detail/detail?type=${typeText}&name=${itemData.name}&icon=${encodeURIComponent(itemData.icon)}`
    });
  }
})
