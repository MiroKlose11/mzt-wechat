Page({
  data: {
    phone: '',
    smsCode: '',
    password: '',
    smsKey: '', // 短信验证码key
    showPassword: false,
    canGetCode: true,
    codeText: '发送验证码',
    countdown: 0
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
  },

  // 验证码输入
  onSmsCodeInput(e) {
    this.setData({
      smsCode: e.detail.value
    });
  },

  // 密码输入
  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
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

    wx.request({
      url: 'http://localhost:8080/auth/send-sms',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        phone: phone
      },
      success: (res) => {
        if (res.data.code === '200') {
          // 保存验证码key用于后续验证
          this.setData({
            smsKey: res.data.data
          });
          wx.showToast({
            title: '验证码已发送',
            icon: 'success'
          });
          this.startCountdown();
        } else {
          wx.showToast({
            title: res.data.message || '发送失败',
            icon: 'none'
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        });
      }
    });
  },

  // 开始倒计时
  startCountdown() {
    let countdown = 60;
    this.setData({
      canGetCode: false,
      countdown: countdown,
      codeText: `${countdown}s后重新获取`
    });

    const timer = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        clearInterval(timer);
        this.setData({
          canGetCode: true,
          codeText: '发送验证码'
        });
      } else {
        this.setData({
          codeText: `${countdown}s后重新获取`
        });
      }
    }, 1000);
  },

  // 执行注册
  doRegister() {
    if (!this.canRegister()) return;

    const { phone, smsCode, password, smsKey } = this.data;
    
    wx.showLoading({
      title: '注册中...'
    });

    wx.request({
      url: 'http://localhost:8080/auth/register',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        phone: phone,
        smsCode: smsCode,
        password: password,
        smsKey: smsKey
      },
      success: (res) => {
        wx.hideLoading();
        if (res.data.code === '200') {
          wx.showToast({
            title: '注册成功',
            icon: 'success'
          });

          setTimeout(() => {
            // 注册成功后返回登录页面
            wx.navigateBack();
          }, 1500);
        } else {
          wx.showToast({
            title: res.data.message || '注册失败',
            icon: 'none'
          });
        }
      },
      fail: () => {
        wx.hideLoading();
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        });
      }
    });
  },

  // 检查是否可以注册
  canRegister() {
    const { phone, smsCode, password } = this.data;
    
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

    return true;
  }
});