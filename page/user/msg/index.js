//var userid=wx.getStorageSync("userid");//将用户id从缓存中拿到
var app = getApp(); //var userid = app.globalData.uid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {
      id: app.globalData.uid,
      openid:'',
      name: '',
      schoolno: '',
      isstu:'',
      isdelete:'',
      phone:'',
      major:'计算机系',
      college:'信息科学与工程学院',
      isapproved:''
    },
    multiIndex: [0, 0],

    multiArray: [['信息科学与工程学院', '地球科学学院', '石油工程学院', '化学工程与环境学院', '机械与储运工程学院', '地球物理学院', '安全与海洋工程学院', '新能源与材料学院', '理学院', '经济管理学院', '外国语学院'], ['计算机系', '软件工程系', '自动化系', '测控系']],

    objectMultiArray:

      [{ "regid": "2", "parid": "2", "regname": "计算机系", "regtype": "1", "ageid": "0" }, { "regid": "3", "parid": "2", "regname": "软件工程系", "regtype": "1", "ageid": "0" }, { "regid": "4", "parid": "2", "regname": "自动化系", "regtype": "1", "ageid": "0" }, { "regid": "5", "parid": "2", "regname": "测控系", "regtype": "1", "ageid": "0" }, { "regid": "6", "parid": "3", "regname": "地质学系", "regtype": "1", "ageid": "0" }, { "regid": "7", "parid": "3", "regname": "油气勘探与开发地质系", "regtype": "1", "ageid": "0" }, { "regid": "8", "parid": "3", "regname": "地球化学与环境科学系", "regtype": "1", "ageid": "0" }, { "regid": "9", "parid": "4", "regname": "油气井工程系", "regtype": "1", "ageid": "0" }, { "regid": "10", "parid": "4", "regname": "油气田开发工程系", "regtype": "1", "ageid": "0" }, { "regid": "11", "parid": "4", "regname": "工程力学系", "regtype": "1", "ageid": "0" }, { "regid": "12", "parid": "5", "regname": "化学工艺系", "regtype": "1", "ageid": "0" }, { "regid": "13", "parid": "5", "regname": "化学工程系", "regtype": "1", "ageid": "0" }, { "regid": "14", "parid": "5", "regname": "环境科学系", "regtype": "1", "ageid": "0" }, { "regid": "15", "parid": "5", "regname": "环境工程系", "regtype": "1", "ageid": "0" }, { "regid": "16", "parid": "5", "regname": "能源与催化工程系", "regtype": "1", "ageid": "0" }, { "regid": "17", "parid": "6", "regname": "机电工程系", "regtype": "1", "ageid": "0" }, { "regid": "18", "parid": "6", "regname": "油气储运工程系", "regtype": "1", "ageid": "0" }, { "regid": "19", "parid": "6", "regname": "过程装备系", "regtype": "1", "ageid": "0" }, { "regid": "20", "parid": "6", "regname": "热能工程系", "regtype": "1", "ageid": "0" }, { "regid": "21", "parid": "7", "regname": "物探系", "regtype": "1", "ageid": "0" }, { "regid": "22", "parid": "7", "regname": "测井系", "regtype": "1", "ageid": "0" }, { "regid": "23", "parid": "8", "regname": "海洋油气工程系", "regtype": "1", "ageid": "0" }, { "regid": "24", "parid": "8", "regname": "安全工程系", "regtype": "1", "ageid": "0" }, { "regid": "25", "parid": "9", "regname": "材料科学与工程系", "regtype": "1", "ageid": "0" }, { "regid": "26", "parid": "10", "regname": "数学系", "regtype": "1", "ageid": "0" }, { "regid": "27", "parid": "10", "regname": "物理系", "regtype": "1", "ageid": "0" }, { "regid": "28", "parid": "10", "regname": "应用化学系", "regtype": "1", "ageid": "0" }, { "regid": "29", "parid": "11", "regname": "管理系", "regtype": "1", "ageid": "0" }, { "regid": "30", "parid": "11", "regname": "经济与贸易系", "regtype": "1", "ageid": "0" }, { "regid": "31", "parid": "11", "regname": "财务与会计系", "regtype": "1", "ageid": "0" }, { "regid": "32", "parid": "12", "regname": "英语系", "regtype": "1", "ageid": "0"}]
  },
  //获取单选框的值
  radioChange(e) {
    this.data.userinfo.isstu = e.detail.value;
  },
  //picker点击确定触发
  bindMultiPickerChange: function (e) {
    var coll = 'userinfo.college';
    var ma = 'userinfo.major';
    this.setData({
      "multiIndex[0]": e.detail.value[0],
      "multiIndex[1]": e.detail.value[1],
      [coll]: this.data.multiArray[0][e.detail.value[0]],
      [ma]: this.data.multiArray[1][e.detail.value[1]]
    })
  },
//picker的列变化时触发
  bindMultiPickerColumnChange: function (e) {
    switch (e.detail.column) {
      case 0:
        var list = [];
        for (var i = 0; i < this.data.objectMultiArray.length; i++) {
          if (this.data.objectMultiArray[i].parid == this.data.objectMultiArray[e.detail.value].regid) {
            list.push(this.data.objectMultiArray[i].regname)
          }
        }
        this.setData({
          "multiArray[1]": list,
          "multiIndex[0]": e.detail.value,
          "multiIndex[1]": 0
        })
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
        userid: app.globalData.uid
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
    var disab=false;
    if(this.data.userinfo.isapproved==1){
      disab=true;
    }
  },

  //获取用户输入的个人信息
  txtChanged(e){
    var txtId = e.currentTarget.id;
    if (txtId == 1) {
      this.data.userinfo.schoolno = e.detail.value;
    } else if (txtId == 2) {
      this.data.userinfo.name = e.detail.value;
    // } else if (txtId == 3) {
    //   this.data.userinfo.college = e.detail.value;
    // } else if (txtId == 4) {
    //   this.data.userinfo.major = e.detail.value;
    } else if (txtId == 5) {
      this.data.userinfo.phone = e.detail.value;
    }else{
    }
    //console.log(this.data.userinfo);
  },
  //提交个人信息
  clickButtonCommit(){
    console.log('准备提交个人信息');
    console.log(this.data.userinfo.schoolno);
    if (this.data.userinfo.schoolno==null||this.data.userinfo.schoolno==''){
      wx.showToast({
        title: '学号不能为空！',
      })
      return;
    }
    if (this.data.userinfo.name == null || this.data.userinfo.name == '') {
      wx.showToast({
        title: '姓名不能为空！',
      })
      return;
    }
    if (this.data.userinfo.phone == null || this.data.userinfo.phone == '') {
      wx.showToast({
        title: '电话号码不能为空！',
      })
      return;
    }
    wx.request({
      url: app.globalData.host + '/admin/personnel/updateUserInfo',
      data: {
        userid: app.globalData.uid,
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
        console.log('完善用户信息成功!' + rs);
        app.showModal("提交成功，待审核后方可预约！");
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