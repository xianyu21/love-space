<template>
	<tm-app ref="app">
		<tm-sheet>
			xxxxxxxxxxxxxxx
			<!-- <view class="flex flex-row flex-wrap">
				<tm-button :margin="[10, 10]" :shadow="0" :label="'登录'+signIntegral" @click="getUserInfo"></tm-button>
				<tm-button :margin="[10, 10]" :shadow="0" :label="'签到'+inviteIntegral" @click="signClick"></tm-button>
				{{isSign?'签到':'未签到'}}
			</view> -->
		</tm-sheet>

		<tm-sheet>
			<tm-text _class="pt-50 mt-50" color="#303133" label="邀请好友"></tm-text>
			<tm-text _class="pt-50 mt-50" label="+6积分/位"></tm-text>
		</tm-sheet>



		<!-- <tm-sheet :padding='[0,0]' transprent>
			<tm-row :column="3" :gutter="10">
				<tm-col class="flex-1" :height='220'>
					<tm-icon color="red" :fontSize="75" _class="ma-10" name="tmicon-minus-circle-fill"></tm-icon>
					<tm-text color="#303133" _class="pt-4" label="邀请好友"></tm-text>
					<tm-text :font-size="24" _class="pt-4" color='#c0c4cc' label="+6积分/位"></tm-text>
				</tm-col>
				<tm-col class="flex-1" :height='220'>
					<tm-icon color="red" :fontSize="75" name="tmicon-minus-circle-fill"></tm-icon>
					<tm-text color="#303133" label="每日签到"></tm-text>
					<tm-text :font-size="24" color='#c0c4cc' label="+2积分/天"></tm-text>
				</tm-col>
				<tm-col class="flex-1" :height='220'>
					<tm-icon color="red" :fontSize="75" name="tmicon-minus-circle-fill"></tm-icon>
					<tm-text color="#303133" label="赚取积分"></tm-text>
					<tm-text :font-size="24" color='#c0c4cc' label="+6积分/次"></tm-text>
				</tm-col>
			</tm-row>
		</tm-sheet>
		<view class="mb-32 mx-32 round-3 overflow">
			<tm-cell showAvatar avatar="https://picsum.photos/200/300" :margin="[0, 0]" :titleFontSize="30"
				rightText="2分" title="我的积分"> </tm-cell>
		</view>
		<view class="mb-32 mx-32 round-3 overflow">
			<tm-cell showAvatar avatar="https://picsum.photos/200/300" :margin="[0, 0]" :titleFontSize="30"
				title="我的收藏"> </tm-cell>
			<tm-cell showAvatar avatar="https://picsum.photos/200/300" :margin="[0, 0]" :titleFontSize="30"
				title="我的下载"> </tm-cell>
			<tm-cell showAvatar avatar="https://picsum.photos/200/300" :margin="[0, 0]" :titleFontSize="30"
				rightText="投稿赚积分" title="我的投稿"> </tm-cell>
		</view>
		<view class="mb-32 mx-32 round-3 overflow">
			<tm-cell showAvatar avatar="https://picsum.photos/200/300" :margin="[0, 0]" :titleFontSize="30"
				title="联系客服"> </tm-cell>
			<tm-cell showAvatar avatar="https://picsum.photos/200/300" :margin="[0, 0]" :titleFontSize="30"
				title="意见反馈"> </tm-cell>
			<tm-cell showAvatar avatar="https://picsum.photos/200/300" :margin="[0, 0]" :titleFontSize="30"
				title="关于我们"> </tm-cell>
			<tm-cell showAvatar avatar="https://picsum.photos/200/300" :margin="[0, 0]" :titleFontSize="30"
				title="管理后台"> </tm-cell>
		</view> -->
	</tm-app>
</template>
<script lang="ts" setup>
	import {
		ref,
		computed
	} from "vue"
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import tmApp from "@/tmui/components/tm-app/tm-app.vue"
	import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue"
	import tmText from "@/tmui/components/tm-text/tm-text.vue"
	import {
		useTmpiniaStore
	} from '@/tmui/tool/lib/tmpinia';
	const store = useTmpiniaStore();
	
	const name = ref('')
	const avatar = ref('')
	const signIntegral = ref(0) //签到获得积分
	const inviteIntegral = ref(0) //邀请获得积分
	const isSign = ref(false) //是否签到
	const signShow = ref(false) // 展示 积分提示框
	// 
	onLoad(() => {
		store.randomizeCounter()
		//获取配置参数
		getConfig()
		//判断用户是否存在  存在更新用户信息
		if (store.tmStore.vuex_user) {
			getUser()
		}

	});
	// 
	async function getConfig() {
		let config = await uniCloud.callFunction({
			name: 'config_map',
			data: {
				'keys': ['signIntegral', 'inviteIntegral']
			},
		})
		if (config.result.success) {
			signIntegral.value = parseInt(config.result.data[0])
			inviteIntegral.value = parseInt(config.result.data[1])
		}
	}
	// 
	async function getUser() {
		let detail = await uniCloud.callFunction({
			name: 'query_map',
			data: {
				dbName: "wx_user",
				id: store.tmStore.vuex_user._id
			},
		})
		store.$patch(state => {
			state.tmStore.vuex_user = detail.result
		})
	}
	// 登录
	function getUserInfo() {
		wx.getUserProfile({
			desc: '更新您的个人信息',
			success: (res) => {
				name.value = res.userInfo.nickName; //昵称
				avatar.value = res.userInfo.avatarUrl; //头像
				// 成功后进行登录,获取code
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
		uniCloud.callFunction({
			name: 'user_authorize',
			data: {
				name: name.value,
				avatar: avatar.value,
				code: code,
				userId: '',
			},
		}).then(async res => {
			if (res.result.success) {
				store.$patch(state => {
					state.tmStore.vuex_user = res.result.data
				})
				await getUser()
				await getSign()
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
	async function getSign() {
		let query = await uniCloud.callFunction({
			name: 'sign_flag',
			data: {
				dbName: 'ls_sign',
				"userId": store.tmStore.vuex_user._id,
				"startTime": new Date(new Date().toLocaleDateString()).getTime()
			},
		})
		if (query.result.success) {
			isSign.value = true
		} else {
			isSign.value = false
		}
	}

	function signClick() {
		if (isSign.value) return
		uni.showLoading({
			mask: true,
			title: '签到中...'
		})
		uniCloud.callFunction({
			name: 'sign_add',
			data: {
				// "userId": store.tmStore.vuex_user._id,
				"userId": '62e680242f77c40001b3fa13',
			},
		}).then(res => {
			uni.hideLoading()
			if (res.result.success) {
				// getUser()
				uni.showToast({
					icon: 'none',
					mask: true,
					title: '签到成功',
					duration: 1500
				})
				signShow.value = true
				isSign.value = true
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
</script>
