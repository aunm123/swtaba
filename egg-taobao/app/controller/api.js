const Controller = require('egg').Controller;

class ApiController extends Controller {
	async url_page() {
		const ctx = this.ctx;
		if (ctx.request.method === 'OPTIONS'){
			//设置允许跨域的域名，*代表允许任意域名跨域
			ctx.set('Access-Control-Allow-Origin', '*');
			ctx.set('Cache-Control', 'no-cache');
			ctx.status = 200;
			return;
		}

		let { pkurl, m, ...params } = ctx.request.body;

		//设置允许跨域的域名，*代表允许任意域名跨域
		ctx.set('Access-Control-Allow-Origin', '*');
		ctx.set('Cache-Control', 'no-cache');

		let response = await ctx.service.api.getUrl({pkurl, method: m, params});

		ctx.body = response.data;
		// ctx.res = response;
	}

}

module.exports = ApiController;
