var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    advs: ['/resource/images/11.jpg',
      '/resource/images/12.jpg'
    ],
    lab: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var j = parseInt(options.labid);
    console.log(j);
    wx.request({
      url: app.globalData.host + '/admin/lab/queryLabById?id=' +j,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          lab: res.data.data,
        })
      }
    })
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