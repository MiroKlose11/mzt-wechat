Page({
  data: {
    currentTab: 'personal', // 当前选中的认证类型
    currentStep: 'photo', // 当前认证步骤：photo(形象照片), basic(基础信息), identity(身份认证)
    
    // 步骤完成状态
    completedSteps: [], // 已完成的步骤列表
    
    // 形象照片相关
    photoImage: '',
    uploadedImages: [],
    
    // 基础信息相关
    name: '',
    idNumber: '',
    phone: '',
    email: '',
    
    // 新增字段
    region: ['', '', ''],
    identityTypes: ['学生', '教师', '医生', '工程师', '其他专业人士'],
    identityTypeIndex: null,
    
    // 认证数据
    certData: {
      gender: '男' // 默认选中男性
    }
  },

  onLoad(options) {
    // 页面加载
  },
  
  // 返回上一页
  goBack() {
    wx.navigateBack();
  },

  // 切换认证类型
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      currentTab: tab
    });
  },

  // 步骤导航
  goToStep(e) {
    const targetStep = e.currentTarget.dataset.step;
    const { currentStep, completedSteps } = this.data;
    
    // 定义步骤顺序
    const stepOrder = ['photo', 'basic', 'identity'];
    const currentIndex = stepOrder.indexOf(currentStep);
    const targetIndex = stepOrder.indexOf(targetStep);
    
    // 只允许跳转到已完成的步骤或当前步骤
    if (targetStep === currentStep) {
      // 点击当前步骤，不做任何操作
      return;
    } else if (completedSteps.includes(targetStep)) {
      // 允许跳转到已完成的步骤
      this.setData({
        currentStep: targetStep
      });
      this.updateStepIndicator(targetStep);
    } else {
      // 跳转到未完成的步骤不允许
      wx.showToast({
        title: '请点击"提交并下一步"按钮进入下一步',
        icon: 'none'
      });
      return;
    }
  },

  // 上传形象照片
  uploadPhoto() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // 选择图片后进行裁剪
        this.cropImage(res.tempFilePaths[0]);
      }
    });
  },
  
  // 裁剪图片
  cropImage(imagePath) {
    wx.navigateTo({
      url: `/pages/image-cropper/image-cropper?src=${imagePath}`,
      events: {
        // 获取裁剪后的图片
        cropImage: (result) => {
          this.setData({
            photoImage: result.tempFilePath
          });
        }
      },
      fail: () => {
        // 如果裁剪页面不存在，直接使用原图
        this.setData({
          photoImage: imagePath
        });
        wx.showToast({
          title: '图片裁剪功能未启用，使用原图',
          icon: 'none'
        });
      }
    });
  },
  
  // 选择性别
  selectGender(e) {
    const gender = e.currentTarget.dataset.gender;
    const updatedCertData = {...this.data.certData};
    updatedCertData.gender = gender;
    
    this.setData({
      certData: updatedCertData
    });
  },
  
  // 地区选择变化
  regionChange(e) {
    this.setData({
      region: e.detail.value
    });
  },
  
  // 身份类型选择变化
  identityTypeChange(e) {
    this.setData({
      identityTypeIndex: e.detail.value
    });
  },
  
  // 进入下一步
  goToNextStep() {
    const { currentStep, photoImage, certData, region, identityTypeIndex, identityTypes } = this.data;
    
    // 验证当前步骤数据
    if (currentStep === 'photo') {
      if (!photoImage) {
        wx.showToast({
          title: '请上传形象照片',
          icon: 'none'
        });
        return;
      }
      
      // 保存照片数据
      const updatedCertData = {...certData};
      updatedCertData.photoImage = photoImage;
      updatedCertData.uploadedImages = this.data.uploadedImages;
      
      // 标记当前步骤为已完成
      const completedSteps = [...this.data.completedSteps];
      if (!completedSteps.includes('photo')) {
        completedSteps.push('photo');
      }
      
      // 直接在当前页面切换到下一步
      this.setData({
        currentStep: 'basic',
        certData: updatedCertData,
        completedSteps: completedSteps
      });
      
      // 更新步骤指示器
      this.updateStepIndicator('basic');
    } else if (currentStep === 'basic') {
      // 验证基础信息
      const { name, region, identityTypeIndex } = this.data;
      
      if (!name && !certData.name) {
        wx.showToast({
          title: '请填写姓名',
          icon: 'none'
        });
        return;
      }
      
      if (!certData.gender) {
        wx.showToast({
          title: '请选择性别',
          icon: 'none'
        });
        return;
      }
      
      if (!region[0]) {
        wx.showToast({
          title: '请选择所在地区',
          icon: 'none'
        });
        return;
      }
      
      if (identityTypeIndex === null) {
        wx.showToast({
          title: '请选择身份类型',
          icon: 'none'
        });
        return;
      }
      
      // 保存基础信息数据
      const updatedCertData = {...certData};
      updatedCertData.name = name || certData.name;
      updatedCertData.region = region;
      updatedCertData.identityType = identityTypes[identityTypeIndex];
      updatedCertData.jobTitle = this.data.certData.jobTitle || '';
      updatedCertData.expertise = this.data.certData.expertise || '';
      updatedCertData.company = this.data.certData.company || '';
      
      // 标记当前步骤为已完成
      const completedSteps = [...this.data.completedSteps];
      if (!completedSteps.includes('basic')) {
        completedSteps.push('basic');
      }
      
      // 直接在当前页面切换到下一步
      this.setData({
        currentStep: 'identity',
        certData: updatedCertData,
        completedSteps: completedSteps
      });
      
      // 更新步骤指示器
      this.updateStepIndicator('identity');
    } else if (currentStep === 'identity') {
      // 验证身份证照片
      if (!certData.idFrontImage) {
        wx.showToast({
          title: '请上传身份证正面照片',
          icon: 'none'
        });
        return;
      }
      
      if (!certData.idBackImage) {
        wx.showToast({
          title: '请上传身份证背面照片',
          icon: 'none'
        });
        return;
      }
      
      // 标记当前步骤为已完成
      const completedSteps = [...this.data.completedSteps];
      if (!completedSteps.includes('identity')) {
        completedSteps.push('identity');
      }
      
      this.setData({
        completedSteps: completedSteps
      });
      
      // 提交认证
      this.submitCertification();
    }
  },
  
  // 提交认证
  submitCertification() {
     wx.showLoading({
       title: '提交中...'
     });
     
     // 模拟提交
     setTimeout(() => {
       wx.hideLoading();
       wx.showToast({
         title: '认证提交成功',
         icon: 'success'
       });
       
       // 清除认证数据
       wx.removeStorageSync('certData');
       
       // 返回首页
       setTimeout(() => {
         wx.switchTab({
           url: '/pages/index/index'
         });
       }, 1500);
     }, 2000);
   },

  // 添加更多图片
  addMoreImages() {
    wx.chooseImage({
      count: 4,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const newImages = [...this.data.uploadedImages, ...res.tempFilePaths];
        this.setData({
          uploadedImages: newImages.slice(0, 4) // 最多4张
        });
      }
    });
  },
  
  // 删除主图片
  deleteMainPhoto() {
    this.setData({
      photoImage: ''
    });
  },
  
  // 删除缩略图
  deleteThumbnail(e) {
    const index = e.currentTarget.dataset.index;
    const images = [...this.data.uploadedImages];
    images.splice(index, 1);
    this.setData({
      uploadedImages: images
    });
  },
  
  // 预览缩略图
  previewThumbnail(e) {
    const index = e.currentTarget.dataset.index;
    const images = this.data.uploadedImages;
    
    wx.previewImage({
      current: images[index],
      urls: images
    });
  },

  // 更新步骤指示器
  updateStepIndicator(step) {
    // 更新步骤指示器的样式
    // 在微信小程序中，样式更新通过模板中的条件渲染来实现
    // 这里只需要确保currentStep数据已经更新即可
    console.log('当前步骤已更新为:', step);
  },
  
  // 输入框内容变化
  inputChange(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    
    // 更新certData中对应字段
    const updatedCertData = {...this.data.certData};
    updatedCertData[field] = value;
    
    this.setData({
      certData: updatedCertData
    });
  },
  
  // 上传身份证正面照片
  uploadIdFront() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // 更新认证数据
        const certData = {...this.data.certData};
        certData.idFrontImage = res.tempFilePaths[0];
        this.setData({
          certData: certData
        });
      }
    });
  },
  
  // 上传身份证背面照片
  uploadIdBack() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // 更新认证数据
        const certData = {...this.data.certData};
        certData.idBackImage = res.tempFilePaths[0];
        this.setData({
          certData: certData
        });
      }
    });
  }
});