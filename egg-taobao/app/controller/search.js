const Controller = require('egg').Controller;

class SearchController extends Controller {
	async index() {
		const ctx = this.ctx;

		let hotkeywords = [
			'裙子',
			'外套',
			'message',
			'chaonima'
		];

		await ctx.render('search/keyword.ejs', {hotkeywords});
	}

	async search() {
		const ctx = this.ctx;

		let hotkeywords = [
			'裙子',
			'外套',
			'message',
			'chaonima'
		];

		await ctx.render('search/index.ejs', {hotkeywords});
	}

	/**
	 * 搜索分页
	 * @returns {Promise.<void>}
	 */
	async search_page() {
		const ctx = this.ctx;

		let {categoryid, page, q, v, p, m} = ctx.request.body;
		const params = {
			categoryid,
			page: page, // 当前页
			pageSize: 10, // 每页显示个数
			q: decodeURI(q),
			v, p, m

		};
		console.log("获取搜索第" + page + "页数据");
		const listData = await ctx.service.search.getSearchUrl(params);
		const {currentPage, data, total, done, message} = listData.data;
		await ctx.render('search/search_row.ejs', {items: data,total: total});

	}

}

module.exports = SearchController;
