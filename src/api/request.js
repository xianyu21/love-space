export default request = () => {
	let httpDefaultOpts = {
		url: opts.url,
		data: data,
		method: opts.method,
		header: opts.method == 'get' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		dataType: 'json',
		success: resp => {
			console.log(resp, '99999999999999999');
			// return new Promise((resolve, reject) => {
			// 	// 模拟获取token逻辑
			// 	resolve('111111');
			// });
		}
	}
	console.log(httpDefaultOpts);
	// uni.$tm.fetch.request({
	// 		url: '/api/index/getBanner',
	// 		method: 'GET',
			
	// 	},
	// 	beforeFun,
	// 	afterFun,
	// 	complete
	// ).then((res1) => {
	// 	console.log(res1, '55555555555555');
	// })
}
