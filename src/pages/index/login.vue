<template>
	<tm-app>
		<tm-button label="登录" @click="login"></tm-button>

		<template v-if="showUserInfo">
			<tm-form ref="form" v-model="show" :label-width="190">
				<tm-form-item required label="昵称" field="nameuser.a">
					<tm-input type="nickname" :inputPadding="[0, 0]" v-model.lazy="show.nameuser.a" :transprent="true" :showBottomBotder="false"></tm-input>
				</tm-form-item>
				<tm-form-item required label="头像" field="nameuser.a">
					<tm-button label="头像" openType="chooseAvatar" @chooseavatar="getAvatar"></tm-button>
				</tm-form-item>
				<tm-form-item required label="性别" field="radio">
					<tm-radio-group v-model="show.gender">
						<tm-radio label="男" :value="1"></tm-radio>
						<tm-radio label="女" :value="2"></tm-radio>
					</tm-radio-group>
				</tm-form-item>
				<tm-form-item required label="个性签名" field="nameuser.a">
					<tm-input type="textarea" autoHeight showCharNumber :maxlength="100"></tm-input>
				</tm-form-item>
				<tm-form-item required label="上传截图" field="upload" :rules="{ required: true, message: '请上传' }">
					<tm-upload :rows="3" :width="420" v-model="show.upload"></tm-upload>
				</tm-form-item>
			</tm-form>
		</template>
		<tm-button label="登录" @click="loginInfo"></tm-button>
	</tm-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import tmApp from '../../tmui/components/tm-app/tm-app.vue';
import tmButton from '../../tmui/components/tm-button/tm-button.vue';
import tmInput from '@/tmui/components/tm-input/tm-input.vue';
import tmRadioGroup from '@/tmui/components/tm-radio-group/tm-radio-group.vue';
import tmRadio from '@/tmui/components/tm-radio/tm-radio.vue';
import tmUpload from '@/tmui/components/tm-upload/tm-upload.vue';
import tmFormItem from '@/tmui/components/tm-form-item/tm-form-item.vue';
import tmForm from '@/tmui/components/tm-form/tm-form.vue';
const showUserInfo = ref(true);
const show = ref({
	nikeName: null,
	avatarUrl: null,
	gender: 1,
	nameuser: {
		a: '测试'
	}
});

const login = () => {
	console.log('触发');
	uni.showLoading({
		title: '登陆中...',
		mask: true
	});
	uni.login({
		provider: 'weixin',
		success: async (res) => {
			console.log(res);
			if (res.code) {
				let result = await uniCloud.callFunction({
					name: 'user',
					data: {
						action: 'code2Session',
						js_code: res.code,
						user_info: {}
					}
				});
				let data = result.result.result.result;
				//如register为true，用户未填写资料
				if (data.register) {
					//_this.showUserInfo 显示填写资料组件
					showUserInfo.value = true;
					uni.hideLoading();
					return;
				}
				if (data._id) {
					const datax = {
						_id: data._id,
						mp_wx_openid: data.mp_wx_openid,
						register_date: data.register_date
					};
					loginSuccess(datax);
				}
				console.log(result);
			}
		}
	});
};
const getAvatar = (res: any) => {
	console.log(res);
};
const loginInfo = () => {
	console.log(show.value);
};
/**
 * 上传图片至云存储
 */
// export async function uploadImage(url) {
// 	const fileName = url.split('/')
// 	return new Promise(resolve => {
// 		uniCloud.uploadFile({
// 			filePath: url,
// 			cloudPath: fileName[fileName.length - 1],
// 			success(res) {
// 				resolve(res)
// 			},
// 			fail() {
// 				uni.showToast({
// 					title: '图片上传失败！',
// 					icon: 'none'
// 				})
// 				resolve(false)
// 			}
// 		})
// 	})
// }

//判断是否登陆
// export function isLogin() {
// 	try {
// 		const user = uni.getStorageSync('user')
// 		const isLogin = uni.getStorageSync('isLogin')
// 		const nowTime = new Date().getTime()
// 		return !!(isLogin && user && user._id && user.expiresTime > nowTime);
// 	} catch (error) {

// 	}
// }

async function wxLogin() {
	// if (this.userInfo && this.userInfo.avatarUrl) {
	// 	uni.showLoading({
	// 		title: '正在上传图片...',
	// 		mask: true
	// 	});
	// 	//上传头像至云储存并返回图片链接
	// 	const imageUrl = await uploadImage(this.userInfo.avatarUrl)
	// 	if (!imageUrl) {
	// 		return
	// 	}
	// 	this.userInfo = { ...this.userInfo, avatarUrl: imageUrl.fileID }
	// }
	//取得code并调用云函数
	// this.loginFail()
}

function loginSuccess(data: any) {
	updateTokenStorage(data);
	updateIsLoginStorage(true);
	uni.showToast({
		title: '登陆成功！',
		icon: 'none'
	});
	uni.navigateBack();
}

function loginFail() {
	updateTokenStorage();
	updateIsLoginStorage();
	uni.showToast({
		title: '登陆失败！',
		icon: 'none'
	});
}
//
function updateTokenStorage(data = {}) {
	if (data) {
		const expiresTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
		data = { ...data, expiresTime: expiresTime };
	}
	uni.setStorageSync('user', data);
}
function updateIsLoginStorage(data: any = null) {
	uni.setStorageSync('isLogin', data);
}
</script>
