// +----------------------------------------------------------------------
// | CCMiniCloud [ Cloud Framework ]
// +----------------------------------------------------------------------
// | Copyright (c) 2021 www.code942.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 袁小庚书院团队
// +----------------------------------------------------------------------

/**
 * Notes: 后台管理模块
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY www.code942.com
 * Date: 2020-10-22 07:48:00 
 */

const BaseCCMiniService = require('./base_ccmini_service.js');

const ccminiDbUtil = require('../framework/database/ccmini_db_util.js');
const ccminiStrUtil = require('../framework/utils/ccmini_str_util.js');

const ccminiCloudUtil = require('../framework/cloud/ccmini_cloud_util.js');
const ccminiCloudBase = require('../framework/cloud/ccmini_cloud_base.js');
const ccminiUtil = require('../framework/utils/ccmini_util.js');
const ccminiTimeUtil = require('../framework/utils/ccmini_time_util.js');
const ccminiAppCode = require('../framework/handler/ccmini_app_code.js');

const ccminiConfig = require('../comm/ccmini_config.js');

const SetupModel = require('../model/setup_model.js');
const InfoModel = require('../model/info_model.js');
const UserModel = require('../model/user_model.js');
const AdminModel = require('../model/admin_model.js');
const NewsModel = require('../model/news_model.js');

class AdminService extends BaseCCMiniService {

	async isAdmin(token) {
		let where = {
			ADMIN_TOKEN: token,
			ADMIN_TOKEN_TIME: ['>', ccminiTimeUtil.time() - ccminiConfig.CCMINI_ADMIN_LOGIN_EXPIRE * 1000],
			ADMIN_STATUS: 1,
		}
		let admin = await AdminModel.getOne(where);
		if (!admin)
			this.ccminiAppError('当前管理员不存在', ccminiAppCode.ADMIN_ERROR);

		return admin;
	}

	async adminHome() {
		let where = {};

		let infoCnt = await InfoModel.count(where);
		let userCnt = await UserModel.count(where);
		let newsCnt = await NewsModel.count(where);

		return {
			infoCnt,
			userCnt,
			newsCnt,
			projectVerCloud: ccminiConfig.PROJECT_VER,
			projectSource: ccminiConfig.PROJECT_SOURCE
		}
	}

	async adminLogin(name, password) {

		if (name != ccminiConfig.CCMINI_ADMIN_NAME)
			this.ccminiAppError('管理员账号或密码不正确');

		if (password != ccminiConfig.CCMINI_ADMIN_PWD)
			this.ccminiAppError('管理员账号或密码不正确');

		// 判断是否存在
		let where = {
			ADMIN_STATUS: 1
		}
		let fields = 'ADMIN_PHONE,ADMIN_ID,ADMIN_NAME,ADMIN_TYPE,ADMIN_LOGIN_TIME,ADMIN_LOGIN_CNT';
		let admin = await AdminModel.getOne(where, fields);
		if (!admin)
			this.ccminiAppError('管理员不存在');

		let cnt = admin.ADMIN_LOGIN_CNT;

		// 生成token
		let token = ccminiStrUtil.genRandomString(32);
		let tokenTime = ccminiTimeUtil.time();
		let data = {
			ADMIN_TOKEN: token,
			ADMIN_PHONE: ccminiConfig.CCMINI_ADMIN_NAME,
			ADMIN_TOKEN_TIME: tokenTime,
			ADMIN_LOGIN_TIME: ccminiTimeUtil.time(),
			ADMIN_LOGIN_CNT: cnt + 1
		}
		await AdminModel.edit(where, data);

		let type = admin.ADMIN_TYPE;
		let last = (!admin.ADMIN_LOGIN_TIME) ? '尚未登录' : ccminiTimeUtil.timestamp2Time(admin.ADMIN_LOGIN_TIME);


		return {
			token,
			name: admin.ADMIN_NAME,
			type,
			last,
			cnt
		}


	}



	async setupEdit({
		title,
		regCheck,
		about
	}) {

		let data = {
			SETUP_TITLE: title,
			SETUP_REG_CHECK: regCheck,
			SETUP_ABOUT: about
		}
		await SetupModel.edit({}, data);
	}


	/************** 系统设置 END ********************* */


	/************** 互动信息 begin ********************* */
	async getInfoDetail(id) {
		let fields = 'INFO_TITLE,INFO_CONTENT,INFO_PIC';

		let info = await InfoModel.getOne(id, fields);
		if (!info) return null;

		return info;
	}

	async getInfoList({
		search,
		sortType,
		sortVal,
		orderBy,
		whereEx,
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'INFO_ORDER': 'asc',
			'INFO_ADD_TIME': 'desc'
		};
		let fields = 'INFO_STATUS,INFO_TITLE,INFO_EXPIRE_TIME,INFO_REGION_PROVINCE,INFO_REGION_CITY,INFO_REGION_COUNTY,INFO_ADD_TIME,INFO_TYPE,INFO_VIEW_CNT,INFO_ORDER,INFO_USER_ID,' + this.getJoinUserFields();

		let where = {};
		if (ccminiUtil.isDefined(search) && search) {
			where.INFO_TITLE = {
				$regex: '.*' + search,
				$options: 'i'
			};
		} else if (sortType && ccminiUtil.isDefined(sortVal)) {
			switch (sortType) {
				case 'status':
					where.INFO_STATUS = Number(sortVal);
					break;
				case 'type':
					where.INFO_TYPE = sortVal;
					break;
				case 'sort':
					if (sortVal == 'view') {
						orderBy = {
							'INFO_VIEW_CNT': 'desc',
							'INFO_ADD_TIME': 'desc'
						};
					}
					if (sortVal == 'new') {
						orderBy = {
							'INFO_ADD_TIME': 'desc'
						};
					}

					break;
			}
		}

		if (whereEx && whereEx['userId'])
			where.INFO_USER_ID = String(whereEx['userId']);

		let joinParams = this.getJoinUserParams('INFO_USER_ID');
		return await ccminiDbUtil.getListJoin(InfoModel.CL, joinParams, where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	async statusInfo(id, status) {
		this.ccminiAppError('此功能暂不开放，');
	}

	async sortInfo(id, sort) {
		this.ccminiAppError('此功能暂不开放，');
	}
	/************** 互动信息 END ********************* */



	/************** 用户 BEGIN ********************* */
	async getUser({
		userId,
		fields = '*'
	}) {
		let where = {
			USER_MINI_OPENID: userId,
		}
		return await UserModel.getOne(where, fields);
	}

	async getUserList(userId, {
		search,
		sortType,
		sortVal,
		orderBy,
		whereEx,
		page,
		size,
		oldTotal = 0
	}) {

		orderBy = orderBy || {
			USER_ADD_TIME: 'desc'
		};
		let fields = 'USER_ADD_TIME,USER_VIEW_CNT,USER_EDU,USER_ITEM,USER_INFO_CNT,USER_NAME,USER_BIRTH,USER_SEX,USER_PIC,USER_STATUS,USER_CITY,USER_COMPANY,USER_TRADE,USER_COMPANY_DUTY,USER_ENROLL,USER_GRAD,USER_LOGIN_TIME,USER_MINI_OPENID';


		let where = {};
		where.and = {
			//USER_STATUS: UserModel.STATUS.COMM, 
		};

		if (ccminiUtil.isDefined(search) && search) {
			where.or = [{
					USER_NAME: ['like', search]
				},
				{
					USER_CITY: ['like', search]
				},
				{
					USER_ITEM: ['like', search]
				},
				{
					USER_TRADE: ['like', search]
				},
			];

		} else if (sortType && ccminiUtil.isDefined(sortVal)) {
			switch (sortType) {
				case 'enroll':
					switch (sortVal) {
						case 1940:
							where.and.USER_ENROLL = ['<', 1950];
							break;
						case 1950:
							where.and.USER_ENROLL = [
								['>=', 1950],
								['<=', 1959]
							];
							break;
						case 1960:
							where.and.USER_ENROLL = [
								['>=', 1960],
								['<=', 1969]
							];
							break;
						case 1970:
							where.and.USER_ENROLL = [
								['>=', 1970],
								['<=', 1979]
							];
							break;
						case 1980:
							where.and.USER_ENROLL = [
								['>=', 1980],
								['<=', 1989]
							];
							break;
						case 1990:
							where.and.USER_ENROLL = [
								['>=', 1990],
								['<=', 1999]
							];
							break;
						case 2000:
							where.and.USER_ENROLL = [
								['>=', 2000],
								['<=', 2009]
							];
							break;
						case 2010:
							where.and.USER_ENROLL = ['>=', 2010];
							break;
					}
					break;
				case 'sort':
					if (sortVal == 'new') { //最新
						orderBy = {
							'USER_ADD_TIME': 'desc'
						};
					}
					if (sortVal == 'last') { //最近
						orderBy = {
							'USER_LOGIN_TIME': 'desc',
							'USER_ADD_TIME': 'desc'
						};
					}
					if (sortVal == 'enroll') { //入学  
						orderBy = {
							'USER_ENROLL': 'asc',
							'USER_LOGIN_TIME': 'desc'
						};
					}
					if (sortVal == 'info') {
						orderBy = {
							'USER_INFO_CNT': 'desc',
							'USER_LOGIN_TIME': 'desc'
						};
					}
					break;
			}
		}
		let result = await UserModel.getList(where, fields, orderBy, page, size, true, oldTotal);


		return result;
	}

	async statusUser(id, status) {
		this.ccminiAppError('此功能暂不开放，'); 

	}

	async delUser(id) {
		this.ccminiAppError('此功能暂不开放，');

	}
	/************** 用户 END ********************* */



	/************** 资讯主体 BEGIN ********************* */

	async insertNews(adminId, {
		title,
		cate,
		content
	}) {
    let where = {
			INFO_TITLE: title,
			INFO_USER_ID: adminId,
		}
		if (await InfoModel.count(where))
			this.ccminiAppError('该标题已经存在');
    // 赋值 
		let data = {};
		data.NEWS_TITLE = title;
		data.NEWS_CONTENT = content;
		data.NEWS_CATE = cate;
		// data.INFO_DESC = ccminiStrUtil.fmtText(content, 100);
		// data.INFO_EXPIRE_TIME = ccminiTimeUtil.time2Timestamp(expireTime + ' 23:59:59');
		data.NEWS_STATUS = 1;
		data.NEWS_ORDER = 9999.0;
		data.NEWS_VIEW_CNT =12;
    data.NEWS_ADMIN_ID = adminId;
    data.NEWS_ADD_TIME="";
    data.NEWS_EDIT_TIME=1.714024387982E+12
    data.NEWS_PIC=[]
    console.log(data);
		let id = await NewsModel.insert(data);
		//  异步统计
    // this.statUserInfoCntthis.statUserInfoCnt(adminId);

		return {
			id
    };
    
	}

	async delNews(id) {
		this.ccminiAppError('此功能暂不开放，');
	}

	async getNewsDetail(id) {
		let fields = '*';

		let where = {
			_id: id
		}
		let news = await NewsModel.getOne(where, fields);
		if (!news) return null;

		let urls = ccminiStrUtil.getArrByKey(news.NEWS_PIC, 'url');
		news.NEWS_PIC = urls;

		return news;
	}


	async updateNewsPic({
		newsId,
		imgList
	}) {

		this.ccminiAppError('此功能暂不开放，');

	}


	async editNews({
		id,
		title,
		cate,
		content,
		desc
	}) {

		this.ccminiAppError('此功能暂不开放，');
	}

	async getNewsList({
		search,
		sortType,
		sortVal,
		orderBy,
		whereEx,
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'NEWS_ORDER': 'asc',
			'NEWS_ADD_TIME': 'desc'
		};
		let fields = 'NEWS_VIEW_CNT,NEWS_TITLE,NEWS_DESC,NEWS_ADD_TIME,NEWS_ORDER,NEWS_STATUS,NEWS_CATE';

		let where = {};

		if (ccminiUtil.isDefined(search) && search) {
			where.NEWS_TITLE = {
				$regex: '.*' + search,
				$options: 'i'
			};
		} else if (sortType && ccminiUtil.isDefined(sortVal)) {
			switch (sortType) {
				case 'cate':
					where.NEWS_CATE = sortVal;
					break;
				case 'status':
					where.NEWS_STATUS = Number(sortVal);
					break;
				case 'sort':
					if (sortVal == 'view') {
						orderBy = {
							'NEWS_VIEW_CNT': 'desc',
							'NEWS_ADD_TIME': 'desc'
						};
					}
					if (sortVal == 'new') {
						orderBy = {
							'NEWS_ADD_TIME': 'desc'
						};
					}

					break;
			}
		}

		return await NewsModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	async statusNews(id, status) {
		this.ccminiAppError('此功能暂不开放，');
	}

	async sortNews(id, sort) {
		this.ccminiAppError('此功能暂不开放，');
	}

}

module.exports = AdminService;