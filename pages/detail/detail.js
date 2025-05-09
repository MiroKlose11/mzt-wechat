// detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    name: '',
    icon: '',
    description: '',
    details: []
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取传递的参数
    if (options.type && options.name && options.icon) {
      const { type, name } = options;
      const icon = decodeURIComponent(options.icon);
      
      let description = '';
      let details = [];
      
      // 根据类型和名称获取对应的描述
      switch(type) {
        case '服务项目':
          description = this.getServiceDescription(name);
          details = this.getServiceDetails();
          break;
        case '平台项目':
          description = this.getPlatformDescription(name);
          details = this.getPlatformDetails();
          break;
        case '课程项目':
          description = this.getCourseDescription(name);
          details = this.getCourseDetails();
          break;
        case '岗位类型':
          description = this.getPositionDescription(name);
          details = this.getPositionDetails();
          break;
      }
      
      this.setData({
        type,
        name,
        icon,
        description,
        details
      });
      
      // 设置导航栏标题
      wx.setNavigationBarTitle({
        title: name
      });
      
      console.log('详情页数据:', this.data);
    }
  },
  
  // 获取服务描述
  getServiceDescription: function(name) {
    const descriptions = {
      '医美综合培训': '提供医美行业全方位系统培训，涵盖医美理论知识、临床实践、客户沟通等多个方面，帮助学员全面掌握医美技能。',
      '医美专科培训': '针对特定医美专科领域提供深度培训，如微整形、皮肤美容、激光美容等专业技术培训，打造专科领域专家。',
      '职业生涯规划': '为医美从业者提供职业发展规划咨询，分析职业发展路径，制定长期职业目标和实施计划。',
      '临床定向委培': '与医美机构合作，提供定向临床培训，使学员在实际医疗环境中学习和实践，快速成长为合格的医美人才。',
      '临床就业指导': '为毕业学员提供就业指导服务，包括简历制作、面试技巧、就业推荐等，帮助学员成功找到理想工作。',
      '人才交流活动': '组织医美行业人才交流活动，促进行业内部交流与合作，拓展人脉网络，了解行业最新动态。'
    };
    
    return descriptions[name] || '暂无描述';
  },
  
  // 获取服务详情项
  getServiceDetails: function() {
    return [
      { title: '培训周期', content: '3-6个月不等，根据培训内容和学员基础定制' },
      { title: '授课方式', content: '线上线下结合，理论与实践相结合' },
      { title: '证书颁发', content: '完成培训并通过考核后颁发相应证书' },
      { title: '就业支持', content: '提供就业推荐和职业发展指导' }
    ];
  },
  
  // 获取平台描述
  getPlatformDescription: function(name) {
    const descriptions = {
      '临床院校': '与国内知名医学院校合作，提供专业医美教育资源，培养高素质医美人才。',
      '医美机构': '与各类医美机构建立合作关系，提供人才培养、技术支持等服务，促进医美行业规范发展。',
      '医美岗位': '分析医美行业各类岗位需求，提供岗位能力标准和培训方案，帮助人才精准定位。',
      '医美课程': '开发专业医美课程体系，涵盖理论与实践，满足不同层次学员需求。',
      '师资队伍': '汇聚行业顶尖专家和教育名师，打造高水平师资团队，保证培训质量。',
      '毕业生': '跟踪毕业生职业发展情况，提供继续教育和职业支持，建立长期服务关系。',
      '优秀学员': '发掘和培养优秀医美人才，提供更多展示和成长机会，打造行业典范。',
      '能力认证': '建立医美行业能力认证标准，为从业者提供专业资质认证，提升职业竞争力。'
    };
    
    return descriptions[name] || '暂无描述';
  },
  
  // 获取平台详情项
  getPlatformDetails: function() {
    return [
      { title: '合作院校', content: '北京大学医学部、中国医科大学等知名院校' },
      { title: '合作机构', content: '全国各地知名医美机构和连锁品牌' },
      { title: '认证体系', content: '符合国际标准的医美行业能力认证体系' },
      { title: '发展方向', content: '促进医美行业规范化、专业化、国际化发展' }
    ];
  },
  
  // 获取课程描述
  getCourseDescription: function(name) {
    const descriptions = {
      '抗衰整形': '专注于面部抗衰老技术培训，包括注射填充、线雕提升、超声刀等非手术和微创抗衰技术，帮助学员掌握前沿抗衰技术。',
      '鼻整形': '系统学习鼻部整形技术，包括注射隆鼻、膨体隆鼻、自体软骨隆鼻等多种技术，培养专业鼻整形人才。',
      '脂肪整形': '培训脂肪抽吸与填充技术，掌握面部、胸部、臀部等部位的脂肪移植与塑形技术，提升整体美学效果。',
      '咨询师': '培养专业医美咨询师，学习沟通技巧、需求分析、方案设计、心理学知识等，提升咨询转化能力。',
      '医生IP': '帮助医生打造个人专业IP，包括专业定位、品牌塑造、社交媒体运营、内容创作等，提升个人影响力。',
      '就业指导': '为医美从业者提供就业培训与指导，包括职场技能、简历制作、面试技巧、职业规划等内容。'
    };
    
    return descriptions[name] || '暂无描述';
  },
  
  // 获取课程详情项
  getCourseDetails: function() {
    return [
      { title: '适合人群', content: '医美从业医生、护士、咨询师及相关专业人员' },
      { title: '课程特色', content: '理论与实操结合，小班制教学，一对一指导' },
      { title: '学习成果', content: '掌握前沿技术，提升专业技能，获得行业认可' },
      { title: '就业前景', content: '高薪就业，职业发展空间广阔，可实现多元化发展' }
    ];
  },
  
  // 获取岗位描述
  getPositionDescription: function(name) {
    const descriptions = {
      '医生技术岗': '医美行业核心岗位，负责医美项目的诊断、方案设计和操作实施，要求具备专业医学背景和精湛技术。',
      '销售咨询岗': '负责客户接待、需求分析、方案推荐和成交转化，是医美机构的重要营收岗位。',
      '服务支持岗': '包括护理师、美容师等岗位，负责术前术后护理、基础美容服务等工作，保障客户体验。',
      '运营营销岗': '负责医美机构的品牌推广、活动策划、社交媒体运营、客户维护等工作，提升机构知名度和客流量。',
      '行政职能类': '包括前台、人事、财务等岗位，负责机构日常运营管理，保障各部门协调运作。',
      '其他延伸岗': '如医美摄影师、产品研发、培训讲师等特色岗位，为医美行业提供专业支持服务。'
    };
    
    return descriptions[name] || '暂无描述';
  },
  
  // 获取岗位详情项
  getPositionDetails: function() {
    return [
      { title: '岗位要求', content: '相关专业背景，具备相应技能和证书' },
      { title: '薪资范围', content: '入门级5K-8K，资深15K-30K+，管理岗30K-50K+' },
      { title: '晋升路径', content: '初级→中级→高级→主管→经理→总监' },
      { title: '发展前景', content: '医美行业快速发展，人才需求量大，发展空间广阔' }
    ];
  },
  
  /**
   * 返回首页
   */
  goToHome: function() {
    wx.reLaunch({
      url: '/pages/index/index'
    });
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.name,
      path: `/pages/detail/detail?type=${this.data.type}&name=${this.data.name}&icon=${encodeURIComponent(this.data.icon)}`
    }
  }
}) 