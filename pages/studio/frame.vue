<template>
	<div class="main">
		<div class="color-picker">
			<label for="color">Background Color</label>
			<input
				type="color"
				v-model="color"
				name=""
				id=""
			/>
		</div>

		<div
			ref="frame"
			class="frame"
			:class="{ shadow: !isCopied }"
			:style="`background-color:${color}`"
		>
			<div class="logo">
				<span :style="`color: ${fontColor}`">Conner 4 Cuts</span>
			</div>
			<div
				v-for="(image, idx) in selectedImage"
				:key="idx"
				class="image"
			>
				<img
					:src="image"
					alt=""
				/>
			</div>
		</div>
		<div class="btn-group">
			<div
				class="btn download"
				@click="download"
			>
				<img
					src="~/assets/images/download.png"
					alt=""
					width="70"
				/>
			</div>
			<div
				class="btn home"
				@click="goHome"
			>
				<img
					src="~/assets/images/home.png"
					alt=""
					width="70"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { gsap } from 'gsap';
	import html2canvas from 'html2canvas';
	import { useImageStore } from '~/stores/image';

	const store = useImageStore();

	const frame = ref('');

	let isCopied = ref(false);

	const color = ref('#ffffff');

	const fontColor = computed(() => {
		const red = parseInt(color.value.slice(1, 3), 16);
		const green = parseInt(color.value.slice(3, 5), 16);
		const blue = parseInt(color.value.slice(5), 16);

		return red * 0.299 + green * 0.587 + blue * 0.114 > 186 ? '#000000' : '#ffffff';
	});

	const selectedImage = [...store.selectedIndex].map(v => {
		return store.images[v];
	});

	onMounted(() => {
		gsap.from('.main', {
			y: -300,
			opacity: 0,
			duration: 0.5,
		});
	});

	const fadeOut = async () => {
		await gsap.to('.main', {
			y: -300,
			opacity: 0,
			duration: 0.5,
		});
	};

	const goHome = () => {
		fadeOut().then(() => {
			useRouter().replace('/');
		});
	};

	const download = () => {
		isCopied.value = true;
		setTimeout(() => {
			html2canvas(frame.value).then(canvas => {
				isCopied.value = false;
				let link = document.createElement('a');
				link.download = 'Conner4Cuts.jpg';
				link.href = canvas.toDataURL('image/jpeg');
				link.click();
			});
		}, 0);
	};
</script>

<style lang="scss" scoped>
	.main {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.frame {
			text-align: center;
			max-width: 300px;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			z-index: 3;
			position: relative;
			background-color: #fff;
			padding: 50px 10px;
			&.shadow {
				box-shadow: 0px 0px 10px;
			}

			.image {
				position: relative;
				height: auto;
				width: 100%;
				img {
					box-sizing: border-box;
					width: 100%;
					transform: rotateY(180deg);
				}
			}

			.logo {
				font-weight: 500;
				font-size: 1.2em;
				position: absolute;
				bottom: 10px;
				left: 50%;
				transform: translateX(-50%);
			}
		}

		.color-picker {
			vertical-align: baseline;
			padding-bottom: 10px;
			display: flex;
			flex-direction: row;
			align-items: center;
			label {
				padding: 0 10px;
			}
			input {
				appearance: none;
				width: 20px;
				height: 20px;
				border: none;
			}
			input::-webkit-color-swatch-wrapper {
				padding: 0;
			}
			input::-webkit-color-swatch {
				border-radius: 50%;
			}
		}

		.btn-group {
			position: fixed;
			bottom: 30px;
			right: 30px;
			display: flex;
			.btn {
				padding: 0 10px;
				cursor: pointer;
			}
		}
	}
</style>
