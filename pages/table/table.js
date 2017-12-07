// pages/table/table.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
  margin:0,
  width:0,
  innerWidth:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var self = this;
      self.setData({
          margin: parseInt((app.globalData.window.width - 320) / 2),
          width: parseInt((app.globalData.window.width - 60) / 3),
          innerWidth:parseInt((app.globalData.window.width-60)/3-20)
          });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})