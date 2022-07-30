<template>
	<tm-app>
		<tm-sheet>
			<view class="flex flex-row flex-wrap">
				<tm-button :margin="[10, 10]" size="mini" :shadow="0" label="登录"></tm-button>
				<tm-button :margin="[10, 10]" transprent text :shadow="0" size="normal" label="签到"></tm-button>
			</view>
			<tm-button block label="block"></tm-button>
		</tm-sheet>
	</tm-app>
</template>
<script lang="ts" setup>
	import {
		ref,
		computed
	} from "vue"
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	import tmApp from "@/tmui/components/tm-app/tm-app.vue"
	import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue"
	import tmButton from "../../tmui/components/tm-button/tm-button.vue"

	const modeltype = ref('day')
	const dateStr = ref('')
	const showdate = ref(false)
	const testtext = ref("哈哈")
</script>
