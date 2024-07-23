const NewsBiz = require('../../../biz/news_biz.js');
const AdminNewsBiz = require('../../../biz/admin_news_biz.js');
const AdminBiz = require('../../../biz/admin_biz.js');
const ccminiPageHelper = require('../../../helper/ccmini_page_helper.js');
const ccminiCloudHelper = require('../../../helper/ccmini_cloud_helper.js'); 

Page({

	/**
	 * 页面的初始数据
	 */
	data: { 
		modalName: '',
		activities: [
      {
				ACTIVITY_TITLE: '曙光家喜',
				ACTIVITY_TYPE:'思想引领',
				ABILITY_TYPE:'1,2,3',
				ACTIVITY_ADD_TIME:1713964623,
				ACTIVITY_SIGN_STOP_TIME:1713964623,
				ACTIVITY_START_TIME:1713964623,
				ACTIVITY_END_TIME:1713984623,
				ACTIVITY_ADDRESS:'B1',
				ACTIVITY_NUM_LIMIT:50,
				ACTIVITY_POSTER:'cloud://yg-server-4g62y8vu0df63ba5.7967-yg-server-4g62y8vu0df63ba5-1324922348/activity_poster/tom-barrett-zbai2Y1GBIw-unsplash.jpg',
				ACTIVITY_CONTENT:'这是一个思想引领的活动',
				ACTIVITY_SCORE:5,
				ACTIVITY_URL:'cloud://yg-server-4g62y8vu0df63ba5.7967-yg-server-4g62y8vu0df63ba5-1324922348/activity_poster/tom-barrett-zbai2Y1GBIw-unsplash.jpg',
				ACTIVITY_SIGN:true,
				ACTIVITY_COLLECT:true,
      },
      {
				ACTIVITY_TITLE: 'MBTI分享交流会',
				ACTIVITY_TYPE:'全面发展',
				ABILITY_TYPE:'1,4,6',
				ACTIVITY_ADD_TIME:1713964623,
				ACTIVITY_SIGN_STOP_TIME:1713964623,
				ACTIVITY_START_TIME:1713964623,
				ACTIVITY_END_TIME:1713984623,
				ACTIVITY_ADDRESS:'B1',
				ACTIVITY_NUM_LIMIT:50,
				ACTIVITY_POSTER:'cloud://yg-server-4g62y8vu0df63ba5.7967-yg-server-4g62y8vu0df63ba5-1324922348/activity_poster/artiom-vallat-fjmD_UZOtBA-unsplash.jpg',
				ACTIVITY_CONTENT:'这是一个全面发展的活动',
				ACTIVITY_SCORE:4,
				ACTIVITY_URL:'cloud://yg-server-4g62y8vu0df63ba5.7967-yg-server-4g62y8vu0df63ba5-1324922348/activity_poster/artiom-vallat-fjmD_UZOtBA-unsplash.jpg',
				ACTIVITY_SIGN:true,
				ACTIVITY_COLLECT:true,
      },
      {
				ACTIVITY_TITLE: '如何从0写一篇SCI',
				ACTIVITY_TYPE:'生涯规划',
				ABILITY_TYPE:'2,5,6',
				ACTIVITY_ADD_TIME:1713964623,
				ACTIVITY_SIGN_STOP_TIME:1713964623,
				ACTIVITY_START_TIME:1713964623,
				ACTIVITY_END_TIME:1713984623,
				ACTIVITY_ADDRESS:'B1',
				ACTIVITY_NUM_LIMIT:50,
				ACTIVITY_POSTER:'cloud://yg-server-4g62y8vu0df63ba5.7967-yg-server-4g62y8vu0df63ba5-1324922348/activity_poster/tom-barrett-zbai2Y1GBIw-unsplash.jpg',
				ACTIVITY_CONTENT:'这是一个生涯规划的活动',
				ACTIVITY_SCORE:3,
				ACTIVITY_URL:'cloud://yg-server-4g62y8vu0df63ba5.7967-yg-server-4g62y8vu0df63ba5-1324922348/activity_poster/tom-barrett-zbai2Y1GBIw-unsplash.jpg',
				ACTIVITY_SIGN:true,
				ACTIVITY_COLLECT:true,
			},
			{
				ACTIVITY_TITLE: '曙光家喜',
				ACTIVITY_TYPE:'思想引领',
				ABILITY_TYPE:'1,2,3',
				ACTIVITY_ADD_TIME:1713964623,
				ACTIVITY_START_TIME:1713964623,
				ACTIVITY_END_TIME:1713984623,
				ACTIVITY_ADDRESS:'B1',
				ACTIVITY_NUM_LIMIT:50,
				ACTIVITY_POSTER:'cloud://yg-server-4g62y8vu0df63ba5.7967-yg-server-4g62y8vu0df63ba5-1324922348/activity_poster/tom-barrett-zbai2Y1GBIw-unsplash.jpg',
				ACTIVITY_CONTENT:'这是一个思想引领的活动',
				ACTIVITY_SCORE:5,
				ACTIVITY_URL:'cloud://yg-server-4g62y8vu0df63ba5.7967-yg-server-4g62y8vu0df63ba5-1324922348/activity_poster/tom-barrett-zbai2Y1GBIw-unsplash.jpg',
				ACTIVITY_SIGN:true,
				ACTIVITY_COLLECT:true,
      },
      {
				ACTIVITY_TITLE: 'MBTI分享交流会',
				ACTIVITY_TYPE:'全面发展',
				ABILITY_TYPE:'1,4,6',
				ACTIVITY_ADD_TIME:1713964623,
				ACTIVITY_START_TIME:1713964623,
				ACTIVITY_END_TIME:1713984623,
				ACTIVITY_ADDRESS:'B1',
				ACTIVITY_NUM_LIMIT:50,
				ACTIVITY_POSTER:'cloud://yg-server-4g62y8vu0df63ba5.7967-yg-server-4g62y8vu0df63ba5-1324922348/activity_poster/artiom-vallat-fjmD_UZOtBA-unsplash.jpg',
				ACTIVITY_CONTENT:'这是一个全面发展的活动',
				ACTIVITY_SCORE:4,
				ACTIVITY_URL:'cloud://yg-server-4g62y8vu0df63ba5.7967-yg-server-4g62y8vu0df63ba5-1324922348/activity_poster/artiom-vallat-fjmD_UZOtBA-unsplash.jpg',
				ACTIVITY_SIGN:true,
				ACTIVITY_COLLECT:true,
      },
      {
				ACTIVITY_TITLE: '如何从0写一篇SCI',
				ACTIVITY_TYPE:'生涯规划',
				ABILITY_TYPE:'2,5,6',
				ACTIVITY_ADD_TIME:1713964623,
				ACTIVITY_START_TIME:1713964623,
				ACTIVITY_END_TIME:1713984623,
				ACTIVITY_ADDRESS:'B1',
				ACTIVITY_NUM_LIMIT:50,
				ACTIVITY_POSTER:'cloud://yg-server-4g62y8vu0df63ba5.7967-yg-server-4g62y8vu0df63ba5-1324922348/activity_poster/tom-barrett-zbai2Y1GBIw-unsplash.jpg',
				ACTIVITY_CONTENT:'这是一个生涯规划的活动',
				ACTIVITY_SCORE:3,
				ACTIVITY_URL:'cloud://yg-server-4g62y8vu0df63ba5.7967-yg-server-4g62y8vu0df63ba5-1324922348/activity_poster/tom-barrett-zbai2Y1GBIw-unsplash.jpg',
				ACTIVITY_SIGN:true,
				ACTIVITY_COLLECT:true,
      },
    ]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;
		
		//设置搜索菜单
		await this._getSearchMenu(); 
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () { 
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

	url: async function (e) {
		ccminiPageHelper.url(e);
	},

	myCommListListener: function (e) {
		ccminiPageHelper.commListListener(this, e);
	}, 

	bindShowDetailTap: async function (e) {
		this.setData({
			detail: ''
		});
		let id = e.currentTarget.dataset.id;
		if (!id) return;

		let params = {
			id
		}

		let news = await ccminiCloudHelper.callCloudData('admin/news_detail', params);
		if (!news) {
			ccminiPageHelper.showNoneToast('记录不存在或者已删除')
			return;
		}

		this.setData({
			detail: news
		})
	}, 

	bindSortTap: async function (e) {
		let id = e.currentTarget.dataset.id;
		let sort = e.currentTarget.dataset.sort;
		if (!id || !sort) return;

		let params = {
			id,
			sort
		}

		let that = this;
		try {
			await ccminiCloudHelper.callCloudSumbit('admin/news_sort', params).then(res => {
				ccminiPageHelper.modifyListNode(id, that.data.dataList.list, 'NEWS_ORDER', sort);
				that.setData({
					dataList: that.data.dataList
				});
			});
		} catch (e) {
			console.log(e);
		}
	},

	bindDelTap: async function (e) {

		let id = e.currentTarget.dataset.id; 
 
		if (!id) return;

		let params = {
			id
		}

		let that = this;
  },

	bindHideDetailModalTap: function () {
		this.setData({
			detail: ''
		});
	},

	bindStatusTap: async function (e) {
		let id = e.currentTarget.dataset.id;
		let status = e.currentTarget.dataset.status;
		if (!id || !status) return;
		status = Number(status);

		let params = {
			id,
			status
		}

		let that = this;
		try {
			await ccminiCloudHelper.callCloudSumbit('admin/news_status', params).then(res => {
				ccminiPageHelper.modifyListNode(id, that.data.dataList.list, 'NEWS_STATUS', status,'_id');
				that.setData({
					dataList: that.data.dataList
				});
				ccminiPageHelper.showSuccToast('设置成功');
			});
		} catch (e) {
			console.log(e);
		}
	},

	_getSearchMenu: async function () {   
		 
		let sortItems = [];
		let sortMenus = [ 
			{
				label: '正常',
				type: 'status',
				value: 1
			}, 
		];

		let arr = AdminNewsBiz.ACTIVITY_TYPE_OPTIONS;
	 
		for (let k in arr) {
			sortMenus.push({
				label: arr[k],
				type: 'cate',
				value: arr[k]
			});
		} 
		
		this.setData({
			sortItems,
			sortMenus
		}) 	
		

	},
	goToActivityDetail: function(e) {
    // 跳转到活动详情页面的逻辑
    const id = e.currentTarget.dataset.id;
    // 假设详情页面名为 activityDetail，需要根据实际页面路径修改
    wx.navigateTo({
      url: `/activityDetail/activityDetail?id=${id}`
    });
  },
  formatTime: function(timestamp) {
    // 将时间戳转换为易读的格式
    const date = new Date(timestamp * 1000);
    return `${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  }
})