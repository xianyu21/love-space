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
	// 判断用户是否存在
	if (user.data.length == 0) {
		await db.collection('ls-user').add({
			openid: res.openid,
			name: event.name,
			avatar: event.avatar,
			integral: 0,
			status: 1,
			mp: res.userInfo.register_env.uni_platform,
			time: timeStamp
		});
		// 判断是否是被邀请用户
		if (event.userId) {
			//获取邀请积分
			let integrals = await db.collection('ls-config').where({
				'key': 'inviteIntegral'
			}).get()

			if (integrals.data.length > 0) {
				const integral = parseInt(integrals.data[0].val)
				var userList = await db.collection('ls-user').doc(event.userId).get()
				//判断 邀请用户 是否存在
				if (userList.data.length > 0) {
					// 给用户增加积分 inc自增积分
					db.collection('ls-user').doc(event.userId).update({
						'integral': dbCmd.inc(integral)
					}).then(res => {
						if (res.updated === 1) {
							// 添加积分记录
							let xxx = db.collection('ls-record').add({
								'mode': 1,
								'name': '邀请 ' + event.name + ' 奖励积分',
								'integral': integral,
								'user_id': event.userId,
								'time': timeStamp
							})
						}
					})
				}
			}
		}
	} else {
		await db.collection('ls-user').where({
			openid: res.openid
		}).update({
			'name': event.name,
			'avatar': event.avatar
		})
	}
	// 查询最新的数据
	db.collection('ls-user').where({
		openid: res.openid
	}).get().then(res => {
		if (res.data.length > 0) {
			return {
				success: true,
				data: res.data[0]
			}
		} else {
			return {
				success: false,
				msg: '用户不存在'
			}
		}
	})

};
