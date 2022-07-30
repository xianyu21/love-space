'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
const uniID = require('uni-id')
exports.main = async (event, context) => {

	let appIds
	let appSecrets
	if (event.mptype == 'wx') {
		appIds = await db.collection('ls-config').where({
			'key': 'wxId'
		}).get()
		appSecrets = await db.collection('ls-config').where({
			'key': 'wxSecret'
		}).get()
	}
	
	if (appIds.data.length === 0 || appSecrets.data.length === 0) {
		return {
			success: false,
			msg: '未配置登录参数'
		}
	}
	const appId = appIds.data[0].val
	const appSecret = appSecrets.data[0].val
	console.log(appId, appSecret);
	// 配置登录参数
	let uniAccountIns = uniID.loginByWeixin({
		appId: appId,
		secret: appSecret
	})
	
	let res = await uniID.code2SessionWeixin(event.code);
	return false;
	let timeStamp = new Date().getTime()
	let wx_user = await db.collection('wx_user').where({
		openid: res.openid
	}).get();
	let newdate = {};
	// 判断用户是否存在
	if (wx_user.data.length == 0) {
		let newdate = {
			openid: res.openid,
			name: event.name,
			avatar: event.avatar,
			integral: 0,
			status: 1,
			mp: event.mptype,
			time: timeStamp
		};
		let user_new = await db.collection('wx_user').add(newdate);
		// 判断是否是被邀请用户
		if (event.userId) {
			let integrals = await db.collection('wx_config').where({
				'key': 'inviteIntegral'
			}).get()
			if (integrals.data.length > 0) {
				const integral = parseInt(integrals.data[0].val)

				var userList = await db.collection('wx_user').doc(event.userId).get()
				if (userList.data.length > 0) {
					// 给用户增加积分
					var userResult = await db.collection('wx_user').doc(event.userId).update({
						'integral': dbCmd.inc(integral)
					})
					if (userResult.updated === 1) {
						// 添加积分记录
						var signResult = await db.collection('wx_record').add({
							'mode': 1,
							'name': '邀请 ' + event.name + ' 奖励积分',
							'integral': integral,
							'user_id': event.userId,
							'time': timeStamp
						})
					}
				}
			}
		}
	} else {
		let user_update = await db.collection('wx_user').where({
			openid: res.openid
		}).update({
			'name': event.name,
			'avatar': event.avatar
		})
	}

	// 查询最新的数据
	let result = await db.collection('wx_user').where({
		openid: res.openid
	}).get();
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
