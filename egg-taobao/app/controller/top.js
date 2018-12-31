const Controller = require('egg').Controller;

class TopController extends Controller {
	async index() {
		const ctx = this.ctx;

		const topSellData = await ctx.service.home.getTopSell();
		const {top} = topSellData.data.data;

		await ctx.render('top/seller_page.ejs', { topsell:top });
	}


	/**
	 * 推荐类分页
	 * @returns {Promise.<void>}
	 */
	async top_page() {
		const ctx = this.ctx;

		let { topid, page } = ctx.request.body;
		var params = {
			topcate: "热销",
			subcate: "运动",
			page,
			topid
		}
		let topdata = await ctx.service.top.getTopCateData(params);
		let { data } = JSON.parse(topdata.data.data.content);

		await ctx.render('top/seller_row.ejs', { items: data });

	}

}

module.exports = TopController;
