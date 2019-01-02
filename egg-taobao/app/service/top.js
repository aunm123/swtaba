'use strict';
const Service = require('egg').Service;

class TopService extends Service {
	async getTopCateData(params) {
		const { ctx, config, logger } = this;

		// 获取搜索结果
		const response = await ctx.curl(`${config.searchServer}/three/top`, {
			dataType: 'json',
			method: 'GET',
			data: params,
			timeout: 600000,
		});
		return response;
	}

	async getTopCate(params) {
		const { ctx, config, logger } = this;

		// 获取搜索结果
		const response = await ctx.curl(`${config.searchServer}/three/cate`, {
			dataType: 'json',
			method: 'GET',
			data: params,
			timeout: 600000,
		});
		return response;
	}
}

module.exports = TopService;