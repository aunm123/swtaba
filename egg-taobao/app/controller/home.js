const Controller = require('egg').Controller;

class HomeController extends Controller {
	async index() {
		const ctx = this.ctx;
		let {categoryid} = ctx.request.body;
		const params = {
			categoryid,
			page: 1, // 当前页
			pageSize: 10, // 每页显示个数
		};
		const listData = await ctx.service.home.getTopData(params);
		const {currentPage, data, total, done, message} = listData.data;

		const topSellData = await ctx.service.home.getTopSell({topid: "0"});
		const {top} = topSellData.data.data;

		await ctx.render('index.ejs', {total: total, topsell: top});
	}

	/**
	 * 首页分页
	 * @returns {Promise.<void>}
	 */
	async index_page() {
		const ctx = this.ctx;

		let {categoryid, page} = ctx.request.body;
		const params = {
			categoryid,
			page: page, // 当前页
			pageSize: 10, // 每页显示个数
		};
		console.log("获取第" + page + "页数据");
		const listData = await ctx.service.home.getTopData(params);
		if (!listData.data.data){
			listData.data.data = [];
		}
		const {currentPage, data, total, done, message} = listData.data;
		await ctx.render('home/home_row.ejs', {items: data});

	}

	async detail() {
		const ctx = this.ctx;
		let {itemid} = ctx.query;
		const listData = await ctx.service.home.getTopDetail({itemid});

		if (listData && listData.data.done === 'success') {

			let short_url = listData.data.data["couponClickUrl"];

			let params = {
				itemid: itemid,
				url: short_url,
				text: listData.data.data["title"],
				logo: listData.data.data["pictUrl"]
			}

			const short_url_data = await ctx.service.home.getShortUrl(params);
			listData.data.data["short_url"] = short_url_data.data.data.shorturl;
			if (!listData.data.data["provcity"]){
				listData.data.data["provcity"] = "";
			}
			if (!listData.data.data["smallimg"]){
				listData.data.data["smallimg"] = [];
			}

			await ctx.render('item_detail.ejs', listData.data.data);
		}
	}

	async shortUrl() {
		const ctx = this.ctx;
		let {url} = ctx.query;
		const listData = await ctx.service.home.getShortUrl({url});
		if (listData && listData.data.done === 'success') {
			ctx.body = listData.data
		}
	}
}

module.exports = HomeController;
