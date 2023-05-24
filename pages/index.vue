<template>
	<div class="main">
		<h1>Conner 4 Cuts</h1>
		<button
			class="start-btn btn"
			@click="start"
		>
			Press to Start
			<div class="arrow"></div>
		</button>
	</div>
</template>

<script setup>
	import { gsap } from 'gsap';

	const start = () => {
		fadeOut('.main', () => {
			useRouter().push('/studio');
		});
	};

	onMounted(() => {
		onKeyStroke(' ', e => {
			e.preventDefault();
			start();
		});

		fadeIn();

		gsap.to('.arrow', {
			top: 45,
			repeat: -1,
			yoyo: true,
			duration: 1,
		});
	});
</script>

<style lang="scss" scoped>
	.main {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		h1 {
			font-size: 5em;
		}

		.start-btn {
			top: 250px;
			position: relative;
			.arrow {
				position: absolute;
				top: 80px;
				left: 50%;
				width: 30px;
				height: 30px;
				transform-origin: center;
				transform: translateX(-50%) rotate(45deg);
				border-width: 0 5px 5px 0px;
				border-color: #787878;
				border-style: solid;
			}
		}
		.btn {
			cursor: pointer;
			font-size: 1.5em;
			font-weight: bold;
			padding: 6px 12px;
			border-radius: 10px;
			height: 50px;
			color: #454545;
			border: none;
			background: none;
		}
	}
</style>
