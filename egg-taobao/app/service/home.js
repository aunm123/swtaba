'use strict';
const Service = require('egg').Service;

class HomeService extends Service {
	async getTopData({categoryid= 0, pageNo = 1, pageSize = 10 }) {
		const { ctx, config, logger } = this;
		logger.info(`获取首页数据：categoryid=${categoryid} pageNo=${pageNo}, pageSize=${pageSize}`);

		// 获取搜索结果
		const response = await ctx.curl(`${config.searchServer}/api/top`, {
			dataType: 'json',
			method: 'GET',
			data: {
				categoryid: categoryid,
				pageNo: pageNo,
				pageSize: pageSize
			},
			timeout: 30000,
		});
		return response;
	}
}

module.exports = HomeService;