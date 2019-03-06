//app.js
App({
  onLaunch: function (options) 
  { 
    let that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: that.globalData.host + '/admin/personnel/userLogin',
            data: {
              code: res.code
            },//hsd/////yjfuiryuj+++
            header: {
              'content-type': 'application/json'
            },
            success(res) {
              console.log('用户登录成功！id='+res.data.data);
              wx.setStorageSync("userid", res.data.data);//将用户id保存到缓存中
             // that.globalData.uid = 31
              that.globalData.uid = res.data.data
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },

  isEmpty(str) //判断字符串是否为空
  {
    if (str == undefined) {
      //console.log('undefined' + str)
      return true;
    }
    if (str == "") {
      //console.log('空' + str)
      return true;
    }
    if (str == "undefined") {
      //console.log('空' + str)
      return true;
    }
    if (str == null) {
      //console.log('空' + str)
      return true;
    }
    return false;
  },
  
  showModal(str){//模态弹出框
    wx.showModal({
      title: '提示',
      content: str,
      showCancel: false,
      success: function (res) {
         
      }
    })
  },

  globalData: {
    //host:'https://lsw.noblog.top',
    host:'http://localhost:8080',
    uid:''
  }
})
