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
				class="btn upload"
				@click="upload"
			>
				<img
					src="~/assets/images/upload.png"
					alt=""
					width="65"
				/>
			</div>
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
	import { useKakaoStore } from '~/stores/kakao';
	import { initializeApp } from 'firebase/app';
	import { getDatabase, ref as fbref, set as fbset, push as fbpush, child as fbchild } from 'firebase/database';
	import dayjs from 'dayjs';

	const imageStore = useImageStore();
	const kakaoStore = useKakaoStore();

	const frame = ref('');

	let isCopied = ref(false);

	const color = ref('#ffffff');

	const fontColor = computed(() => {
		const red = parseInt(color.value.slice(1, 3), 16);
		const green = parseInt(color.value.slice(3, 5), 16);
		const blue = parseInt(color.value.slice(5), 16);

		return red * 0.299 + green * 0.587 + blue * 0.114 > 186 ? '#000000' : '#ffffff';
	});

	const config = useRuntimeConfig();
	const app = initializeApp(config.public.firebaseConfig);
	const db = getDatabase(app);

	const selectedImage = [...imageStore.selectedIndex].map(v => {
		return imageStore.images[v];
	});

	onMounted(() => {
		if (!Kakao.isInitialized()) {
			Kakao.init(useRuntimeConfig().public.kakaoConfig.jsKey);
		}

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

	const getPhotoDataURL = async () => {
		isCopied.value = true;
		return new Promise((resolve, reject) =>
			setTimeout(() => {
				html2canvas(frame.value)
					.then(canvas => {
						isCopied.value = false;
						resolve(canvas.toDataURL('image/jpeg'));
					})
					.catch(err => {
						reject(err);
					});
			}, 0)
		);
	};

	const download = () => {
		isCopied.value = true;
		getPhotoDataURL().then(url => {
			let link = document.createElement('a');
			link.download = 'Conner4Cuts.jpg';
			link.href = url;
			link.click();
		});
	};

	const upload = link => {
		const win = window.open(`${window.location.origin}/login`, 'login', '_top', 'width=300,height=500');
		const timer = setInterval(() => {
			if (win.closed) {
				clearInterval(timer);
				console.log(sessionStorage.getItem('token'));
				Kakao.Auth.setAccessToken(sessionStorage.getItem('token'));
				Kakao.API.request({
					url: '/v2/user/me',
				}).then(res => {
					kakaoStore.id = res.id;
					getPhotoDataURL().then(url => {
						const newKey = fbpush(fbchild(fbref(db), `photo/${res.id}`)).key;
						fbset(fbref(db, `photo/${res.id}/${newKey}`), {
							href: url,
							timestamp: dayjs().format('YYYY-MM-DD:HH:mm:ss'),
						});
					});
				});
			}
		}, 1000);
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
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 10px;
				cursor: pointer;
			}
		}
	}
</style>
