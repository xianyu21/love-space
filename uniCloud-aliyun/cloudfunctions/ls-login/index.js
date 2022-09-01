'use strict';

let uniID = require('uni-id')
exports.main = async (event, context) => {
	uniID = uniID.createInstance({
		context
	})
	let params = event.params || {}
	let payload = {}
	let noCheckAction = [
		'checkToken',
		'encryptPwd',
		'login',
		'loginByWeixin',
		'sendSmsCode',
		'setVerifyCode',
		'code2SessionWeixin',
		'setUserInviteCode'
	]
	if (noCheckAction.indexOf(event.action) === -1) {
		if (!event.uniIdToken) {
			return {
				code: 403,
				msg: '缺少token'
			}
		}
		payload = await uniID.checkToken(event.uniIdToken, {
			needPermission: true
		})
		if (payload.code && payload.code > 0) {
			return payload
		}
		params.uid = payload.uid
	}
	let res = {}

	switch (event.action) {
		case 'logout':
			res = await uniID.logout(event.uniIdToken);
			break;
		case 'setAvatar': {
			const {
				uid,
				avatar
			} = params
			res = await uniID.setAvatar({
				uid,
				avatar
			});
			break;
		}
		case 'bindMobile': {
			const {
				uid,
				mobile,
				code
			} = params
			res = await uniID.bindMobile({
				uid,
				mobile,
				code
			});
			break;
		}
		case 'unbindMobile': {
			const {
				uid,
				mobile,
				code
			} = params
			res = await uniID.unbindMobile({
				uid,
				mobile,
				code
			});
			break;
		}
		case 'code2SessionWeixin': {
			const {
				code
			} = params
			res = await uniID.code2SessionWeixin({
				code
			});
			break;
		}
		case 'loginByWeixin': {
			const {
				code,
				type
			} = params
			console.log(params);
			res = await uniID.loginByWeixin({
				code,
				type
			});
			break;
		}
		case 'unbindWeixin':
			res = await uniID.unbindWeixin(params.uid);
			break;
		case 'checkToken':
			// 注意3.0.0版本取消了checkToken接口返回的用户信息
			res = await uniID.checkToken(event.uniIdToken, {
				needPermission: true
			})
			break;


		case 'loginBySms': {
			const {
				mobile,
				code
			} = params
			res = await uniID.loginBySms({
				mobile,
				code
			});
			break;
		}
		case 'updateUser': {
			const {
				uid,
				nickname
			} = params
			res = await uniID.updateUser({
				uid,
				nickname
			});
			break;
		}
		case 'setUserInviteCode': {
			const {
				uid,
				// myInviteCode 不指定myInviteCode，自动获取
			} = params
			res = await uniID.setUserInviteCode({
				uid
			});
			break;
		}
		case 'acceptInvite': {
			const {
				uid,
				inviteCode
			} = params
			res = await uniID.acceptInvite({
				uid,
				inviteCode
			});
			break;
		}
		case 'loveBind': {

			const {
				loveId1,
				loveId2
			} = params
			await uniCloud.database().collection('uni-id-users').doc(loveId1).update({
				'loveId': loveId2
			})
			await uniCloud.database().collection('uni-id-users').doc(loveId2).update({
				'loveId': loveId1
			})
			res = await uniCloud.database().collection('uni-id-users').doc(loveId1).get()
			break;
		}
		default:
			res = {
				code: 404,
				msg: 'NOT_FOUND'
			}
			break;
	}

	//返回数据给客户端
	return res
};
