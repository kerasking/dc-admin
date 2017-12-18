//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
      pageHeight: app.globalData.window.height,
      pageWidth: app.globalData.window.width,
      listWidth: (app.globalData.window.width*2 - 1)/2
  },
  onLoad: function () {
      console.log(app.globalData.window);
  }
  
})
