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
	router.post('/s_page', controller.search.search_page);
};
