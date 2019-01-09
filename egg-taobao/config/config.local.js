'use strict';

const fs = require('fs');
const path = require('path');

module.exports = appInfo => {
	const config = exports = {};

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1545036461911_6514';

	// add your config here
	config.middleware = [];

	config.view = {
		defaultViewEngine: '.ejs',
		mapping: {
			'.ejs': 'ejs'
		}
	};

	config.middleware = [];

	config.siteFile = {
		'/favicon.ico': fs.readFileSync(path.join(__dirname, 'favicon.ico')),
	};

	// exports.searchServer = 'http://127.0.0.1:8080';
	// exports.host = 'http://127.0.0.1:8080';

	exports.searchServer = 'http://212.64.57.254:8080/swtaobao3';
	exports.host = 'http://212.64.57.254:8080/swtaobao3';

	exports.logger = {
		level: 'DEBUG',
		consoleLevel: 'DEBUG',
	};

	exports.security = { // ajax 禁用csrf
		// domainWhiteList: [ 'http://192.168.111.27:7001' ], // 允许ajax跨域访问白名单
		csrf: false
	};

	config.clusterClient = {
		maxWaitTime: 600000,
		responseTimeout: 600000,
	};

	config.httpclient = {
		httpAgent: {
			timeout: 63000,
		},
	};

	return config;
};
