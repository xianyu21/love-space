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
}


export const beforeFun = () => {
	return {
		method: 'GET',
		data: {
			a: 1,
			b: 2
		}
	}
	// return Promise.reject(new Error(res.data.msg));
}
export const afterFun = () => {
	console.log(config.data, '2222222222222');
	let code = config.data.code
	let result = config.data.data;
	switch (code) {
		case 0:
			result = config.data.data
			break;
		case 200:
			break;
		default:
			break;
	}
	return result
	return Promise.reject(new Error(res.data.msg));
}
export const complete = () => {
	console.log(e, '33333333333');
	return Promise.reject(new Error(res.data.msg));
}



uni.$tm.fetch.get(url)




	const beforeFun = () => {
		return {
			method: 'GET',
			data: {
				a: 1,
				b: 2
			}
		}
	}
	const afterFun = (config) => {
		console.log(config.data, '2222222222222');
		let code = config.data.code
		let result = config.data.data;
		switch (code) {
			case 0:
				result = config.data.data
				break;
			case 200:
				break;
			default:
				break;
		}
		return result
	}
	const complete = (e) => {
		console.log(e, '33333333333');
	}