const Controller = require('egg').Controller;

class SearchController extends Controller {
	async index() {
		const ctx = this.ctx;
		let {categoryid} = ctx.request.body;
		const params = {
			categoryid,
			pageNo: 1, // 当前页
			pageSize: 10, // 每页显示个数
		};
		const listData = await ctx.service.home.getTopData(params);
		const {currentPage, data, total, done, message} = listData.data;
		await ctx.render('index.ejs', {total: total});
	}

}

module.exports = SearchController;
