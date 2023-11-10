import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path"
import Unocss from 'unocss/vite'

// import Components from 'unplugin-vue-components/vite'
// https://vitejs.dev/config/
export default defineConfig({

	resolve: {
		alias: [
			{
				find: "@",
				replacement: resolve(__dirname, 'src')
			}
		]
	},
	server: {
		open: true,
		port: 1314,
		// 选项写法
		// proxy: {
		// 	'/pag': {
		// 		target: 'https://cdn.tmui.design',
		// 		changeOrigin: true,
		// 		rewrite: (path) => path.replace(/^\/api/, '/api')
		// 	},
		// 	'/one': {
		// 		target: 'https://v2.jinrishici.com',
		// 		changeOrigin: true,
		// 		rewrite: (path) => path.replace(/^\/api/, '/api')
		// 	},
		// 	'/api': {
		// 		target: 'https://lianyi.api.sauou.com',
		// 		changeOrigin: true,
		// 		rewrite: (path) => path.replace(/^\/api/, '/api')
		// 	},
		// }
	},
	plugins: [
		uni(),
		vueJsx(),
		// https://github.com/antfu/unocss
		process.env.UNI_COMPILER !== 'nvue' ? Unocss() : undefined,
	]
});
