<script lang="ts" setup>
	import {
		onLaunch,
		onShow,
		onHide
	} from "@dcloudio/uni-app";
	import {
		userStore
	} from '@/stores/user'
	const store = userStore()
	onLaunch(async (options) => {
		console.log('onLaunch');
		const token = uni.$tm.u.getCookie('token')
		const tokenInfo = await uniCloud.callFunction({
			name: 'ls-login',
			data: {
				action: 'checkToken',
				uniIdToken: token
			}
		})
		if (tokenInfo.result.code != 0) {
			const refreshToken = await uniCloud.callFunction({
				name: 'ls-login',
				data: {
					action: 'refreshToken',
					uniIdToken: token
				}
			})
			console.log(refreshToken,'------------------------');
		}
		// uniCloud.callFunction({
		// 	name: 'ls-login',
		// 	data: {
		// 		action: 'getUserInfo',
		// 		uniIdToken: token
		// 	}
		// }).then(res => {
		// 	if (res.result.code == 0) {
		// 		console.log(res.result.userInfo.token.at(-1), '------------------------');
		// 		const {
		// 			uid
		// 		} = res.result.userInfo
		// 		console.log(uid);
		// 		if (res.result.code == 0) {
		// 			store.userinfo = {
		// 				uid: res.result.userInfo._id,
		// 				token: res.result.userInfo.token.at(-1),
		// 			}
		// 		} else if (res.result.code == 10403) {

		// 		} else {}
		// 	} else {
		// 		console.log(res.result, '------------------------');
		// 	}

		// })





		// uni.login({
		// 	provider: 'weixin',
		// 	success: async res => {
		// 		let user = await uniCloud.callFunction({
		// 			name: 'ls-login',
		// 			data: {
		// 				action: 'loginByWeixin',
		// 				params: {
		// 					type: "login",
		// 					code: res.code
		// 				}
		// 			}
		// 		})
		// 		if(user.result.code == 0){
		// 			store.userinfo = user.result
		// 		}else if(user.result.code == 10403){
		// 			console.log(user.result,'------------------------');
		// 		}else{

		// 		}


		// 	}
		// });
	})
	onShow((options) => {
		console.log('onShow', options);
		// #ifdef MP-WEIXIN
		if (options.apiCategory != "browseOnly") {
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {});
			updateManager.onUpdateReady(function(res) {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，确认重启应用？',
					showCancel: false,
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});
			});
			updateManager.onUpdateFailed(function(res) {
				// 新的版本下载失败
				uni.showModal({
					title: '更新提示',
					content: '新版本更新失败,确认重试',
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});
			});
		}
		// #endif
	})
	onHide(() => {
		console.log('onHide');
	})
</script>
<style>
	/* #ifdef APP-NVUE */
	@import './tmui/scss/nvue.css';
	/* #endif */
	/* #ifndef APP-NVUE */
	@import './tmui/scss/noNvue.css';
	/* #endif */


	/* #ifdef H5 */
	body::-webkit-scrollbar,
	div::-webkit-scrollbar,
	*::-webkit-scrollbar {
		display: none;
	}

	body.pages-index-index uni-page-body,
	body {
		padding-bottom: 0 !important;

	}

	text {
		font-family: "sans-serif";
	}

	/* #endif */
</style>
