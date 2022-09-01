<template>
	<tm-app>
		<view class="flex music-container " :class="[isPlay ? 'play ' : '']" id="music">
			<view class="music-info" :style="{ width:musicTitleWidth+ 'rpx'}">
				<view id="title">{{musicName}}</view>
				<view class="progress-container">
					<view class="progress"></view>
				</view>
			</view>
			<view class="flex  img-container">
				<image src="/static/ukulele.jpg" alt="music-cover" id="cover" />
			</view>
			<view class="flex flex-1">
				<view class="flex flex-row flex-row-center-between fulled">
					<view class="flex flex-row flex-row-center-center fulled">
						<tm-icon :font-size="50" color="#dfdbdf" name="tmicon-angle-left"></tm-icon>
					</view>
					<view class="flex flex-row flex-row-center-center fulled">
						<tm-icon v-show="!isPlay" :font-size="50" color="#dfdbdf" name="tmicon-playcircle-fill"
							@click='play'></tm-icon>
						<tm-icon v-show="isPlay" :font-size="50" color="#dfdbdf" name="tmicon-pausecircle-fill"
							@click='pause'>
						</tm-icon>
					</view>
					<view class="flex flex-row flex-row-center-center fulled">
						<tm-icon :font-size="50" color="#dfdbdf" name="tmicon-angle-right"></tm-icon>
					</view>
				</view>
			</view>

		</view>
	</tm-app>
</template>
<script lang="ts" setup>
	import {
		ref,
		getCurrentInstance
	} from "vue"
	import {
		onShow,
		onLoad,
		onReady
	} from "@dcloudio/uni-app";
	import tmIcon from "@/tmui/components/tm-icon/tm-icon.vue"
	const {
		proxy
	} = getCurrentInstance()
	const isPlay = ref(false)
	const musicWidth = ref('')
	const musicTitleWidth = ref('')
	const musicName = ref('盒子')
	const innerAudioContext = uni.createInnerAudioContext();
	const normalizeTime = time => {
		if (time === Infinity) return '00:00'
		const division = Math.floor(time / 60)
		const remainder = Math.floor(time % 60)
		const zero = x => '0'.repeat(2 - String(x).length)
		return `${zero(division) + division}:${zero(remainder) + remainder}`
	}


	onReady(() => {
		innerAudioContext.onPlay(() => {
			console.log('开始播放');
		});
		innerAudioContext.onError((onError) => {
			console.log("onError: ", onError);
		});
		// innerAudioContext.onCanplay((onCanplay) => {
		// 	console.log("onCanplay: ", onCanplay);
		// });

		innerAudioContext.onCanplay(() => {
			let intervalID = setInterval(() => {
				if (innerAudioContext.duration !== 0) {
					clearInterval(intervalID);
					console.log(normalizeTime(innerAudioContext.duration));
					console.log("音频时长", Number(innerAudioContext.duration).toFixed(0));
				}
			}, 500);
		});
		innerAudioContext.src =
			'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3';
		// innerAudioContext.duration = '0';


		uni.createSelectorQuery().in(proxy).select('#music').boundingClientRect(data => {
			musicWidth.value = data.width
			// 减去 两边间距 以及图片宽度
			musicTitleWidth.value = musicWidth.value * 2 - 170
		}).exec();
	})
	//播放
	function play() {
		console.log('已触发play');
		isPlay.value = true
		innerAudioContext.play()
	}
	//暂停
	function pause() {
		console.log('已触发pause');
		isPlay.value = false
		innerAudioContext.pause()
	}
</script>
<style>
	/* latin-ext */
	@font-face {
		font-family: 'Lato';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: url(https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjxAwXjeu.woff2) format('woff2');
		unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
	}

	/* latin */
	@font-face {
		font-family: 'Lato';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: url(https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjx4wXg.woff2) format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}



	body {
		background-image: linear-gradient(0deg, rgba(247, 247, 247, 1) 23.8%, rgba(252, 221, 221, 1) 92%);
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-family: 'Lato', sans-serif;
		margin: 0;
	}

	.music-container {
		background-color: #fff;
		border-radius: 15rpx;
		box-shadow: 0 0rpx 30rpx 0 rgba(252, 169, 169, 0.6);
		display: flex;
		padding: 20rpx 30rpx;
		position: relative;
		margin: 100rpx;
		z-index: 10;
	}

	.img-container {
		position: relative;
		width: 110rpx;

	}

	.img-container::after {
		content: '';
		background-color: #fff;
		border-radius: 50%;
		position: absolute;
		bottom: 100%;
		left: 50%;
		width: 20rpx;
		height: 20rpx;
		background: #fe8daa;
		transform: translate(-50%, 50%);
	}

	.img-container image {
		border-radius: 50%;
		object-fit: cover;
		height: 110rpx;
		width: inherit;
		position: absolute;
		bottom: 0;
		left: 0;
		animation: rotate 3s linear infinite;
		animation-play-state: paused;
	}

	.music-container.play .img-container image {
		animation-play-state: running;
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}



	.action-btn {
		background-color: #fff;
		border: 0;
		color: #dfdbdf;
		font-size: 20rpx;
		cursor: pointer;
		padding: 10rpx;
		margin: 0 20rpx;
	}

	.action-btn.action-btn-big {
		color: #cdc2d0;
		font-size: 30rpx;
	}

	.action-btn:focus {
		outline: 0;
	}

	.music-info {
		background-color: rgb(253, 245, 245);
		border-radius: 15rpx 15rpx 0 0;
		position: absolute;
		top: 0;
		left: 20rpx;


		padding: 10rpx 10rpx 10rpx 120rpx;
		opacity: 0;
		transform: translateY(0%);
		transition: transform 0.3s ease-in, opacity 0.3s ease-in;
		z-index: -1;
	}

	.music-container.play .music-info {
		opacity: 1;
		transform: translateY(-100%);
	}

	.music-info h4 {
		margin: 0;
	}

	.progress-container {
		background: #fff;
		border-radius: 5rpx;
		cursor: pointer;
		margin: 10rpx 0;
		height: 4rpx;
		width: 100%;
	}

	.progress {
		background-color: #fe8daa;
		border-radius: 5rpx;
		height: 100%;
		width: 0%;
		transition: width 0.1s linear;
	}
</style>
