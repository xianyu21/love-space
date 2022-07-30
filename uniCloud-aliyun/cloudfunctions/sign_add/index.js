'use strict';
// 与数据库建立链接
const db = uniCloud.database();
// 
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	// 创建回滚
	const transaction = await db.startTransaction()
	// 查询 
	let integrals = await db.collection('ls-config').where({
		'key': 'signIntegral'
	}).get()
	//判断签到参数 是否配置
	if (integrals.data.length === 0) {
		return {
			success: false,
			msg: '未配置签到参数'
		}
	}
	// 获取签到参数
	const integral = parseInt(integrals.data[0].val)
	// 
	var userId = event.userId
	const startTime = new Date(new Date().toLocaleDateString()).getTime()
	const timeStamp = new Date().getTime()
	// 
	// try {
		//判断 当前是否已经登录
		var signList = await db.collection('ls-sign').where({
			'user_id': userId,
			'time': dbCmd.gte(startTime)
		}).get()
		console.log(signList);
		// 如果大于0 代表已经签到
		if (signList.data.length > 0) {
			return {
				success: false,
				msg: '已经签到过'
			}
		}
		// 签到ing
		var signResult = await transaction.collection('ls-sign').add({
			'integral': integral,
			'user_id': userId,
			'time': timeStamp
		})
		console.log(signResult);
		// //签到失败
		if (signResult.inserted === 0) {
			transaction.rollback(-100)
			return {
				success: false,
				msg: '签到失败'
			}
		}
		let users = await transaction.collection('ls-user').doc(userId).get()
		console.log(users);
		console.log(users.data);
		console.log(!users.data);
		if (!users.data) {
			// 用户不存在
			transaction.rollback(-100)
			return {
				success: false,
				msg: '签到失败'
			}
		}
		// 给用户增加积分
		// var userResult = await transaction.collection('ls-user').doc(userId).update({
		// 	'integral': dbCmd.inc(integral)
		// })

		// if(userResult.updated === 0){
		// 	// 签到失败
		// 	transaction.rollback(-100)
		// 	return {
		// 		success: false,
		// 		msg: '签到失败'
		// 	}
		// }
		// // 添加积分记录
		// var signResult = await transaction.collection('wx_record').add({
		// 	'mode': 1,
		// 	'name': '签到奖励积分',
		// 	'integral': integral,
		// 	'user_id': userId,
		// 	'time': timeStamp
		// })
		// if(signResult.inserted === 0){
		// 	// 签到失败
		// 	transaction.rollback(-100)
		// 	return {
		// 		success: false,
		// 		msg: '签到失败'
		// 	}
		// }
		// await transaction.commit()
		// return {
		// 	success: true,
		// 	integral: integral,
		// 	msg: '签到成功'
		// }
	// } catch (e) {
	// 	await transaction.rollback()
	// 	return {
	// 		success: false,
	// 		msg: e
	// 	}
	// }
};
