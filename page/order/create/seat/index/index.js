// import { getUserInfo } from '../../resource/utils/comment.js'
var app = getApp();// var userid = app.globalData.usrid;
var userid = app.globalData.uid;
let animationShowHeight = 300; 
Page({
    data: {
      hiddenmodalput: true,
      secid:0,
		  floor: [],
		  floorIndex: 0,
      labid:1,
		  tableList: [{
        name: '余量：30',
			  id: 1,
			  tname:"第1节"
		  },{
        name: '余量：30',
			  id: 2,
        tname: "第2节"
		  },{
        name: '余量：30',
			  id: 3,
        tname: "第3节"
		  },{
        name: '余量：30',
			  id: 4,
        tname: "第4节"
		  },{
        name: '余量：30',
			  id: 5,
        tname: "第5节"
		  },
      {
        name: '余量：30',
        id: 6,
        tname: "第6节"
      },{
        name: '余量：30',
			  id: 7,
        tname: "第7节"
		  },{
        name: '余量：30',
			  id: 8,
        tname: "第8节"
		  }],
		  dates: '',
      enddates: '',
		  showDate: false,
		  weekList: ['一','二','三','四','五','六','日'],          // 星期池
      dayList: [],                                           // 日期池
      year: '',                                              // 当前年
      currentMonth: '',                                      // 当前月
      month: '',                                             // 当前月
      day: '',   
      day2: '',                                             // 选中日
      today: '',                                             // 当前日
      chooseDay: '',                                         // 选中日
      WeekDay: '1',                                          // 当前日期是本周几
      eventList:[],                                          // 事件池
      currentMonthList:[],                                   // 当月日历
    },
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
    //获取开放实验室列表
    onLoad: function (options) {
      var that = this;
      wx.request({
        url: app.globalData.host + '/admin/lab/queryOpenLab',
        header: {
          'content-type': 'application/json'
        },
        success(res) {    
          that.setData({
            floor: res.data.data,
            labid: res.data.data[0].labid
          })
        }
      })
		  var today = new Date();  // 获取当日日历
      //var year = today.getFullYear(),
      //month = today.getMonth() + 1,
    //  day = today.getDate();//修改为次日日
      //todo
      var timestamp = Date.parse(today);
      timestamp = timestamp / 1000;
      var tomorrow_timetamp = timestamp + 24 * 60 * 60;
      //加一天的时间：
      var n_tm = tomorrow_timetamp * 1000;
      var tm_date = new Date(n_tm);
      console.log("当前时间为：" + tm_date);
      var year = tm_date.getFullYear();
      //加一天后的月份
      var month = (tm_date.getMonth() + 1 < 10 ? '0' + (tm_date.getMonth() + 1) : tm_date.getMonth() + 1);
      //加一天后的日期
      var day = tm_date.getDate() < 10 ? '0' + tm_date.getDate() : tm_date.getDate();
      //todo
      console.log("当前时间戳为：" + timestamp);
      var tomorrow_timetamp = timestamp + 24 * 60 * 60*8;
      //加7天的时间：
      var n_to = tomorrow_timetamp * 1000;
      var tomorrow_date = new Date(n_to);
      console.log("截至时间为：" + tomorrow_date);
      var Y_tomorrow = tomorrow_date.getFullYear();
      //加一天后的月份
      var M_tomorrow = (tomorrow_date.getMonth() + 1 < 10 ? '0' + (tomorrow_date.getMonth() + 1) : tomorrow_date.getMonth() + 1);
      //加一天后的日期
      var D_tomorrow = tomorrow_date.getDate() < 10 ? '0' + tomorrow_date.getDate() : tomorrow_date.getDate();
      console.log("当前时间为：" + Y_tomorrow + M_tomorrow + D_tomorrow);
       // day2 = today.getMonth() + 2;//修改为次日日期
      this.setData({
			  year: year,
			  month: month,
			  currentMonth: month,
			  day: day,
        today: day,
        dates: year + '-' + month + '-' + day,
        day2: Y_tomorrow + '-' + M_tomorrow + '-' + D_tomorrow    //七日后时间
		  })
      //console.log(this.data.dates);
      this.fetchMonthData(year, month)                     // 获取本月日历
    },
    ///初始化课余量
    onReady:function(options){
      this.getHold();
    },
    //封装获取课余量函数
    getHold(){
      var that = this;
      //加载空闲余量
      wx.request({
        url: app.globalData.host + '/admin/labbook/getLabHold',
        data: {
          dates: this.data.dates,
          labid: this.data.labid
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          var tm = [];
          if (res.data.data.section1.substring(0, 1) != 'a') {
            tm[0] = '余座:' + res.data.data.section1;
          } else {
            tm[0] = res.data.data.section1.substring(1, 100);
          }
          if (res.data.data.section2.substring(0, 1) != 'a') {
            tm[1] = '余座:' + res.data.data.section2;
          } else {
            tm[1] = res.data.data.section2.substring(1, 100);
          }
          if (res.data.data.section3.substring(0, 1) != 'a') {
            tm[2] = '余座:' + res.data.data.section3;
          } else {
            tm[2] = res.data.data.section3.substring(1, 100);
          }
          if (res.data.data.section4.substring(0, 1) != 'a') {
            tm[3] = '余座:' + res.data.data.section4;
          } else {
            tm[3] = res.data.data.section4.substring(1, 100);
          }
          if (res.data.data.section5.substring(0, 1) != 'a') {
            tm[4] = '余座:' + res.data.data.section5;
          } else {
            tm[4] = res.data.data.section5.substring(1, 100);
          }
          if (res.data.data.section6.substring(0, 1) != 'a') {
            tm[5] = '余座:' + res.data.data.section6;
          } else {
            tm[5] = res.data.data.section6.substring(1, 100);
          }
          if (res.data.data.section7.substring(0, 1) != 'a') {
            tm[6] = '余座:' + res.data.data.section7;
          } else {
            tm[6] = res.data.data.section7.substring(1, 100);
          }
          if (res.data.data.section8.substring(0, 1) != 'a') {
            tm[7] = '余座:' + res.data.data.section8;
          } else {
            tm[7] = res.data.data.section8.substring(1, 100);
          }
          var up0 = "tableList[" + 0 + "].name";
          var up1 = "tableList[" + 1 + "].name";
          var up2 = "tableList[" + 2 + "].name";
          var up3 = "tableList[" + 3 + "].name";
          var up4 = "tableList[" + 4 + "].name";
          var up5 = "tableList[" + 5 + "].name";
          var up6 = "tableList[" + 6 + "].name";
          var up7 = "tableList[" + 7 + "].name";
          that.setData({
            [up0]: tm[0],
            [up1]: tm[1],
            [up2]: tm[2],
            [up3]: tm[3],
            [up4]: tm[4],
            [up5]: tm[5],
            [up6]: tm[6],
            [up7]: tm[7]
          })
        }
      })
    },
    bindFloorPickerChange: function (e) {
      // console.log('111'+this.data.floorIndex);
      this.data.floor.forEach((ele, index) => {
            // if(ele == casArray[e.detail.value]){
            //     code = ele.code
            // }
      });
	    this.setData({
        floorIndex: e.detail.value,
        labid: this.data.floor[e.detail.value].labid,
	    })
      //console.log('当前日期为:'+this.data.dates);
      //console.log('当前选中的实验室id为:'+this.data.labid);
      this.getHold();//重新加载课余量
	  },

	  bindRoomPickerChange: function (e) {
        this.data.room.forEach((ele, index) => {
            // if(ele.school == casArray[e.detail.value]){
            //     code = ele.code
            // }
        });
	      this.setData({
	    	  roomIndex: e.detail.value,
	      })
	  },

	  // 阻止蒙层下滚动
	  preventD(){

	  },

	  showDate(){
		  var _this = this;
		
		  var animation = wx.createAnimation({  
			  duration: 200,  
			  timingFunction: "linear",  
			  delay: 0  
		  });  
		  _this.animation = animation;  
		  animation.translateY(animationShowHeight).step(); 

		  _this.setData({  
			  animationData: animation.export(),  
			  showDate: !this.data.showDate
	  	});

		  setTimeout(function () {  
			  animation.translateY(0).step()  
		  	_this.setData({  
				  animationData: animation.export()  
			  })  
		  }.bind(_this), 200);  
	  },

	  closeDateMask(){
		  var _this = this;
		  var animation = wx.createAnimation({  
			  duration: 200,  
			  timingFunction: "linear",  
			  delay: 0  
		  });  

		  _this.animation = animation;  
		  animation.translateY(animationShowHeight).step();

		  _this.setData({  
			  animationData: animation.export(),  
		  });

		  setTimeout(function () {  
			  animation.translateY(0).step();  
			  _this.setData({  
				  animationData: animation.export(),  
				  showDate: false 
			  })  
		  }.bind(_this), 200);  
	  },

	  // 获取月日历
    fetchMonthData(year, month) {
    	var year = year ? year : this.data.year;
    	var month = month ? month : this.data.month;

      var ret = []

      var firstDay = new Date(year, month -1, 1)
      var firstDayWeekDay = firstDay.getDay()
      if(firstDayWeekDay === 0) firstDayWeekDay = 7

      var lastDayLastMonth = new Date(year , month -1, 0)
      var lastDayOfLastMonth = lastDayLastMonth.getDate()

      var preMonthDayCount = firstDayWeekDay - 1

      var lastDay = new Date(year, month , 0);
      var lastDate = lastDay.getDate()

        for(var i=0; i<7*6; i++){
            var date = i + 1 - preMonthDayCount;
            var showDate = date
            var thisMonth = month

            // 上一月
            if(date <= 0){
                thisMonth = month -1
                showDate = lastDayOfLastMonth + date
            }
            // 下一月
            else if (date > lastDate) {
                thisMonth = month + 1
                showDate = showDate - lastDate
            };

            if(thisMonth === 0) thisMonth = 12
            if(thisMonth === 13) thisMonth = 1

            ret.push(showDate)
        }

        var arr = []

        // 去除非本月日历
        ret.forEach((element, index) =>{
            if(index < preMonthDayCount){
                element = ''
            }else if(index >20 && element <15){
                element = ''
            }
            arr.push(element)
        })

        this.setData({
            currentMonthList: arr
        })
    },

    chooseDay(e){
    	let item = e.currentTarget.dataset.choosed
    	if(item < this.data.day && this.data.currentMonth == this.data.month){
    		return
    	}else{
    		this.setData({
	    		day: item
	    	})
    	}
    },

    changeMonth(e){
    	let type = e.currentTarget.dataset.type

    	if(type-0){
			this.setData({
				year: this.data.month == 12 ? this.data.year + 1 : this.data.year,
				month: this.data.month == 12 ? 1 : this.data.month + 1,
				day: 1
			})
			this.fetchMonthData()
    	}else{
    		if(this.data.currentMonth < this.data.month){
    			this.setData({
					month: this.data.month - 1,
					day: 1
				})
				this.fetchMonthData()
    		}
    	}
    },

    bindDateChange: function (e) {
	    this.setData({
	        dates: e.detail.value
	    })
      this.getHold();//日期改变时重新获取课余量
    },
    //todo
    confirmbt: function (e) {
        var id = e.currentTarget.id;
        this.setData({
          hiddenmodalput: !this.data.hiddenmodalput,
          secid: id
        })

      },
    //预约函数
    confirm(e){
      this.setData({
        hiddenmodalput: !this.data.hiddenmodalput,
      })
      var that=this;
      var cid=e.currentTarget.id;//获取第几节次
    	//console.log(cid);
      //有课的话，不让点击预约
      if (this.data.tableList[cid - 1].name.substring(0, 1) !='余'){
        app.showModal('此节次有课，不可预约！');
        return;
      }
      //课余量为0的话，不让点击预约
      if (this.data.tableList[cid - 1].name == '余座:0') {
        app.showModal('已无剩余位置可约');
        return;
      }
      wx.request({
        url: app.globalData.host + '/admin/labbook/booking',
        data:{
          section:cid,
          dates:this.data.dates,
          labid:this.data.labid,
          userid: app.globalData.uid
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          //console.log(res.data.retmsg);
          //app.showModal(res.data.retmsg);
          wx.showModal({
            title: '预约提示',
            content: res.data.retmsg,
            confirmText:'立即查看',
            cancelText:'留在此页',
            success(res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '/page/order/index/index',
                })
              } else if (res.cancel) {
              }
            }
          });
          that.getHold();
        }
      })

    }
})