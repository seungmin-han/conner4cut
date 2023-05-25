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
		<div class="frame_wrap">
			<div
				ref="frame"
				class="frame"
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
			<div class="shadow"></div>
		</div>
		<div class="btn-group">
			<div
				class="btn upload"
				:class="{ uploaded: isUploaded }"
				@click="checkBeforeUpload"
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
				class="btn gallery"
				@click="goGallery"
			>
				<img
					src="~/assets/images/gallery3.png"
					alt=""
					width="75"
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
		<Toast
			v-if="showToast"
			text="upload success!"
			@close="showToast = false"
		></Toast>
	</div>
</template>

<script setup>
	import html2canvas from 'html2canvas';
	import { useImageStore } from '~/stores/image';
	import { useKakaoStore } from '~/stores/kakao';
	import { initializeApp } from 'firebase/app';
	import { getDatabase, ref as fbref, set as fbset, push as fbpush, child as fbchild } from 'firebase/database';
	import dayjs from 'dayjs';

	let showToast = ref(false);
	let isUploaded = ref(false);

	const imageStore = useImageStore();
	const kakaoStore = useKakaoStore();
	const frame = ref('');
	const color = ref('#ffffff');

	watch(color, (newValue, oldValue) => {
		if (newValue != oldValue) {
			isUploaded.value = false;
		}
	});

	const config = useRuntimeConfig();
	const app = initializeApp(config.public.firebaseConfig);
	const db = getDatabase(app);

	const fontColor = computed(() => {
		const red = parseInt(color.value.slice(1, 3), 16);
		const green = parseInt(color.value.slice(3, 5), 16);
		const blue = parseInt(color.value.slice(5), 16);

		return red * 0.299 + green * 0.587 + blue * 0.114 > 186 ? '#000000' : '#ffffff';
	});

	const selectedImage = [...imageStore.selectedIndex].map(v => {
		return imageStore.images[v];
	});

	onMounted(() => {
		fadeIn();
	});

	const router = useRouter();

	const goHome = () => {
		fadeOut('.main', () => {
			router.replace('/');
		});
	};

	const goGallery = () => {
		fadeOut('.main', () => {
			router.push('/studio/gallery');
		});
	};

	const getPhotoDataURL = async () => {
		return new Promise((resolve, reject) => {
			html2canvas(frame.value)
				.then(canvas => {
					resolve(canvas.toDataURL('image/jpeg'));
				})
				.catch(err => {
					reject(err);
				});
		});
	};

	const download = () => {
		getPhotoDataURL().then(url => {
			let link = document.createElement('a');
			link.download = 'Conner4Cuts.jpg';
			link.href = url;
			link.click();
		});
	};

	const checkBeforeUpload = () => {
		if (isUploaded.value) {
			return;
		}

		if (kakaoStore.id) {
			upload();
		} else {
			kakaoLogin().then(res => {
				kakaoStore.id = res.id;
				kakaoStore.account = res.kakao_account;
				upload();
			});
		}
	};

	const upload = () => {
		isUploaded.value = true;
		getPhotoDataURL().then(url => {
			const newKey = fbpush(fbchild(fbref(db), `photo/${kakaoStore.id}`)).key;
			fbset(fbref(db, `photo/${kakaoStore.id}/${newKey}`), {
				href: url,
				timestamp: dayjs().format('YYYY-MM-DD:HH:mm:ss'),
			})
				.then(() => {
					showToast.value = true;
				})
				.catch(() => {
					isUploaded.value = false;
				});
		});
	};
</script>

<style lang="scss" scoped>
	.main {
		.frame_wrap {
			position: relative;

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

				.image {
					position: relative;
					height: auto;
					width: 100%;
					img {
						display: block;
						box-sizing: border-box;
						width: 100%;
						transform: rotateY(180deg);
					}
					&:not(:last-child) {
						margin-bottom: 10px;
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

			.shadow {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				box-shadow: 0px 0px 10px;
			}
		}

		.uploaded {
			cursor: not-allowed;
			opacity: 0.3;
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
				cursor: pointer;
			}
			input::-webkit-color-swatch-wrapper {
				padding: 0;
			}
			input::-webkit-color-swatch {
				border-radius: 50%;
			}
		}
	}
</style>
