// 图片裁剪组件
Page({
  data: {
    src: '', // 图片路径
    width: 250, // 裁剪框宽度
    height: 250, // 裁剪框高度
    scale: 2, // 最大缩放倍数
    zoom: 5, // 缩放系数
    imageLeft: 0, // 图片左边距
    imageTop: 0, // 图片上边距
    imageWidth: 0, // 图片宽度
    imageHeight: 0, // 图片高度
    startX: 0, // 触摸开始X坐标
    startY: 0, // 触摸开始Y坐标
    cut: {
      x: 0, // 裁剪框x轴起点
      y: 0, // 裁剪框y轴期起点
      width: 250, // 裁剪框宽度
      height: 250 // 裁剪框高度
    }
  },

  onLoad(options) {
    // 获取设备信息
    const windowInfo = wx.getWindowInfo();
    const windowWidth = windowInfo.windowWidth;
    
    // 计算裁剪框大小，保持正方形，宽度占满屏幕
    const size = windowWidth;
    
    this.setData({
      src: options.src,
      width: size,
      height: size,
      cut: {
        x: 0,
        y: 60,
        width: size,
        height: size
      }
    });
    
    // 加载图片获取图片信息
    wx.getImageInfo({
      src: options.src,
      success: (res) => {
        // 计算图片初始位置和大小
        const imgWidth = res.width;
        const imgHeight = res.height;
        // 修改缩放逻辑，确保图片填满裁剪区域
        const scale = size / Math.min(imgWidth, imgHeight);
        
        this.setData({
          imageWidth: imgWidth * scale,
          imageHeight: imgHeight * scale,
          imageLeft: (size - imgWidth * scale) / 2,
          imageTop: (size - imgHeight * scale) / 2 + 60
        });
      }
    });
  },

  // 加载裁剪组件
  cropperLoad(e) {
    console.log('cropper加载完成');
  },

  // 图片加载完成
  cropperImageLoad(e) {
    console.log('图片加载完成', e.detail);
  },

  // 触摸开始事件
  touchStart(e) {
    const touch = e.touches[0];
    this.setData({
      startX: touch.clientX,
      startY: touch.clientY
    });
  },

  // 触摸移动事件 - 实现拖动和缩放
  touchMove(e) {
    // 处理多指触摸（缩放）
    if (e.touches.length >= 2) {
      const xMove = e.touches[1].clientX - e.touches[0].clientX;
      const yMove = e.touches[1].clientY - e.touches[0].clientY;
      const distance = Math.sqrt(xMove * xMove + yMove * yMove);
      
      if (!this.data.oldDistance) {
        this.data.oldDistance = distance;
        return;
      }
      
      const scale = distance / this.data.oldDistance;
      this.data.oldDistance = distance;
      
      // 计算新的图片尺寸
      const newWidth = this.data.imageWidth * scale;
      const newHeight = this.data.imageHeight * scale;
      
      // 确保缩放后的图片尺寸不小于裁剪框
      if (newWidth < this.data.width || newHeight < this.data.height) {
        return;
      }
      
      // 限制缩放范围
      if (newWidth < this.data.width / 2 || newWidth > this.data.width * 3) return;
      
      // 计算新的位置，保持缩放中心
      const centerX = this.data.imageLeft + this.data.imageWidth / 2;
      const centerY = this.data.imageTop + this.data.imageHeight / 2;
      const newLeft = centerX - newWidth / 2;
      const newTop = centerY - newHeight / 2;
      
      this.setData({
        imageWidth: newWidth,
        imageHeight: newHeight,
        imageLeft: newLeft,
        imageTop: newTop
      });
      return;
    }
    
    // 处理单指触摸（拖动）
    const touch = e.touches[0];
    const moveX = touch.clientX - this.data.startX;
    const moveY = touch.clientY - this.data.startY;
    
    // 计算新位置
    let newLeft = this.data.imageLeft + moveX;
    let newTop = this.data.imageTop + moveY;
    
    // 限制图片不能拖出裁剪框
    // 左边界限制
    if (newLeft > this.data.cut.x) {
      newLeft = this.data.cut.x;
    }
    // 右边界限制
    if (newLeft + this.data.imageWidth < this.data.cut.x + this.data.cut.width) {
      newLeft = this.data.cut.x + this.data.cut.width - this.data.imageWidth;
    }
    // 上边界限制
    if (newTop > this.data.cut.y) {
      newTop = this.data.cut.y;
    }
    // 下边界限制
    if (newTop + this.data.imageHeight < this.data.cut.y + this.data.cut.height) {
      newTop = this.data.cut.y + this.data.cut.height - this.data.imageHeight;
    }
    
    this.setData({
      imageLeft: newLeft,
      imageTop: newTop,
      startX: touch.clientX,
      startY: touch.clientY
    });
  },



  // 触摸结束事件
  touchEnd(e) {
    this.data.oldDistance = 0;
  },

  // 确认裁剪
  confirmCrop() {
    // 使用Canvas 2D接口进行裁剪
    const query = wx.createSelectorQuery();
    query.select('#cropCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res || !res[0] || !res[0].node) {
          console.error('Canvas节点获取失败');
          return;
        }
        
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        
        // 设置canvas尺寸
        const deviceInfo = wx.getDeviceInfo();
        const dpr = deviceInfo.pixelRatio || 2;
        const cutWidth = this.data.cut.width || 250;
        const cutHeight = this.data.cut.height || 250;
        
        canvas.width = cutWidth * dpr;
        canvas.height = cutHeight * dpr;
        ctx.scale(dpr, dpr);
        
        // 创建图片对象
        const img = canvas.createImage();
        img.onload = () => {
          // 绘制图片到canvas
          ctx.drawImage(img, 
            this.data.imageLeft - this.data.cut.x, 
            this.data.imageTop - this.data.cut.y, 
            this.data.imageWidth, 
            this.data.imageHeight);
          
          // 导出图片
          wx.canvasToTempFilePath({
            canvas: canvas,
            x: 0,
            y: 0,
            width: cutWidth,
            height: cutHeight,
            destWidth: cutWidth * 2, // 提高导出图片质量
            destHeight: cutHeight * 2,
            success: (res) => {
              // 通过事件通道传递裁剪后的图片
              const eventChannel = this.getOpenerEventChannel();
              eventChannel.emit('cropImage', { tempFilePath: res.tempFilePath });
              
              // 返回上一页
              wx.navigateBack();
            },
            fail: (err) => {
              console.error('裁剪失败', err);
              // 如果裁剪失败，返回原图
              const eventChannel = this.getOpenerEventChannel();
              eventChannel.emit('cropImage', { tempFilePath: this.data.src });
              wx.navigateBack();
            }
          });
        };
        
        img.onerror = () => {
          console.error('图片加载失败');
          // 如果图片加载失败，返回原图
          const eventChannel = this.getOpenerEventChannel();
          eventChannel.emit('cropImage', { tempFilePath: this.data.src });
          wx.navigateBack();
        };
        
        img.src = this.data.src;
      });
  },

  // 取消裁剪
  cancelCrop() {
    wx.navigateBack();
  }
});