const Controller = require('egg').Controller;

class ErrorController extends Controller {
	async index() {
		const ctx = this.ctx;
		ctx.state = 500;
		await ctx.render('error/500.ejs');
	}
}

module.exports = ErrorController;
