Page({
  data: {
    loginType: 'sms', // 'sms' | 'password'
    phone: '',
    smsCode: '',
    password: '',
    smsKey: '', // 短信验证码key
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
          // 获取用户信息
          wx.getUserProfile({
            desc: '用于完善用户资料',
            success: (userRes) => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              wx.request({
                url: 'http://localhost:8080/auth/miniapp-login',
                method: 'POST',
                header: {
                  'content-type': 'application/json'
                },
                data: {
                  loginType: 'wechat',
                  code: res.code,
                  nickName: userRes.userInfo.nickName,
                  avatarUrl: userRes.userInfo.avatarUrl
                },
                success: (result) => {
                  if (result.data.code === '200') {
                    // 登录成功，保存token信息
                    const tokenData = result.data.data;
                    wx.setStorageSync('accessToken', tokenData.accessToken);
                    wx.setStorageSync('refreshToken', tokenData.refreshToken);
                    wx.setStorageSync('tokenType', tokenData.tokenType);
                    
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
            },
            fail: () => {
              // 用户拒绝授权，使用基础微信登录
              wx.request({
                url: 'http://localhost:8080/auth/miniapp-login',
                method: 'POST',
                header: {
                  'content-type': 'application/json'
                },
                data: {
                  loginType: 'wechat',
                  code: res.code
                },
                success: (result) => {
                  if (result.data.code === '200') {
                    const tokenData = result.data.data;
                    wx.setStorageSync('accessToken', tokenData.accessToken);
                    wx.setStorageSync('refreshToken', tokenData.refreshToken);
                    wx.setStorageSync('tokenType', tokenData.tokenType);
                    
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
    wx.navigateTo({
      url: '/pages/forgot-password/forgot-password'
    });
  },

  // 执行登录
  doLogin() {
    if (!this.canLogin()) return;

    const { loginType, phone, smsCode, password, smsKey } = this.data;
    
    wx.showLoading({
      title: '登录中...'
    });

    let loginData = {
      loginType: loginType
    };

    if (loginType === 'sms') {
      loginData.phone = phone;
      loginData.smsCode = smsCode;
      loginData.smsKey = smsKey;
    } else {
      loginData.username = phone; // 使用手机号作为用户名
      loginData.password = password;
    }

    wx.request({
      url: 'http://localhost:8080/auth/miniapp-login',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: loginData,
      success: (res) => {
        wx.hideLoading();
        if (res.data.code === '200') {
          // 登录成功，保存token信息
          const tokenData = res.data.data;
          wx.setStorageSync('accessToken', tokenData.accessToken);
          wx.setStorageSync('refreshToken', tokenData.refreshToken);
          wx.setStorageSync('tokenType', tokenData.tokenType);
          
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