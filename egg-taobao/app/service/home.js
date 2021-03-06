'use strict';
const Service = require('egg').Service;
const Common = require('../util/common');

class HomeService extends Service {
	async getTopData({categoryid, page, pageSize}) {
		const { ctx, config, logger } = this;
		logger.info(`获取首页数据：categoryid=${categoryid} page=${page}, pageSize=${pageSize}`);

		// 获取搜索结果
		const response = await ctx.curl(`${config.searchServer}/api/top`, {
			dataType: 'json',
			method: 'GET',
			data: {
				categoryid: categoryid,
				page: page,
				pageSize: pageSize
			},
			timeout: 600000,
		});
		return response;
	}

	async getTopDetail({itemid}) {
		const { ctx, config, logger } = this;

		// 获取搜索结果
		const response = await ctx.curl(`${config.searchServer}/api/detail`, {
			dataType: 'json',
			method: 'GET',
			data: {
				itemid: itemid,
			},
			timeout: 600000,
		});
		return response;
	}

	async getShortUrl(params) {
		const { ctx, config, logger } = this;

		// 获取搜索结果
		const response = await ctx.curl(`${config.searchServer}/api/shorturl`, {
			dataType: 'json',
			method: 'GET',
			data: params,
			timeout: 600000,
		});
		return response;
	}

	async getTopSell({ topid }) {
		const { ctx, config, logger } = this;
		logger.info(`获取top Sell`);

		// 获取搜索结果
		const response = await ctx.curl(`${config.searchServer}/api/topsell`, {
			dataType: 'json',
			data: {
				parentid: topid
			},
			method: 'GET',
			timeout: 600000,
		});
		return response;
	}


}

module.exports = HomeService;