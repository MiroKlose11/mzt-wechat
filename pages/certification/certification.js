Page({
  data: {
    currentTab: 'personal', // 当前选中的认证类型
    currentStep: 'photo', // 当前认证步骤
    
    // 步骤完成状态
    completedSteps: [], // 已完成的步骤列表
    
    // 个人认证步骤定义
    personalSteps: [
      { key: 'photo', name: '形象照片', icon: '📷' },
      { key: 'basic', name: '基础信息', icon: '📋' },
      { key: 'identity', name: '身份认证', icon: '🆔' }
    ],
    
    // 企业认证步骤定义
    enterpriseSteps: [
      { key: 'photo', name: '企业信息', icon: '🏢' },
      { key: 'basic', name: '资料上传', icon: '📄' },
      { key: 'identity', name: '法人认证', icon: '👤' }
    ],
    
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
    
    // 企业认证相关字段
    enterpriseRegion: ['', '', ''],
    enterpriseTypes: ['医疗机构', '医药企业', '医疗器械', '健康管理', '其他'],
    enterpriseTypeIndex: null,
    enterpriseFields: ['医疗', '健康', '养老', '康复', '其他'],
    enterpriseFieldIndex: null,
    
    // 个人认证数据
    certData: {
      gender: '男', // 默认选中男性
      isVip: false, // VIP嘉宾状态
      vipCode: '', // VIP嘉宾码
      idFrontImage: '', // 身份证正面
      idBackImage: '', // 身份证背面
      doctorCertImage: '', // 医师资格证
      qualificationCertImage: '', // 传资格证书
      otherCert1Image: '', // 其他证书1
      otherCert2Image: '' // 其他证书2
    },
    
    // 企业认证数据
    enterpriseData: {
      companyName: '', // 企业名称
      companyType: '', // 企业类型
      businessLicense: '', // 营业执照
      medicalLicense: '', // 医疗许可证
      deviceLicense: '', // 医疗器械经营许可证
      legalPersonName: '', // 法人姓名
      legalPersonId: '', // 法人身份证号
      legalPersonIdFront: '', // 法人身份证正面
      legalPersonIdBack: '', // 法人身份证背面
      companyLogo: '', // 企业形象照片
      field: '', // 所属领域
      bankName: '', // 开户银行
      bankAccount: '', // 银行账户
      agreeTerms: false // 是否同意协议
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
      currentTab: tab,
      currentStep: 'photo', // 重置到第一步
      completedSteps: [] // 清空已完成步骤
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
        title: '请完成当前页面',
        icon: 'none'
      });
      return;
    }
  },

  // 上传形象照片
  uploadPhoto() {
    // 个人认证和企业认证都使用裁剪功能
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // 选择图片后进行裁剪，传入当前认证类型
        const imageType = this.data.currentTab === 'personal' ? 'personal' : 'enterprise';
        this.cropImage(res.tempFilePaths[0], imageType);
      }
    });
  },
  
  // 裁剪图片
  cropImage(imagePath, imageType) {
    // 根据图片类型设置不同的裁剪比例
    let aspectRatio = '1:1';
    
    if (imageType === 'enterprise') {
      aspectRatio = '16:9';
    } else if (imageType === 'personal') {
      aspectRatio = '1:1';
    } else if (imageType === 'personal-thumbnail') {
      aspectRatio = '1:1';
    }
    
    wx.navigateTo({
      url: `/pages/image-cropper/image-cropper?src=${imagePath}&aspectRatio=${aspectRatio}`,
      events: {
        // 获取裁剪后的图片
        cropImage: (result) => {
          if (imageType === 'personal') {
            this.setData({
              photoImage: result.tempFilePath
            });
          } else if (imageType === 'enterprise') {
            this.setData({
              'enterpriseData.companyLogo': result.tempFilePath
            });
          } else if (imageType === 'personal-thumbnail') {
            // 添加到缩略图列表
            const newImages = [...this.data.uploadedImages, result.tempFilePath];
            this.setData({
              uploadedImages: newImages.slice(0, 4) // 最多4张
            });
          }
        }
      },
      fail: () => {
        // 如果裁剪页面不存在，直接使用原图
        if (imageType === 'personal') {
          this.setData({
            photoImage: imagePath
          });
        } else if (imageType === 'enterprise') {
          this.setData({
            'enterpriseData.companyLogo': imagePath
          });
        } else if (imageType === 'personal-thumbnail') {
          const newImages = [...this.data.uploadedImages, imagePath];
          this.setData({
            uploadedImages: newImages.slice(0, 4) // 最多4张
          });
        }
        
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
  
  // 进入下一步（修复条件结构）
  goToNextStep() {
    const { currentTab, currentStep, photoImage, certData, region, identityTypeIndex, identityTypes, enterpriseData, enterpriseRegion, enterpriseTypeIndex } = this.data;
    
    // 根据认证类型和当前步骤进行不同的验证
    if (currentTab === 'personal') {
      // 个人认证流程
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
    } else {
      // 企业认证流程
      if (currentStep === 'photo') {
        // 验证企业信息
        if (!enterpriseData.companyLogo) {
          wx.showToast({
            title: '请上传企业形象照片',
            icon: 'none'
          });
          return;
        }
        
        if (!enterpriseData.companyName) {
          wx.showToast({
            title: '请输入企业名称',
            icon: 'none'
          });
          return;
        }
        
        if (!enterpriseRegion[0]) {
          wx.showToast({
            title: '请选择所在地区',
            icon: 'none'
          });
          return;
        }
        
        if (enterpriseTypeIndex === null) {
          wx.showToast({
            title: '请选择企业类型',
            icon: 'none'
          });
          return;
        }
        
        // 标记当前步骤为已完成
        const completedSteps = [...this.data.completedSteps];
        if (!completedSteps.includes('photo')) {
          completedSteps.push('photo');
        }
        
        // 直接在当前页面切换到下一步
        this.setData({
          currentStep: 'basic',
          completedSteps: completedSteps
        });
        
        // 更新步骤指示器
        this.updateStepIndicator('basic');
      } else if (currentStep === 'basic') {
        // 企业认证资料上传步骤
        if (!enterpriseData.businessLicense) {
          wx.showToast({
            title: '请上传营业执照',
            icon: 'none'
          });
          return;
        }
        
        if (!enterpriseData.medicalLicense) {
          wx.showToast({
            title: '请上传医疗许可证',
            icon: 'none'
          });
          return;
        }
        
        if (!enterpriseData.deviceLicense) {
          wx.showToast({
            title: '请上传医疗器械经营许可证',
            icon: 'none'
          });
          return;
        }
        
        const completedSteps = [...this.data.completedSteps];
        if (!completedSteps.includes('basic')) {
          completedSteps.push('basic');
        }
        
        this.setData({
          currentStep: 'identity',
          completedSteps: completedSteps
        });
        
        this.updateStepIndicator('identity');
      } else if (currentStep === 'identity') {
        // 企业认证法人认证步骤
        if (!enterpriseData.legalPersonIdFront) {
          wx.showToast({
            title: '请上传法人身份证正面',
            icon: 'none'
          });
          return;
        }
        
        if (!enterpriseData.legalPersonIdBack) {
          wx.showToast({
            title: '请上传法人身份证背面',
            icon: 'none'
          });
          return;
        }
        
        if (!enterpriseData.legalPersonName) {
          wx.showToast({
            title: '请填写法人姓名',
            icon: 'none'
          });
          return;
        }
        
        if (!enterpriseData.legalPersonId) {
          wx.showToast({
            title: '请填写法人证件号码',
            icon: 'none'
          });
          return;
        }
        
        if (!enterpriseData.bankName) {
          wx.showToast({
            title: '请填写开户银行',
            icon: 'none'
          });
          return;
        }
        
        if (!enterpriseData.bankAccount) {
          wx.showToast({
            title: '请填写银行账户',
            icon: 'none'
          });
          return;
        }
        
        if (!enterpriseData.agreeTerms) {
          wx.showToast({
            title: '请同意相关协议',
            icon: 'none'
          });
          return;
        }
        
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
    }
  },
  
  // 提交认证
  submitCertification() {
     const api = require('../../utils/api');
     
     wx.showLoading({
       title: '提交中...'
     });
     
     const { currentTab, certData, enterpriseData } = this.data;
     
     let submitData = {};
     
     if (currentTab === 'personal') {
       // 个人认证数据
       submitData = {
         type: 'personal',
         name: this.data.name,
         idNumber: this.data.idNumber,
         phone: this.data.phone,
         email: this.data.email,
         gender: certData.gender,
         region: this.data.region.join(','),
         identityType: this.data.identityTypes[this.data.identityTypeIndex] || '',
         isVip: certData.isVip,
         vipCode: certData.vipCode,
         photoImage: this.data.photoImage,
         idFrontImage: certData.idFrontImage,
         idBackImage: certData.idBackImage,
         doctorCertImage: certData.doctorCertImage,
         qualificationCertImage: certData.qualificationCertImage,
         otherCert1Image: certData.otherCert1Image,
         otherCert2Image: certData.otherCert2Image
       };
     } else {
       // 企业认证数据
       submitData = {
         type: 'enterprise',
         companyName: enterpriseData.companyName,
         companyType: enterpriseData.companyType,
         field: enterpriseData.field,
         region: this.data.enterpriseRegion.join(','),
         businessLicense: enterpriseData.businessLicense,
         medicalLicense: enterpriseData.medicalLicense,
         deviceLicense: enterpriseData.deviceLicense,
         legalPersonName: enterpriseData.legalPersonName,
         legalPersonId: enterpriseData.legalPersonId,
         legalPersonIdFront: enterpriseData.legalPersonIdFront,
         legalPersonIdBack: enterpriseData.legalPersonIdBack,
         companyLogo: enterpriseData.companyLogo,
         bankName: enterpriseData.bankName,
         bankAccount: enterpriseData.bankAccount
       };
     }
     
     api.auth.submitCertification(submitData).then(result => {
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
     }).catch(error => {
       wx.hideLoading();
       wx.showToast({
         title: error.message || '提交失败',
         icon: 'none'
       });
     });
   },

  // 添加更多图片
  addMoreImages() {
    wx.chooseImage({
      count: 4,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // 选择图片后进行裁剪
        this.cropImage(res.tempFilePaths[0], 'personal-thumbnail');
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
  
  // 企业认证输入框内容变化
  inputEnterpriseChange(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    
    // 更新enterpriseData中对应字段
    const updatedEnterpriseData = {...this.data.enterpriseData};
    updatedEnterpriseData[field] = value;
    
    this.setData({
      enterpriseData: updatedEnterpriseData
    });
  },
  
  // 企业地区选择变化
  enterpriseRegionChange(e) {
    this.setData({
      enterpriseRegion: e.detail.value
    });
  },
  
  // 企业类型选择变化
  enterpriseTypeChange(e) {
    const index = e.detail.value;
    const type = this.data.enterpriseTypes[index];
    
    this.setData({
      enterpriseTypeIndex: index,
      'enterpriseData.companyType': type
    });
  },
  
  // 企业所属领域选择变化
  enterpriseFieldChange(e) {
    const index = e.detail.value;
    const field = this.data.enterpriseFields[index];
    
    this.setData({
      enterpriseFieldIndex: index,
      'enterpriseData.field': field
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
        const tempFilePath = res.tempFilePaths[0];
        this.setData({
          'certData.idBackImage': tempFilePath
        });
      }
    });
  },

  // VIP选项切换
  toggleVip() {
    this.setData({
      'certData.isVip': !this.data.certData.isVip
    });
  },

  // 上传医师资格证
  uploadDoctorCert() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];
        this.setData({
          'certData.doctorCertImage': tempFilePath
        });
      }
    });
  },

  // 上传传资格证书
  uploadQualificationCert() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];
        this.setData({
          'certData.qualificationCertImage': tempFilePath
        });
      }
    });
  },

  // 上传其他证书1
  uploadOtherCert1() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];
        this.setData({
          'certData.otherCert1Image': tempFilePath
        });
      }
    });
  },

  // 上传其他证书2
  uploadOtherCert2() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];
        this.setData({
          'certData.otherCert2Image': tempFilePath
        });
      }
    });
  },

  // 企业认证相关方法
  uploadBusinessLicense() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          'enterpriseData.businessLicense': res.tempFilePaths[0]
        });
      }
    });
  },

  uploadMedicalLicense() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          'enterpriseData.medicalLicense': res.tempFilePaths[0]
        });
      }
    });
  },

  uploadDeviceLicense() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          'enterpriseData.deviceLicense': res.tempFilePaths[0]
        });
      }
    });
  },

  uploadLegalPersonIdFront() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          'enterpriseData.legalPersonIdFront': res.tempFilePaths[0]
        });
      }
    });
  },

  uploadLegalPersonIdBack() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          'enterpriseData.legalPersonIdBack': res.tempFilePaths[0]
        });
      }
    });
  },

  toggleAgreeTerms() {
    this.setData({
      'enterpriseData.agreeTerms': !this.data.enterpriseData.agreeTerms
    });
  }
});