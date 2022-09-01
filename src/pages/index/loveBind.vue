<template>
	<tm-app>
		<tm-sheet>
			<tm-button linear="right" linearDeep="accent" block label="点击即注册" @click="register"></tm-button>
			<tm-button linear="right" linearDeep="accent" block label="绑定对方的邀请码" @click="bind"></tm-button>
			<tm-button linear="right" linearDeep="accent" block label="测试" @click="test"></tm-button>
		</tm-sheet>
	</tm-app>
</template>
<script lang="ts" setup>
	// 邀请界面 互相绑定
	import {
		ref
	} from "vue"
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import tmApp from "@/tmui/components/tm-app/tm-app.vue"
	import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue"
	import tmButton from "@/tmui/components/tm-button/tm-button.vue"
	import {
		userStore
	} from '@/stores/user'
	const store = userStore()
	// 
	const loveId = ref('')
	const code = ref('')
	onLoad(async (option) => {
		console.log(option);
		loveId.value = option.loveId
		console.log(store.userinfo);
		if (store.userinfo) {

		} else {
			//判断当前用户是否是注册用户
			//不是前往注册页面
			//是 就点击 绑定
		}
	});

	function register() {
		uni.login({
			provider: 'weixin',
			success: function(res) {
				console.log(res.code);
				uniCloud.callFunction({
					name: 'ls-login',
					data: {
						action: 'loginByWeixin',
						params: {
							type: "register",
							code: res.code,
						}
					}
				}).then(res => {
					if (res.result.code == 0) {
						store.userinfo = res.result
					} else {

					}

				})
			}
		});
	}

	function bind() {
		if (loveId.value) {
			uniCloud.callFunction({
				name: 'ls-login',
				data: {
					action: 'acceptInvite',
					uniIdToken: store.userinfo.token,
					params: {
						uid: store.userinfo.uid,
						inviteCode: loveId.value
					}
				}
			}).then(res => {
				if (res.code == 0) {
					// 绑定成功
				} else {
					// res.result.msg
				}
			})
		}
	}

	function test() {
		uniCloud.callFunction({
			name: 'ls-login',
			data: {
				action: 'loveBind',
				uniIdToken: store.userinfo.token,
				params: {
					loveId1: '630efef67d91c900013547b8',
					loveId2: '62f7beb443000a000116d204',
				}
			}
		}).then(res => {
			if (res.result.data.length == 0) {
				//绑定失败
			} else {
				store.userinfo = res.result.data[0]
			}
		})
	}
</script>
