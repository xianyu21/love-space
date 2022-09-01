<template>
	<tm-app>
		111111
	</tm-app>
</template>
<script lang="ts" setup>
	import {
		ref
	} from "vue"
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";


	onLoad((res) => {
		console.log(res);
	})
</script>
