'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
	async index() {
		const ctx = this.ctx;
		await ctx.render('index.ejs');
	}

	async detail() {
		const ctx = this.ctx;
		await ctx.render('item_detail.ejs');
	}
}

module.exports = HomeController;
