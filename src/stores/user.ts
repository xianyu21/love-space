
import { defineStore } from 'pinia'
export const userStore = defineStore('user', {
	// state 推荐箭头函数，为了TS类型推断
	state: () => {
		return {
			userinfo: {}
		}
	},
	// 取值
	getters: {

	},
	//调用方法
	actions: {

	},

})