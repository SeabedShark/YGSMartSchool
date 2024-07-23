 App({
 	onLaunch: function (options) {

 		if (!wx.cloud) {
 			console.error('请使用 2.2.3 或以上的基础库以使用云能力')
 		} else {
 			wx.cloud.init({
 				env: 'yg-server-4g62y8vu0df63ba5',
 				traceUser: true,
 			})
 		}

 		wx.getSystemInfo({
 			success: e => {
 				this.globalData.StatusBar = e.statusBarHeight;
 				let capsule = wx.getMenuButtonBoundingClientRect();
 				if (capsule) {
 					this.globalData.Custom = capsule;
 					this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
 				} else {
 					this.globalData.CustomBar = e.statusBarHeight + 50;
 				}
 			}
 		})
 	},


	 globalData: {
	 },
 
 	onShow: function (options) {
 		// 启动，或者从后台进入前台
 		// GroupBiz.initGroupShareTicket(options);
 	},
 	onHide: function () {
 		// 小程序从前台进入后台
 		// GroupBiz.clearGroupShareTicket();
 	}
 })