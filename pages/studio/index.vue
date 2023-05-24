<template>
	<div class="main">
		<div
			class="loading"
			v-if="isLoading"
		>
			Loading...
		</div>
		<div
			class="frame"
			v-show="!isLoading"
		>
			<video
				class="camera"
				ref="cam"
				src=""
			></video>
			<div
				@click="takePhoto"
				class="shutter btn"
			>
				<img
					width="70"
					height="70"
					src="~/assets/images/shutter.svg"
					alt=""
				/>
			</div>
		</div>
		<div
			class="btn-group"
			v-if="store.images.length < 8"
		>
			<div class="btn gallery">
				<img
					src="~/assets/images/gallery.png"
					alt=""
					width="70"
				/>
				<span>
					{{ store.images.length }}
				</span>
			</div>
		</div>
		<!-- <div @click="stopStream">중지</div> -->
	</div>
</template>

<script setup>
	import html2canvas from 'html2canvas';
	import { gsap } from 'gsap';
	import { MotionPathPlugin } from 'gsap/all';
	import { useImageStore } from '~/stores/image';

	gsap.registerPlugin(MotionPathPlugin);

	const store = useImageStore();
	let isLoading = ref(true);
	const cam = ref(null);
	let stream = reactive(null);

	const constraints = {
		mobile: {
			facing: {
				audio: false,
				video: { facingMode: 'user' },
			},
			environment: {
				audio: false,
				video: {
					facingMode: { exact: 'environment' },
				},
			},
		},
		pc: {
			audio: false,
			// video: true,
			video: {
				width: { min: 1280 },
				height: { min: 720 },
			},
		},
	};

	const spinShutter = () => {
		gsap.fromTo(
			'.shutter',
			{
				rotation: 0,
				transformOrigin: '50% 50%',
			},
			{
				rotation: 180,
				transformOrigin: '50% 50%',
			}
		);
	};

	const capture = () => {
		html2canvas(cam.value).then(pic => {
			pic.style.position = 'absolute';
			pic.style.zIndex = 300;
			document.querySelector('.main').appendChild(pic);
			gsap.fromTo(
				pic,
				{
					rotateY: 180,
				},
				{
					rotateY: 180,
					motionPath: {
						path: [
							{ x: 100, y: -30 },
							{ x: 200, y: -100 },
							{ x: 400, y: -200 },
							{ x: 900, y: 400 },
						],
					},
					scale: 0,
					duration: 1,
				}
			).then(() => {
				store.addImage(pic.toDataURL('image/jpeg'));
				if (store.images.length >= 8) {
					stopStream();
					fadeOut('.main', () => {
						useRouter().replace('/studio/choice');
					});
				}
			});
		});
	};

	let clickCnt = ref(0);

	const takePhoto = () => {
		clickCnt.value++;

		if (clickCnt.value >= 9) {
			return;
		}

		spinShutter();
		capture();
	};

	const stopStream = () => {
		stream.getTracks().forEach(track => {
			track.stop();
		});
	};

	const getMedia = async constraints => {
		try {
			stream = await navigator.mediaDevices.getUserMedia(constraints);
			cam.value.srcObject = stream;
			cam.value.onloadedmetadata = () => {
				cam.value.play();
				isLoading.value = false;
				fadeIn('.frame');

				onKeyStroke(' ', e => {
					e.preventDefault();
					takePhoto();
				});
			};
		} catch (e) {
			// go home
			useRouter().push('/');
			console.log('error:', e);
		}
	};

	onMounted(() => {
		getMedia(constraints.pc);
		store.$reset();
	});
</script>

<style lang="scss" scoped>
	.main {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.loading {
			font-size: 3em;
		}

		.camera {
			max-width: 1280px;
			max-height: 720px;
		}

		.frame {
			z-index: 3;
			position: relative;
			background-color: #fff;
			padding: 50px 10px;
			box-shadow: 0px 0px 10px;
			video {
				transform: rotateY(180deg);
			}
		}

		.shutter {
			position: absolute;
			bottom: -30px;
			left: 50%;
			transform: translateX(-50%);
			cursor: pointer;
			width: 70px;
			height: 70px;
			transform-origin: 50% 50%;
		}

		.gallery {
			position: relative;
			span {
				font-weight: bold;
				font-size: 0.5em;
				line-height: 20px;
				width: 25px;
				height: 25px;
				text-align: center;
				border-radius: 50%;
				border: 2px solid #323232;
				font-family: serif;
				position: absolute;
				top: -10px;
				right: -10px;
			}
		}
	}
</style>
