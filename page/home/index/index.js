// import { getUserInfo, getImageSocket, getLocation } from '../../resource/utils/comment.js'
import { Index } from 'index-model.js'
var index = new Index()
let app = getApp();
let animationShowHeight = 300; 
const LENGTH = 10;
Page({
	data: {
    advs: ['/resource/images/header7.jpg',
      '/resource/images/header8.jpg',
      '/resource/images/header9.jpg',
      '/resource/images/header10.jpg'
		],
		noticeList: [],
		orderList: [],
    templist:[],
    rulenum :'100'
	},
  labdetail: function (e) {
    var labid = e.currentTarget.id;
    wx.navigateTo({
      url: '../../labdetail/labdetail?labid=' + labid,
    })
  },

  announcementdetail: function (e) {
    var noticeid = e.currentTarget.id;
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
      url: '../../announce/announce?noticeid=' + noticeid,
    })
  },
	
	onLoad: function(){
      var that = this;
      wx.request({
        url: app.globalData.host + '/admin/announcement/wechatqueryAnnouncement',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          that.setData({
            noticeList: res.data.data,
          })
        }
      }),
        wx.request({
        url: app.globalData.host + '/admin/lab/queryOpenLab',
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            that.setData({
              orderList: res.data.data,
            })
          }
        }),
        wx.request({
          url: app.globalData.host + '/admin/config/getbrokenum',
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            that.setData({
              rulenum: res.data.data,
            })
          }
        });
	},
  
	createOrder(e){
		let name = e.currentTarget.dataset.name, url = '';
    var that=this;
		switch (name) {
			case 'space':
        wx.navigateTo({
          url: "/page/order/create/bookAr/index/index"
        })
				break;
			case 'seat':
        wx.request({
          url: app.globalData.host + '/admin/labbook/wechatquerybrokeList?userid=' + getApp().globalData.uid,
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            that.setData({
              templist: res.data.data,
            })
            
            if(that.data.templist.length<=that.data.rulenum){
              wx.navigateTo({
                url: "/page/order/create/seat/index/index"
              })
            }else{
              app.showModal('已超过违约次数上限，请联系管理员!');
              return;
            }
          }
        });
				break;
			case 'lecture':
        wx.navigateTo({
          url: "/page/order/create/space/index/index"
        })
				break;
		}
		
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