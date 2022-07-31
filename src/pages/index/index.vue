<template>
	<tm-app>
		<tm-sheet>
			<view class="flex flex-row flex-wrap">
				<tm-button :margin="[10, 10]" :shadow="0" label="登录" @click="getUserInfo"></tm-button>
				<tm-button :margin="[10, 10]" :shadow="0" label="签到"></tm-button>
			</view>
		</tm-sheet>
	</tm-app>
</template>
<script lang="ts" setup>
	import {
		ref,
		computed
	} from "vue"
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	import tmApp from "../../tmui/components/tm-app/tm-app.vue"
	import tmSheet from "../../tmui/components/tm-sheet/tm-sheet.vue"
	import tmButton from "../../tmui/components/tm-button/tm-button.vue"
	const name = ref('')
	const avatar = ref('')
	// 登录
	function getUserInfo() {
		wx.getUserProfile({
			desc: '更新您的个人信息',
			success: (res) => {
				name.value = res.userInfo.nickName; //昵称
				avatar.value = res.userInfo.avatarUrl; //头像
				// 成功后进行登录,获取code
				console.log(name, avatar);
				wxlogin();
			},
			fail(err) {
				uni.showToast({
					icon: 'none',
					title: '授权失败',
					duration: 1500
				})
			}
		})
	}

	function wxlogin() {
		uni.showLoading({
			title: '登录中...'
		});
		uni.login({
			provider: 'weixin',
			success: function(loginRes) {
				wxloginres(loginRes.code);
			}
		});

	}

	function wxloginres(code) {
		let that = this
		uniCloud.callFunction({
			name: 'user_authorize',
			data: {
				name: name.value,
				avatar: avatar.value,
				mptype: 'wx',
				code: code,
				userId: '62e67d840d082200016150e4',
			},
		}).then(res => {
			if (res.result.success) {
				console.log(res.result.data);
				// that.$u.vuex('vuex_user', res.result.data)
				// that.getUser()
				// await that.getSign()
				uni.showToast({
					icon: 'none',
					mask: true,
					title: '登录成功',
					duration: 1500
				})
			} else {
				uni.showToast({
					icon: 'none',
					mask: true,
					title: res.result.msg,
					duration: 1500
				})
			}
		})
	}







	function loginClick() {
		signClick()
	}

	function signClick() {
		uni.showLoading({
			mask: true,
			title: '签到中...'
		})
		uniCloud.callFunction({
			name: 'sign_add',
			data: {
				"userId": ''
			},
		}).then(res => {
			console.log(res);
			uni.hideLoading()
		})


	}
</script>
