// API请求工具类
const API_BASE_URL = 'http://localhost:8080';

/**
 * 统一的API请求方法
 * @param {Object} options 请求配置
 * @param {string} options.url 请求地址（相对路径）
 * @param {string} options.method 请求方法
 * @param {Object} options.data 请求数据
 * @param {boolean} options.needAuth 是否需要认证
 * @param {boolean} options.showLoading 是否显示加载提示
 * @param {string} options.loadingText 加载提示文字
 */
function request(options) {
  const {
    url,
    method = 'GET',
    data = {},
    needAuth = false,
    showLoading = false,
    loadingText = '加载中...'
  } = options;

  return new Promise((resolve, reject) => {
    // 显示加载提示
    if (showLoading) {
      wx.showLoading({
        title: loadingText,
        mask: true
      });
    }

    // 构建请求头
    const header = {
      'content-type': 'application/json'
    };

    // 添加认证头
    if (needAuth) {
      const accessToken = wx.getStorageSync('accessToken');
      const tokenType = wx.getStorageSync('tokenType') || 'Bearer';
      if (accessToken) {
        header['Authorization'] = `${tokenType} ${accessToken}`;
      }
    }

    wx.request({
      url: `${API_BASE_URL}${url}`,
      method: method.toUpperCase(),
      header,
      data,
      success: (res) => {
        if (showLoading) {
          wx.hideLoading();
        }

        // 统一处理响应
        if (res.statusCode === 200) {
          const { code, data: responseData, message } = res.data;
          
          if (code === '200') {
            resolve({
              success: true,
              data: responseData,
              message
            });
          } else if (code === 'A0006' || code === 'A0007') {
            // token无效或过期，尝试刷新token
            refreshToken().then(() => {
              // 重新发起请求
              request(options).then(resolve).catch(reject);
            }).catch(() => {
              // 刷新失败，跳转到登录页
              redirectToLogin();
              reject({
                success: false,
                code,
                message: message || '登录已过期，请重新登录'
              });
            });
          } else {
            reject({
              success: false,
              code,
              message: message || '请求失败'
            });
          }
        } else {
          reject({
            success: false,
            code: res.statusCode,
            message: '网络请求失败'
          });
        }
      },
      fail: (error) => {
        if (showLoading) {
          wx.hideLoading();
        }
        reject({
          success: false,
          code: 'NETWORK_ERROR',
          message: '网络连接失败',
          error
        });
      }
    });
  });
}

/**
 * 刷新token
 */
function refreshToken() {
  return new Promise((resolve, reject) => {
    const refreshToken = wx.getStorageSync('refreshToken');
    if (!refreshToken) {
      reject(new Error('无刷新token'));
      return;
    }

    wx.request({
      url: `${API_BASE_URL}/auth/refresh-token`,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        refreshToken
      },
      success: (res) => {
        if (res.statusCode === 200 && res.data.code === '200') {
          const tokenData = res.data.data;
          wx.setStorageSync('accessToken', tokenData.accessToken);
          wx.setStorageSync('refreshToken', tokenData.refreshToken);
          wx.setStorageSync('tokenType', tokenData.tokenType);
          resolve(tokenData);
        } else {
          reject(new Error('刷新token失败'));
        }
      },
      fail: () => {
        reject(new Error('网络错误'));
      }
    });
  });
}

/**
 * 跳转到登录页
 */
function redirectToLogin() {
  // 清除本地存储的token
  wx.removeStorageSync('accessToken');
  wx.removeStorageSync('refreshToken');
  wx.removeStorageSync('tokenType');
  
  // 跳转到登录页
  wx.reLaunch({
    url: '/pages/login/login'
  });
}

/**
 * 检查是否已登录
 */
function isLoggedIn() {
  const accessToken = wx.getStorageSync('accessToken');
  return !!accessToken;
}

/**
 * 登出
 */
function logout() {
  return new Promise((resolve, reject) => {
    const accessToken = wx.getStorageSync('accessToken');
    if (!accessToken) {
      redirectToLogin();
      resolve();
      return;
    }

    request({
      url: '/auth/logout',
      method: 'DELETE',
      needAuth: true
    }).then(() => {
      redirectToLogin();
      resolve();
    }).catch(() => {
      // 即使登出接口失败，也清除本地token
      redirectToLogin();
      resolve();
    });
  });
}

// 导出API方法
module.exports = {
  request,
  refreshToken,
  redirectToLogin,
  isLoggedIn,
  logout,
  
  // 认证相关API
  auth: {
    // 发送短信验证码
    sendSms: (phone) => request({
      url: '/auth/send-sms',
      method: 'POST',
      data: { phone }
    }),
    
    // 小程序登录（支持短信、微信、密码登录）
    miniappLogin: (loginData) => request({
      url: '/auth/miniapp-login',
      method: 'POST',
      data: loginData
    }),
    
    // 微信登录
    wechatLogin: (loginData) => request({
      url: '/auth/wechat-login',
      method: 'POST',
      data: loginData
    }),
    
    // 注册
    register: (registerData) => request({
      url: '/auth/register',
      method: 'POST',
      data: registerData
    }),
    
    // 获取图形验证码
    getCaptcha: () => request({
      url: '/auth/captcha',
      method: 'GET'
    })
  },
  
  // 首页相关API
  index: {
    // 获取顶部Banner
    getBanner: () => request({
      url: '/index/banner/top',
      method: 'GET'
    }),
    
    // 获取分类数据
    getCategories: () => request({
      url: '/index/categories',
      method: 'GET'
    })
  },
  
  // 课程相关API
  course: {
    // 获取课程列表
    getList: (params) => request({
      url: '/course/list',
      method: 'GET',
      data: params
    })
  },
  
  // 角色相关API
  role: {
    // 获取角色列表
    getList: () => request({
      url: '/role/list',
      method: 'GET'
    })
  },
  
  // 成员相关API
  member: {
    // 分页获取成员列表
    getPage: (params) => request({
      url: '/member/page',
      method: 'GET',
      data: params
    })
  },
  
  // 机构相关API
  organization: {
    // 获取机构列表
    getList: (params) => request({
      url: '/organization/list',
      method: 'GET',
      data: params
    })
  }
};