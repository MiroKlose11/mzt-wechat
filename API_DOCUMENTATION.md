# MZT后端API对接文档

## 概述

本文档为MZT项目后端API接口对接文档，包含三种登录方式的完整实现：
- 短信验证码登录
- 微信授权登录  
- 账号密码登录

## 基础信息

### 服务器配置
- **基础URL**: `http://localhost:8080`
- **API前缀**: `/auth`
- **内容类型**: `application/json`
- **字符编码**: `UTF-8`

### 通用响应格式

```json
{
  "code": "200",
  "message": "操作成功",
  "data": {},
  "timestamp": "2024-01-20T10:30:00"
}
```

## 一、短信验证码登录

### 1.1 发送短信验证码

**接口地址**: `POST /auth/send-sms`

**请求参数**:
```json
{
  "phone": "13800138000"
}
```

**参数说明**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| phone | String | 是 | 手机号码，格式：1[3-9]xxxxxxxxx |

**成功响应**:
```json
{
  "code": "200",
  "message": "操作成功",
  "data": "sms_1705123456789",
  "timestamp": "2024-01-20T10:30:00"
}
```

**响应说明**:
- `data`: 验证码key，用于后续验证

### 1.2 短信验证码登录

**接口地址**: `POST /auth/miniapp-login`

**请求参数**:
```json
{
  "loginType": "sms",
  "phone": "13800138000",
  "smsCode": "123456",
  "smsKey": "sms_1705123456789"
}
```

**参数说明**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| loginType | String | 是 | 登录类型，固定值："sms" |
| phone | String | 是 | 手机号码 |
| smsCode | String | 是 | 6位短信验证码 |
| smsKey | String | 是 | 发送验证码时返回的key |

**成功响应**:
```json
{
  "code": "200",
  "message": "操作成功",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "expiresIn": 86400
  },
  "timestamp": "2024-01-20T10:30:00"
}
```

## 二、微信授权登录

### 2.1 微信小程序登录

**接口地址**: `POST /auth/miniapp-login`

**请求参数**:
```json
{
  "loginType": "wechat",
  "code": "0f3f4d8c7b2a19e0",
  "nickName": "微信用户",
  "avatarUrl": "https://example.com/avatar.jpg",
  "encryptedData": "CiyLU1Aw2KjvrjMdj...",
  "iv": "r7BXXKkLb8qrSNn05n0qiA=="
}
```

**参数说明**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| loginType | String | 是 | 登录类型，固定值："wechat" |
| code | String | 是 | 微信小程序登录code |
| nickName | String | 否 | 用户昵称 |
| avatarUrl | String | 否 | 用户头像URL |
| encryptedData | String | 否 | 手机号加密数据 |
| iv | String | 否 | 加密算法的初始向量 |

**成功响应**:
```json
{
  "code": "200",
  "message": "操作成功",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "expiresIn": 86400
  },
  "timestamp": "2024-01-20T10:30:00"
}
```

### 2.2 独立微信登录接口

**接口地址**: `POST /auth/wechat-login`

**请求参数**:
```json
{
  "code": "0f3f4d8c7b2a19e0",
  "nickName": "微信用户",
  "avatarUrl": "https://example.com/avatar.jpg",
  "encryptedData": "CiyLU1Aw2KjvrjMdj...",
  "iv": "r7BXXKkLb8qrSNn05n0qiA=="
}
```

## 三、账号密码登录

### 3.1 获取验证码

**接口地址**: `GET /auth/captcha`

**请求参数**: 无

**成功响应**:
```json
{
  "code": "200",
  "message": "操作成功",
  "data": {
    "captchaKey": "8f7e6d5c4b3a2910",
    "captchaImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
  },
  "timestamp": "2024-01-20T10:30:00"
}
```

### 3.2 后台管理系统登录

**接口地址**: `POST /auth/login`

**请求参数**:
```json
{
  "username": "admin",
  "password": "123456",
  "captchaKey": "8f7e6d5c4b3a2910",
  "captchaCode": "a1b2",
  "rememberMe": false
}
```

**参数说明**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| username | String | 是 | 用户名 |
| password | String | 是 | 密码 |
| captchaKey | String | 是 | 验证码key |
| captchaCode | String | 是 | 验证码 |
| rememberMe | Boolean | 否 | 记住我 |

### 3.3 小程序账号密码登录

**接口地址**: `POST /auth/miniapp-login`

**请求参数**:
```json
{
  "loginType": "password",
  "username": "user123",
  "password": "123456"
}
```

**参数说明**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| loginType | String | 是 | 登录类型，固定值："password" |
| username | String | 是 | 用户名 |
| password | String | 是 | 密码 |

## 四、用户注册

### 4.1 手机号快速注册

**接口地址**: `POST /auth/register`

**请求参数**:
```json
{
  "phone": "13800138000",
  "smsCode": "123456",
  "password": "123456",
  "smsKey": "sms_1705123456789"
}
```

**参数说明**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| phone | String | 是 | 手机号码 |
| smsCode | String | 是 | 6位短信验证码 |
| password | String | 是 | 密码，6-20位 |
| smsKey | String | 是 | 验证码key |

## 五、令牌管理

### 5.1 刷新令牌

**接口地址**: `POST /auth/refresh-token`

**请求参数**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 5.2 注销登录

**接口地址**: `DELETE /auth/logout`

**请求头**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 六、错误码说明

| 错误码 | 错误信息 | 说明 |
|--------|----------|------|
| A0400 | 请求参数错误 | 请求参数格式或内容错误 |
| A0002 | 用户不存在 | 用户账号不存在 |
| A0003 | 用户名或密码错误 | 登录凭证错误 |
| A0004 | 验证码错误或已过期 | 图形验证码错误 |
| A0005 | 账号已被禁用 | 用户账号被禁用 |
| A0006 | 无效的令牌 | Token无效 |
| A0007 | 令牌已过期 | Token过期 |
| A0401 | 未授权 | 需要登录 |
| A0403 | 禁止访问 | 权限不足 |
| A0413 | 微信登录失败 | 微信授权失败 |
| A0414 | 短信发送过于频繁 | 短信发送限制 |
| A0415 | 短信发送失败 | 短信服务异常 |
| A0416 | 手机号格式错误 | 手机号不符合规范 |
| A0417 | 验证码错误或已过期 | 短信验证码错误 |
| A0418 | 手机号已注册 | 手机号已存在 |
| B0001 | 系统异常 | 服务器内部错误 |

## 七、接口调用流程

### 7.1 短信验证码登录流程

```mermaid
sequenceDiagram
    participant C as 客户端
    participant S as 服务器
    
    C->>S: 1. 发送验证码 POST /auth/send-sms
    S->>C: 返回验证码key
    
    Note over C: 用户输入收到的验证码
    
    C->>S: 2. 验证码登录 POST /auth/miniapp-login
    S->>C: 返回访问令牌
    
    C->>S: 3. 携带令牌访问业务接口
```

### 7.2 微信授权登录流程

```mermaid
sequenceDiagram
    participant C as 客户端
    participant W as 微信服务器
    participant S as 服务器
    
    C->>W: 1. 调用wx.login()获取code
    W->>C: 返回临时登录凭证code
    
    C->>S: 2. 微信登录 POST /auth/miniapp-login
    S->>W: 3. 使用code换取openid
    W->>S: 返回用户信息
    S->>C: 4. 返回访问令牌
    
    C->>S: 5. 携带令牌访问业务接口
```

### 7.3 账号密码登录流程

```mermaid
sequenceDiagram
    participant C as 客户端
    participant S as 服务器
    
    C->>S: 1. 获取验证码 GET /auth/captcha
    S->>C: 返回验证码图片和key
    
    Note over C: 用户输入用户名、密码和验证码
    
    C->>S: 2. 账号密码登录 POST /auth/login
    S->>C: 返回访问令牌
    
    C->>S: 3. 携带令牌访问业务接口
```

## 八、安全注意事项

### 8.1 令牌安全
- 访问令牌有效期：24小时（86400秒）
- 刷新令牌有效期：7天（604800秒）
- 令牌应存储在安全位置，避免泄露
- 使用HTTPS传输，避免中间人攻击

### 8.2 密码安全
- 密码长度：6-20位
- 密码传输前建议进行MD5或SHA256加密
- 服务端使用BCrypt进行密码哈希存储

### 8.3 验证码安全
- 图形验证码有效期：5分钟
- 短信验证码有效期：5分钟
- 短信发送频率限制：
  - 每分钟最多1次
  - 每小时最多5次
  - 每天最多10次

### 8.4 接口安全
- 所有接口支持CORS跨域
- 敏感接口需要携带Authorization头
- 建议实现接口调用频率限制

## 九、测试环境信息

### 9.1 服务器信息
- **测试环境地址**: `http://localhost:8080`
- **API文档地址**: `http://localhost:8080/swagger-ui.html`
- **数据库监控**: `http://localhost:8080/druid/index.html`
  - 用户名：admin
  - 密码：admin123456

### 9.2 测试账号

#### 后台管理系统测试账号
- 用户名：`admin`
- 密码：`123456`

#### 小程序测试账号
- 用户名：`testuser`
- 密码：`123456`
- 测试手机号：`13800138000`

### 9.3 微信小程序配置
- AppID：需要在环境变量中配置
- AppSecret：需要在环境变量中配置
- 测试时可使用微信开发者工具的模拟登录功能

### 9.4 短信服务配置
- 使用腾讯云短信服务
- 测试环境下验证码固定为：`123456`
- 生产环境需配置真实的腾讯云密钥

## 十、常见问题

### 10.1 令牌相关
**Q: 令牌过期如何处理？**
A: 使用refresh-token接口刷新令牌，或重新登录获取新令牌。

**Q: 如何判断令牌是否有效？**
A: 调用需要认证的接口，如果返回401错误码，说明令牌无效。

### 10.2 验证码相关
**Q: 短信验证码收不到怎么办？**
A: 检查手机号格式，确认短信服务配置正确，测试环境可使用固定验证码123456。

**Q: 图形验证码看不清怎么办？**
A: 重新调用获取验证码接口获取新的验证码。

### 10.3 微信登录相关
**Q: 微信登录失败怎么办？**
A: 检查微信小程序配置，确认AppID和AppSecret正确，code是否有效。

## 十一、联系方式

如有技术问题，请联系后端开发团队：
- 技术支持邮箱：support@example.com
- 开发文档：本文档将持续更新
- 更新时间：2025年8月20日

---

**注意**: 本文档基于当前代码实现编写，如有接口变更，请及时更新文档。