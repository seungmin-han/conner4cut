<template>
	<div class="toast_wrap">
		{{ props.text }}
	</div>
</template>

<script setup>
	import gsap from 'gsap';
	const props = defineProps({
		text: {
			type: String,
		},
		duration: {
			type: Number,
			default: 3000,
		},
	});
	const emit = defineEmits(['close']);
	onMounted(() => {
		gsap.fromTo(
			'.toast_wrap',
			{
				opacity: 0,
				y: '50%',
			},
			{
				duration: 0.5,
				opacity: 1,
				y: 0,
			}
		);
		if (props.duration) {
			setTimeout(() => {
				gsap.fromTo(
					'.toast_wrap',
					{
						opacity: 1,
						y: 0,
					},
					{
						duration: 0.5,
						opacity: 0,
						y: '50%',
					}
				);
			}, props.duration - 500);
			setTimeout(() => {
				emit('close');
			}, props.duration);
		}
	});
</script>

<style lang="scss" scoped>
	.toast_wrap {
		font-family: sans-serif;
		z-index: 300;
		background-color: rgba($color: #333, $alpha: 0.6);
		color: #fff;
		font-weight: bold;
		line-height: 30px;
		padding: 10px;
		position: fixed;
		bottom: 50px;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
