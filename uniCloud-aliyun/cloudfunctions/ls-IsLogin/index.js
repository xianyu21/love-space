'use strict';
const db = uniCloud.database();
const uniID = require('uni-id')
exports.main = async (event, context) => {
	let res = await uniID.loginByWeixin({
		code: event.code
	})
	let timeStamp = new Date().getTime()
	// 查询最新的数据
	let result = await db.collection('ls-user').where({
		openid: res.openid
	}).get()
	if (result.data.length > 0) {
		return {
			success: true,
			data: result.data[0]
		}
	} else {
		return {
			success: false,
			msg: '用户不存在'
		}
	}
};
