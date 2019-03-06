let app = getApp();
let animationShowHeight = 300; 
const LENGTH = 10;
Page({
	data: {
    advs: ['/resource/images/header2.jpg','/resource/images/header3.jpg'
		],
		orderList: [],
	},
  labdetail: function (e) {
    var labid = e.currentTarget.id;
    //console.log("44444444444444"+this.data.noticeList[0]);
    // var notice_now={};
    // var content="";
    // for(var i=0;i<this.data.noticeList.length;i++){
    //   if(this.data.noticeList[i].id==noticeid){
    //     notice_now.id=noticeid;
    //     notice_now.announcementtitle = this.data.noticeList[i].announcementtitle;
    //     content = this.data.noticeList[i].announcementcontent
    //     //console.log(content);
    //     notice_now.announcementimage = this.data.noticeList[i].announcementimage;            notice_now.announcementtime = this.data.noticeList[i].announcementtime;
    //   }
    // }
    //console.log(JSON.stringify(notice_now));
    wx.navigateTo({
      // url: '../../announce/announce?notice='+JSON.stringify(notice_now)+'&content='+content,
      url: '../../../../labdetail/labdetail?labid=' + labid,
    })
  },
	
	onLoad: function(){
      var that = this;
        wx.request({
          url: app.globalData.host + '/admin/lab/queryAllLab',
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            that.setData({
              orderList: res.data.data,
            })
          }
        })
	},
})