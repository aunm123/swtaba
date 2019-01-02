const Controller = require('egg').Controller;

class TopController extends Controller {
	async index() {
		const ctx = this.ctx;
		let {topid} = ctx.query;

		const topSellData = await ctx.service.home.getTopSell({ topid });
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

		let catdata = await ctx.service.top.getTopCate({ topid });

		var params = {
			topcate: catdata.data.data.topcate,
			subcate: catdata.data.data.subcate,
			page,
			topid
		};
		let topdata = await ctx.service.top.getTopCateData(params);
		if (!topdata.data.data.content){
			topdata.data.data.content = "{}";
		}
		let tempTopData = JSON.parse(topdata.data.data.content);
		if (!tempTopData.data){
			tempTopData.data = [];
		}
		let { data } = tempTopData;

		await ctx.render('top/seller_row.ejs', { items: data });

	}

}

module.exports = TopController;
