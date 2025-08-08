Page({
  data: {
    loginType: 'sms', // 'sms' | 'password'
    phone: '',
    smsCode: '',
    password: '',
    agreed: false,
    showPassword: false,
    canGetCode: true,
    codeText: '获取验证码',
    countdown: 0
  },

  onLoad(options) {
    // 页面加载时的逻辑
  },

  // 切换登录方式
  switchLoginType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      loginType: type,
      smsCode: '',
      password: ''
    });
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

  // 获取验证码
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

    // 发送验证码请求
    wx.request({
      url: 'https://your-api.com/sms/send',
      method: 'POST',
      data: {
        phone: phone
      },
      success: (res) => {
        if (res.data.success) {
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
          codeText: '获取验证码'
        });
      } else {
        this.setData({
          codeText: `${countdown}s后重新获取`
        });
      }
    }, 1000);
  },

  // 微信登录
  wechatLogin() {
    wx.login({
      success: (res) => {
        if (res.code) {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: 'https://your-api.com/auth/wechat',
            method: 'POST',
            data: {
              code: res.code
            },
            success: (result) => {
              if (result.data.success) {
                // 登录成功，保存用户信息
                wx.setStorageSync('userInfo', result.data.userInfo);
                wx.setStorageSync('token', result.data.token);
                
                wx.showToast({
                  title: '登录成功',
                  icon: 'success'
                });

                setTimeout(() => {
                  wx.switchTab({
                    url: '/pages/index/index'
                  });
                }, 1500);
              } else {
                wx.showToast({
                  title: result.data.message || '登录失败',
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
        } else {
          wx.showToast({
            title: '微信授权失败',
            icon: 'none'
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '微信授权失败',
          icon: 'none'
        });
      }
    });
  },

  // 切换协议同意状态
  toggleAgreement() {
    this.setData({
      agreed: !this.data.agreed
    });
  },

  // 显示用户手册
  showUserAgreement() {
    wx.showModal({
      title: '用户手册',
      content: '这里是用户手册内容...',
      showCancel: false
    });
  },

  // 显示隐私政策
  showPrivacyPolicy() {
    wx.showModal({
      title: '隐私政策',
      content: '这里是隐私政策内容...',
      showCancel: false
    });
  },

  // 忘记密码
  forgotPassword() {
    wx.showModal({
      title: '忘记密码',
      content: '请联系客服找回密码',
      showCancel: false
    });
  },

  // 执行登录
  doLogin() {
    if (!this.canLogin()) return;

    const { loginType, phone, smsCode, password } = this.data;
    
    wx.showLoading({
      title: '登录中...'
    });

    const loginData = {
      phone: phone,
      type: loginType
    };

    if (loginType === 'sms') {
      loginData.smsCode = smsCode;
    } else {
      loginData.password = password;
    }

    wx.request({
      url: 'https://your-api.com/auth/login',
      method: 'POST',
      data: loginData,
      success: (res) => {
        wx.hideLoading();
        if (res.data.success) {
          // 登录成功，保存用户信息
          wx.setStorageSync('userInfo', res.data.userInfo);
          wx.setStorageSync('token', res.data.token);
          
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          });

          setTimeout(() => {
            wx.switchTab({
              url: '/pages/index/index'
            });
          }, 1500);
        } else {
          wx.showToast({
            title: res.data.message || '登录失败',
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

  // 检查是否可以登录
  canLogin() {
    const { phone, smsCode, password, loginType, agreed } = this.data;
    
    if (!agreed) {
      wx.showToast({
        title: '请先同意用户协议',
        icon: 'none'
      });
      return false;
    }

    if (!phone || phone.length !== 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return false;
    }

    if (loginType === 'sms') {
      if (!smsCode || smsCode.length !== 6) {
        wx.showToast({
          title: '请输入6位验证码',
          icon: 'none'
        });
        return false;
      }
    } else {
      if (!password || password.length < 6) {
        wx.showToast({
          title: '密码至少6位',
          icon: 'none'
        });
        return false;
      }
    }

    return true;
  },

  // 跳转注册页面
  goRegister() {
    wx.navigateTo({
      url: '/pages/register/register'
    });
  }
});