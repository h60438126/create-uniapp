<template>
	<view class="container">
		<view class="bar"></view>
		<slot></slot>
	</view>
</template>

<script lang="ts">
	export default {
		name: "base-page",
		data() {
			return {

			};
		}
	}
</script>

<style>
	.bar {
		height: var(--status-bar-height);
		width: 100%;
	}
</style>