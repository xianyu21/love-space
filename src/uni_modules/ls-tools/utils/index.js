// utils/index.js
/**
 * 判断对象中是否存在某个属性
 * @ param {Object} obj 对象
 * @ param {String} key 属性名
 */
function hasProperty(obj, key) {
	return key in obj;
}
/**
 * 去除空格
 */
function trim(str = "", type = "both") {
	return (str + "").replace({
		both: /^\s+|\s+$/g,
		left: /^\s*/,
		right: /(\s*$)/g,
		all: /\s+/g
	} [type], "")
}

/**
 * 深度拷贝
 */
function deepClone(obj1, obj2 = {}) {
	let toStr = Object.prototype.toString;
	let arrStr = toStr.call([]);
	for (let prop in obj1) {
		if (obj1.hasOwnProperty(prop)) {
			if (obj1[prop] !== null && typeof(obj1[prop]) == "object") {
				obj2[prop] = toStr.call(obj1[prop]) == arrStr ? [] : {};
				deepClone(obj1[prop], obj2[prop]);
			} else {
				obj2[prop] = obj1[prop];
			}
		}
	}
	return obj2;
}

/**
 * 显示toast信息提示
 */
function toast(msg, duration = 2000) {
	if (!msg) return;
	uni.showToast({
		title: msg + "",
		icon: 'none',
		duration
	})
}

export default {
	hasProperty,
	trim,
	deepClone,
	toast，
	// ...
}
