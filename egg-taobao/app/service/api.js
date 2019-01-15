'use strict';
const Service = require('egg').Service;

class ApiService extends Service {

	async getUrl({pkurl, method, params}) {
		const {ctx, config, logger} = this;

		// 获取搜索结果
		const response = await ctx.curl(pkurl, {
			method: method,
			data: params,
			timeout: 600000,
		});
		return response;
	}


}

module.exports = ApiService;