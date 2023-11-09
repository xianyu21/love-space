<template>
	<div class="login-card ga-flex ga-ai-c ga-j-c">
		<div class="ga-flex ga-flex-column ga-ai-c">
			<div @click="de.inc()">
				{{ de.num }}
			</div>

		</div>

	</div>
</template>

<script lang="ts" setup>
import {
	reactive,
	ref,
	getCurrentInstance
} from "vue"
import {
	useRouter
} from 'vue-router'

import { useStore } from "@/store/demo";
const de = useStore()
import {
	onShow,
	onLoad,
	onInit
} from "@dcloudio/uni-app";
// import {
// 	UserApi
// } from "../api/api.js";
// const { proxy } = getCurrentInstance();
// import { info } from '@/api/user.js'
// import {beforeFun,afterFun,complete} from "@/api/api.js"
onLoad(() => {

	// let res =  info()
	// console.log(res);
	// proxy.tm.fetch.request(
	// 	{
	// 		url: '/api/index/getBanner',
	// 		method: 'GET',
	// 		success: resp => {
	// 			console.log(resp, '99999999999999999');
	// 			// return new Promise((resolve, reject) => {
	// 			// 	// 模拟获取token逻辑
	// 			// 	resolve('111111');
	// 			// });
	// 		}
	// 	},
	// 	beforeFun,
	// 	afterFun,
	// 	complete
	// ).then((res1) => {
	// 	console.log(res1, '55555555555555');
	// })
})
// const beforeFun = () => {
// 	return {
// 		method: 'GET',
// 		data: {
// 			a: 1,
// 			b: 2
// 		}
// 	}
// }
// const afterFun = (config) => {
// 	console.log(config.data, '2222222222222');
// 	let code = config.data.code
// 	let result = config.data.data;
// 	switch (code) {
// 		case 0:
// 			result = config.data.data
// 			break;
// 		case 200:
// 			break;
// 		default:
// 			break;
// 	}
// 	return result
// }
// const complete = (e) => {
// 	console.log(e, '33333333333');
// }







const checked = ref(true)
const form = reactive({
	username: '',
	password: ''
})
const router = useRouter()
const commonStore = useStore()

// 模拟登录
const login = async () => {
	// const params = form
	// const res = await UserApi.login(params)
	// localStorage.setItem('token', res.data.token)
	// 修改store的token,并且存起来(设置persist: true),以后就行store存的缓存中获取
	// commonStore.$patch({
	// 	token: res.data.token,
	// })

	// commonStore.$patch({
	// 	token: '11212'
	// })
	// commonStore.$patch((state) => {
	// 	token: 1
	// })
	console.log(commonStore.$state)

	// router.push('/')
}
</script>

<style lang="scss" scoped>
.login-card {
	min-height: 100vh;
	background: rgba(83, 70, 134, 0.14);
	padding: 30px 12px;

	.login-main {
		width: 450px;
		padding: 40px;
		box-sizing: border-box;
		border-radius: 10px;
		box-shadow: 0 0 37px rgba(8, 21, 66, 0.05);
		margin: 0 auto;
		background-color: #ffffff;
	}

	.col-form-label {
		letter-spacing: 0.4px;
	}

	.form-control {
		height: 47px;
		line-height: 47px;
	}

	.login-social-title {
		position: relative;
		z-index: 1;
		text-align: center;
		margin-top: 30px;
		margin-bottom: 30px;

		&:before {
			content: "";
			position: absolute;
			width: 100%;
			height: 2px;
			background-color: rgba(83, 70, 134, 0.1019607843);
			top: 10px;
			z-index: -1;
			right: 0;
		}

		h3 {
			width: fit-content;
			margin-left: auto;
			margin-right: auto;
			color: #9993B4;
			background-color: #ffffff;
			padding-left: 25px;
			padding-right: 25px;
			font-size: 20px;
			font-weight: 500;
			letter-spacing: 0.5px;
		}

	}

	.login-social div {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 1px solid rgba(83, 70, 134, 0.1019607843);
		background-color: rgba(83, 70, 134, 0.05);

		&:hover {
			background-color: #534686;

			a {
				color: #ffffff !important;
			}
		}

		a {
			width: auto;
			color: #534686;
		}

	}

}
</style>