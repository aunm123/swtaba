
const Controller = require('egg').Controller;

class HomeController extends Controller {
	async index() {
		const ctx = this.ctx;
		await ctx.render('index.ejs');
	}

	/**
	 * 首页分页
	 * @returns {Promise.<void>}
	 */
	async index_page() {
		const ctx = this.ctx;

		let {categoryid, pageNo} = ctx.request.body;
		const params = {
			categoryid, // 关键词
			pageNo: pageNo, // 当前页
			pageSize: 10, // 每页显示个数
		};
		console.log("获取第"+pageNo+"页数据");
		const listData = await ctx.service.home.getTopData(params);
		const {currentPage, data, total, done, message} = listData.data;
		await ctx.render('home/home_row.ejs',{items: data});

	}

	async detail() {
		const ctx = this.ctx;
		await ctx.render('item_detail.ejs');
	}
}

module.exports = HomeController;
