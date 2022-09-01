'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
const uniID = require('uni-id')
exports.main = async (event, context) => {
	let res = await uniID.loginByWeixin({
		code: event.code
	})
	let timeStamp = new Date().getTime()
	let user = await db.collection('ls-user').where({
		openid: res.openid
	}).get();
	if (user.data.length == 0) {
		return {
			success: false,
			msg: '用户不存在'
		}
	} else {
		var userList = await db.collection('ls-user').doc(user.data[0]._id).get()
		if (userList.data[0].loveId) {
			return {
				success: false,
				data: userList.data[0],
				msg: '已绑定'
			}
		} else {
			if (event.loveId) {
				//对方绑定本人
				await db.collection('ls-user').where({
					"_id": event.loveId
				}).update({
					'loveId': user.data[0]._id
				})
				// 本人绑定对方
				await db.collection('ls-user').where({
					"_id": user.data[0]._id
				}).update({
					'loveId': event.loveId
				})
				// 查询最新的数据
				let result = await db.collection('ls-user').where({
					openid: res.openid
				}).get()
				if (result.data.length > 0) {
					return {
						success: true,
						data: result.data[0]
					}
				}
			}
		}
	}

	
};
