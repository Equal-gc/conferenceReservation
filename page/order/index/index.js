let app = getApp();
Page({
    data: {
      nowList: [],
      historyList: [],
      brokeList: [],
      hiddenmodalput: true,
      hiddenmodalput2: true,
      bookid:0,
     bookcode:''
    },
  bookdetail: function (e) {
    var id = e.currentTarget.id;
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      bookid:id
    }) },
  bookconcel: function (e) {
    var id = e.currentTarget.id;
    this.setData({
      hiddenmodalput2: !this.data.hiddenmodalput,
      bookid: id
    })
  },
  cancel2: function () {
    this.setData({
      hiddenmodalput2: true
    });
  },
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  ipsd: function (e) {
    var j = e.detail.value;
    //console.log(j);
    this.setData({
      bookcode: j,
    })
  },
  //确认  
  confirm: function (e) {
    var that=this;
    var id = e.currentTarget.id;
    console.log(id + this.data.bookcode);
    wx.request({
      url: app.globalData.host + '/admin/labbook/conformcode',
      data:{
         id:this.data.bookid,
         code:this.data.bookcode
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if(res.data.data==1){
          app.showModal("签到成功");
          that.setData({
            hiddenmodalput:true
          })
         that.refresssh();
        }
        if (res.data.data == 0) {
          app.showModal("输入有误");
        }
        if (res.data.data == 2) {
          app.showModal("网络错误");
          that.setData({
            hiddenmodalput: true
          })
        }
      }
    })
  },

  //确认  
  confirm2: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    console.log(id);
    wx.request({
      url: app.globalData.host + '/admin/labbook/cancelbook',
      data: {
        id: this.data.bookid
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.data.data == 1) {
          app.showModal("取消成功");
          that.setData({
            hiddenmodalput2: true
          })
          that.refresssh();
        }
        if (res.data.data != 1) {
          app.showModal("网络错误");
        }
      }
    })
  },
  refresssh: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.host + '/admin/labbook/wechatqueryLabBook?userid=' + app.globalData.uid,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          historyList: res.data.data,
        })
      }
    })
    wx.request({
      url: app.globalData.host + '/admin/labbook/wechatquerynowList?userid=' + app.globalData.uid,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          nowList: res.data.data,
        })
      }
    })
    wx.request({
      url: app.globalData.host + '/admin/labbook/wechatquerybrokeList?userid=' + app.globalData.uid,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          brokeList: res.data.data,
        })
      }
    })
  },

    onLoad: function (options) {
      var that = this;
      wx.request({
        url: app.globalData.host + '/admin/labbook/wechatqueryLabBook?userid=' + app.globalData.uid,
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          that.setData({
            historyList: res.data.data,
          })
        }
      })
      wx.request({
        url: app.globalData.host + '/admin/labbook/wechatquerynowList?userid=' + app.globalData.uid,
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          that.setData({
            nowList: res.data.data
            })
        }
      })
      wx.request({
        url: app.globalData.host + '/admin/labbook/wechatquerybrokeList?userid=' + app.globalData.uid,
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          that.setData({
            brokeList: res.data.data,
          })
        }
      })
    },
  onShow: function (options) {
  this.onLoad();
  },
  //转发
  onShareAppMessage: function () {
    return {
      title: '学霸！快来预约实验室啦',
      path: '/page/home/index/index',
      success: function (res) { }
    }
  }
})