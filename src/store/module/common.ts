// import { defineStore } from "pinia";

// interface State {
//   token: any
// }
// // const useStore = defineStore('storeId', {
// //   state: (): State => {
// //     return {
// //       userList: [],
// //       user: null,
// //     }
// //   },
// // })
// // 命名方式建议统一规范 use + id + store，示例 useUserStore ，id 为 user
// export const useCommonStore = defineStore("common", {
//   state: () => {
//     return {
//       token: null,
//     };
//   },
//   persist: {
//     key: 'my-custom-key',
//   },
// });
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  //  类似data
  state: () => {
    return {
      userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as string) : undefined,
      token: 'aaxswkjaoksjdohasdh' as string | undefined,
      num: 1,
    }
  },
  //  类似计算属性
  getters: {
    getNum2: (state) => state.num * 2
  },
  // 类似methods
  actions: {
    setUserInfo(info = null) {
      this.userInfo = info || undefined
      console.log(info);

      localStorage.setItem('userInfo', JSON.stringify(info))
    }
  },
  persist: true
})


