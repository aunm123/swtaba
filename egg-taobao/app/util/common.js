/**
 *  js的公共方法
 * **/
'use strict';
module.exports = {
	checkStatus(response) {
		if (response.status >= 200 && response.status < 300) {
			return response;
		}
		return {error: 'error'};
	},
	// 异常处理
	abnormalHandle(response) {
		return response.then(this.checkStatus).catch(error => {
			// console.log('error', error.name);
			if (error.name === 'ResponseTimeoutError') {
				return {data: [], message: 'timeout'};
			}
		});
	},
	apiChcekStatus(response,ctx){
		if (response.status >= 200 && response.status < 300) {
			return response;
		}
		ctx.body = {error: "api callback fail！"};
	}
};
