<template>
	<div>
		<button @click="handleClick">修改状态数据</button>
		<button @click="handleClick1">1</button>
		<button @click="handleClick2">2</button>
		<button @click="handleClick3">重置State</button>
		<button @click="handleClick4">4</button>

		<!-- 模板内不需要加.value -->
		<p>{{store.name}}</p>
		<!-- computed获取 -->
		<p>{{name}}</p>
		<!-- 或者使用解构之后的 -->
		<p>{{counter}}</p>
		<p>{{preferences}}</p>
	</div>
</template>

<script lang="ts" setup>
	import {
		ref,
		computed
	} from "vue"
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {
		useStore
	} from '@/stores/index.ts'
	// 使普通数据变响应式的函数  
	import {
		storeToRefs
	} from "pinia";
	
	const store = useStore()
	// 结合computed获取
	const name = computed(() => store.name)
	// 解构并使数据具有响应式
	const {
		counter
	} = storeToRefs(store);
	onLoad(() => {
		console.log(store);
		console.log(storeToRefs(store));
		console.log(store.test);
		console.log(store.doubleCount);
		console.log(store.doublePlusOne);
		console.log(store.randomizeCounter());
		console.log(store.fetchUserPreferences);
		console.log(store.fetchUserPreferences());
		
	})

	

	// 点击 + 1;
	function handleClick() {
		// ref数据这里需要加.value访问
		// 单个参数修改 state
		counter.value++;

	}

	function handleClick1() {
		// 多个参数修改 state
		store.$patch({
			counter: store.counter + 1,
			name: 'Abalam',
		})

	}

	function handleClick2() {
		store.$state = {
			counter: 666,
			name: 'Paimon'
		}

	}

	function handleClick3() {
		store.$reset()
	}

	function handleClick4() {
		store.increase()
	}
</script>
