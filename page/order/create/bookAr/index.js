var userid = app.globalData.uid;
var app= getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {
      id:userid,
      openid:'',
      name: '',
      schoolno: '',
      isstu:'',
      isdelete:'',
      phone:'',
      major:'',
      college:'',
      isapproved:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: app.globalData.host + '/admin/personnel/getUserInfo',
      data: {
        userid: userid
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var rs=res.data.data;
        console.log('获取用户信息成功!' + res.data.data.openid);
        that.setData({
          userinfo: {
            openid:rs.openid,
            name: rs.name,
            schoolno: rs.schoolno,
            isstu: rs.isstu,
            isdelete: rs.isdelete,
            phone: rs.phone,
            major: rs.major,
            college: rs.college,
            isapproved: rs.isapproved
          }
        })
      }
    })   
  },

  //获取用户输入的个人信息
  txtChanged(e){
    var txtId = e.currentTarget.id;
    if (txtId == 1) {
      this.data.userinfo.schoolno = e.detail.value;
    } else if (txtId == 2) {
      this.data.userinfo.name = e.detail.value;
    } else if (txtId == 3) {
      this.data.userinfo.college = e.detail.value;
    } else if (txtId == 4) {
      this.data.userinfo.major = e.detail.value;
    } else if (txtId == 5) {
      this.data.userinfo.phone = e.detail.value;
    }else{
    }
    //console.log(this.data.userinfo);
  },
  //提交个人信息
  clickButtonCommit(){
    console.log('准备提交个人信息');
    wx.request({
      url: app.globalData.host + '/admin/personnel/updateUserInfo',
      data: {
        userid: userid,
        schoolno:this.data.userinfo.schoolno,
        name: this.data.userinfo.name,
        college:this.data.userinfo.college,
        major:this.data.userinfo.major,
        phone:this.data.userinfo.phone,
        isstu:this.data.userinfo.isstu
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var rs = res.data.data;
        console.log('更新用户信息成功!' + rs);
        app.showModal("提交成功，待管理员审核通过后可进行预约！");
        wx.navigateTo({
          url: 'page/user/index/index',
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