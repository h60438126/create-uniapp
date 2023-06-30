<template>
	<base-page>
		<web-view :src="webviewSrc"></web-view>
	</base-page>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { onReady } from '@dcloudio/uni-app'

	const webModule : {
		startServer : (callback : (url : string) => void) => void,
		getNetwork : (callback : (network : string) => void) => void,
		goNext : (url : string, data : string) => void
	} = uni.requireNativePlugin('WebModule');

	const webviewSrc = ref<string>('');
	const url = "";

	const reset = () => {
		webModule?.startServer((url) => {
			webviewSrc.value = url;
			uni.hideLoading();
		})
	}

	onReady(async () => {
		uni.showLoading({
			mask: true
		});
		reset();
	})
</script>

<style>

</style>