Page({
  data: {
    phone: '',
    smsCode: '',
    password: '',
    confirmPassword: '',
    smsKey: '', // 短信验证码key
    showPassword: false,
    showConfirmPassword: false,
    canGetCode: true,
    codeText: '发送验证码',
    countdown: 0,
    canReset: false // 是否可以重置密码
  },

  onLoad(options) {
    // 页面加载时的逻辑
  },

  // 返回上一页
  goBack() {
    wx.navigateBack();
  },

  // 手机号输入
  onPhoneInput(e) {
    this.setData({
      phone: e.detail.value
    });
    this.checkFormValid();
  },

  // 验证码输入
  onSmsCodeInput(e) {
    this.setData({
      smsCode: e.detail.value
    });
    this.checkFormValid();
  },

  // 密码输入
  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
    this.checkFormValid();
  },

  // 确认密码输入
  onConfirmPasswordInput(e) {
    this.setData({
      confirmPassword: e.detail.value
    });
    this.checkFormValid();
  },

  // 检查表单是否有效
  checkFormValid() {
    const { phone, smsCode, password, confirmPassword } = this.data;
    const isValid = phone && phone.length === 11 && 
                   smsCode && smsCode.length === 6 && 
                   password && password.length >= 6 && 
                   confirmPassword && password === confirmPassword;
    this.setData({
      canReset: isValid
    });
  },

  // 获取短信验证码
  getSmsCode() {
    if (!this.data.canGetCode) return;
    
    const phone = this.data.phone;
    if (!phone || phone.length !== 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return;
    }

    const api = require('../../utils/api');
    
    api.auth.sendSms({ phone }).then(result => {
      wx.showToast({
        title: '验证码已发送',
        icon: 'success'
      });
      
      // 保存短信验证码的key
      this.setData({
        smsKey: result.data.smsKey
      });
      
      this.startCountdown();
    }).catch(error => {
      wx.showToast({
        title: error.message || '发送失败',
        icon: 'none'
      });
    });
  },

  // 开始倒计时
  startCountdown() {
    this.setData({
      canGetCode: false,
      countdown: 60
    });

    const timer = setInterval(() => {
      const countdown = this.data.countdown - 1;
      if (countdown <= 0) {
        clearInterval(timer);
        this.setData({
          canGetCode: true,
          codeText: '发送验证码',
          countdown: 0
        });
      } else {
        this.setData({
          countdown,
          codeText: `${countdown}s后重发`
        });
      }
    }, 1000);
  },

  // 切换密码显示状态
  togglePasswordVisibility() {
    this.setData({
      showPassword: !this.data.showPassword
    });
  },

  // 切换确认密码显示状态
  toggleConfirmPasswordVisibility() {
    this.setData({
      showConfirmPassword: !this.data.showConfirmPassword
    });
  },

  // 重置密码
  resetPassword() {
    if (!this.canResetPassword()) return;

    const { phone, smsCode, password, smsKey } = this.data;
    
    wx.showLoading({
      title: '重置中...'
    });

    const api = require('../../utils/api');
    
    api.auth.resetPassword({
      phone: phone,
      smsCode: smsCode,
      password: password,
      smsKey: smsKey
    }).then(result => {
      wx.hideLoading();
      wx.showToast({
        title: '密码重置成功',
        icon: 'success'
      });

      setTimeout(() => {
        // 重置成功后返回登录页面
        wx.navigateBack();
      }, 1500);
    }).catch(error => {
      wx.hideLoading();
      wx.showToast({
        title: error.message || '重置失败',
        icon: 'none'
      });
    });
  },

  // 检查是否可以重置密码
  canResetPassword() {
    const { phone, smsCode, password, confirmPassword } = this.data;
    
    if (!phone || phone.length !== 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return false;
    }

    if (!smsCode || smsCode.length !== 6) {
      wx.showToast({
        title: '请输入6位验证码',
        icon: 'none'
      });
      return false;
    }

    if (!password || password.length < 6) {
      wx.showToast({
        title: '密码至少6位',
        icon: 'none'
      });
      return false;
    }

    if (password !== confirmPassword) {
      wx.showToast({
        title: '两次密码输入不一致',
        icon: 'none'
      });
      return false;
    }

    return true;
  }
});