import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
	state() {
		return {
			someState: 'hello pinia',
      num:0
		}
	},
  actions:{
    inc(){
      this.num++
    }
  },
})