
import { defineStore } from 'pinia'
export const authStore = defineStore('auth', {
	// state 推荐箭头函数，为了TS类型推断
	state: () => {
		return {
			xx: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
			ada: 1,
		}
	},
	// 取值
	getters: {
		
	},
	//调用方法
	actions: {
	
	},

})