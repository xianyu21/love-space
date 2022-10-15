import utils from "./utils"

const $mt = {
	...utils,
}

uni.$mt = $mt

const install = (Vue) => {
	// #ifndef APP-NVUE
	Vue.prototype.$mt = $mt
	// #endif
}

export default {
	install
}
