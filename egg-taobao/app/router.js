'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

	const {router, controller} = app;

	router.get('/', controller.home.index);
	router.post('/i_page', controller.home.index_page);
	router.get('/detail', controller.home.detail);
	router.get('/shorturl', controller.home.shortUrl);

	router.get('/keyword', controller.search.index);
	router.get('/search', controller.search.search);
	router.post('/api/key', controller.search.search_list_api);
	router.post('/s_page', controller.search.search_page);

	router.get('/top', controller.top.index);
	router.post('/t_page', controller.top.top_page);


	router.get('/500', controller.error.index);
	router.get('/three/topproduct', controller.top.proxy_getTopprocuct);

	router.all('/api/url', controller.api.url_page);

	// router.all("/api/url",async function(ctx, next){
	// 	//设置允许跨域的域名，*代表允许任意域名跨域
	// 	ctx.header["Access-Control-Allow-Origin"] = "*";
	// 	//允许的header类型
	// 	ctx.header["Access-Control-Allow-Headers"] = "content-type";
	// 	//跨域允许的请求方式
	// 	ctx.header["Access-Control-Allow-Methods"] = "DELETE,PUT,POST,GET,OPTIONS";
	//
	// 	let { url, m, ...paramas } = ctx.request.body;
	//
	// 	let response = await ctx.service.api.getUrl({url, method: m, params});
	//
	// 	ctx.body = response.data;
	//
	// });

};
