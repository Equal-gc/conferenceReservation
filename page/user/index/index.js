// import { getUserInfo } from '../../resource/utils/comment.js'
var app = getApp(); 
Page({
    data: {
		info: {},
    hiddenModal: true,
    showModalStatus: false,
    animationData: null
    },

    onLoad: function (options) {
      console.log('进入个人中心')
		this.setData({
			info: {
				name: '',
				count:'',
				headImg: ''
			}
		})  
    },
   //完善个人信息
    setUserMsg(){
      wx.request({
        url: app.globalData.host + '/admin/personnel/judgeUserState',
        data: {
          userid: app.globalData.uid
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          if (res.data.data=='2') {
            wx.navigateTo({
              url: "/page/user/msg/index"
            })
          }
          if (res.data.data == '0') {
            app.showModal("资料审核中，请耐心等待")
          }
          if (res.data.data == '1') {
            wx.navigateTo({
              url: "/page/user/msgupdate/msgupdate"
            })
          }
        }
      }) 
        
    },
	// 我的学币
    goToMyMoney(){
    	wx.navigateTo({
	        url: `/page/user/money/index`
    	})
    },
	// 我的预约码
    goToMyQrcode(){
    	wx.navigateTo({
	        url: `/page/user/qrcode/index`
    	})
    },

	// 公告提醒
    goToNotice(){
    	wx.navigateTo({
	        url: `/page/user/noticeList/index`
    	})
    },

	// 我的权限
    goToMyAuth(){
    	wx.navigateTo({
	        url: `/page/user/auth/index`
    	})
    },
    // 重置密码
	resetPassword(){
    	this.setData({
            hiddenModal: false
        })
    },
    // 取消重置密码
    listenerCancel(){
        this.setData({
            hiddenModal: true
        })
    },
	// 客服
    goToBoard(){
    	wx.navigateTo({
	        url: `/page/user/service/index`
    	})
    },
    //隐藏对话框
    hideModal: function () {
        // 隐藏遮罩层
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation
        animation.translateY(300).step()
        this.setData({
            animationData: animation.export(),
        })
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export(),
                showModalStatus: false
            })
        }.bind(this), 200)
    }, 

    loginOutConfirm(){
        wx.redirectTo({
            url: "/page/home/login/index"
        })
        this.hideModal()
    }
})