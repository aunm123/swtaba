'use strict';
const Service = require('egg').Service;

class SearchService extends Service {
	async getSearchUrl(params) {
		const { ctx, config, logger } = this;

		// 获取搜索结果
		const response = await ctx.curl(`${config.searchServer}/search/se`, {
			dataType: 'json',
			method: 'GET',
			data: params,
			timeout: 600000,
		});
		return response;
	}

	async getSearchList(params) {
		const { ctx, config, logger } = this;
		// 获取搜索结果
		const response = await ctx.curl(`https://suggest.taobao.com/sug`, {
			dataType: 'json',
			method: 'GET',
			data: params,
			timeout: 600000,
		});
		return response;
	}

	async getSearchHotKeyWord() {
		const { ctx, config, logger } = this;
		// 获取搜索结果
		const response = await ctx.curl(`${config.searchServer}/search/hot`, {
			dataType: 'json',
			method: 'GET',
			timeout: 600000,
		});
		return response;
	}
}

module.exports = SearchService;