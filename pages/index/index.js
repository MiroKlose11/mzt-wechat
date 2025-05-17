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
    serviceItems: [],
    
    // 平台项目数据
    platformItems: [],
    
    // 课程数据
    courseItems: [],
    
    // 岗位数据
    positionItems: []
  },
  
  onLoad() {
    // 获取状态栏高度 - 使用新的API替代已弃用的wx.getSystemInfoSync
    try {
      const windowInfo = wx.getWindowInfo();
      this.setData({
        statusBarHeight: windowInfo.statusBarHeight
      });
    } catch (e) {
      console.error('获取窗口信息失败', e);
    }
    
    // 获取首页所有数据
    this.fetchAllData();
    
    console.log('首页加载完成');
  },
  
  // 获取首页所有数据
  fetchAllData() {
    wx.showLoading({
      title: '加载中...',
    });
    
    wx.request({
      url: 'http://localhost:8080/index/all',
      method: 'GET',
      success: (res) => {
        wx.hideLoading();
        
        if (res.data && res.data.code === '00000' && res.data.data) {
          const data = res.data.data;
          
          // 设置顶部轮播图数据
          if (Array.isArray(data.topBanners)) {
            this.setData({
              banners: data.topBanners
            });
          }
          
          // 设置平台介绍轮播图数据
          if (Array.isArray(data.introductionBanners)) {
            this.setData({
              introductionBanners: data.introductionBanners
            });
          }
          
          // 设置服务项目数据
          if (Array.isArray(data.services)) {
            this.setData({
              serviceItems: data.services
            });
          }
          
          // 设置平台项目数据
          if (Array.isArray(data.platforms)) {
            this.setData({
              platformItems: data.platforms
            });
          }
          
          // 设置课程数据
          if (Array.isArray(data.courses)) {
            this.setData({
              courseItems: data.courses
            });
          }
          
          // 设置岗位数据
          if (Array.isArray(data.jobs)) {
            this.setData({
              positionItems: data.jobs
            });
          }
        } else {
          wx.showToast({
            title: '数据加载失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        console.error('获取首页数据失败', err);
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        });
      }
    });
  },
  
  // 轮播图切换事件
  swiperChange(e) {
    if (e && e.detail) {
      const { current } = e.detail;
      this.setData({
        currentSwiper: current || 0
      });
    }
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
    
    // 处理icon路径，如果是相对路径，需要转换为完整路径
    let iconUrl = itemData.icon;
    if (iconUrl && !iconUrl.startsWith('http')) {
      // 假设图标存储在服务器的/images/目录下
      iconUrl = `http://localhost:8080/images/${iconUrl}`;
    }
    
    wx.navigateTo({
      url: `/pages/detail/detail?type=${typeText}&name=${itemData.name}&icon=${encodeURIComponent(iconUrl)}`
    });
  }
})
