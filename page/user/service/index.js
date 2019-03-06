// pages/suggest/suggest.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    suggestion: '',
    suggest_focus: false,
    phonenumber_focus: false,
    phonenumber: "00000000",
    userid:''
  },
  //点击输入框，textarea组件获得焦点
  suggestFocus: function (e) {
    this.setData({
      suggest_focus: true,
      phonenumber_focus: false,

    })
  },
  //把建议输入框的内容赋给suggestion
  suggestInput: function (e) {
    this.setData({
      suggestion: e.detail.value
    })
  },
  phonenumberFocus: function (e) {
    this.setData({
      phonenumber_focus: true,
      suggest_focus: false,

    })
  },
  phoneNumberinput: function (e) {
    this.setData({
      suggest_focus: false,
      phonenumber_focus: true,
      phonenumber: e.detail.value
    });
  },
  testfunc:function(){
    


  },

  submitClick: function (e) {
    var mobile = this.data.suggestion;
    if (mobile=="") {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入建议后再提交',
      })
    } else {
      var suggestion = this.data.suggestion;
      wx.request({
        url: app.globalData.host + '/admin/suggestion/addSuggestion',
        data: {
          suggestion: this.data.suggestion,
          cellphone: "123456",
          userid: this.data.userid
        },
        header: {
          'content-type': 'application/json'
        },

        success(res) {
          wx.showModal({
            title: '感谢您的反馈',
            showCancel: false,
            content: res.data.retmsg,
          })
        },
        fail(res) {
          wx.showModal({
            title: '网络异常',
            content: '请重新输入',
          })
        }
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var num = app.globalData.uid;
    this.setData({
      userid: num
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

  },
})