<template>
	<div class="main">
		<video
			class="camera"
			ref="cam"
			src=""
		></video>
		<div @click="takePhoto">찰칵</div>
		<div @click="stopStream">중지</div>
	</div>
</template>

<script setup>
	import html2canvas from 'html2canvas';
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
			video: true,
			// video: {
			// 	width: { min: 1280 },
			// 	height: { min: 720 },
			// },
		},
	};

	const takePhoto = () => {
		html2canvas(cam.value).then(pic => {
			console.log(pic.toDataURL('image/jpeg', 1.0));
		});
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
			};
		} catch (e) {
			// go home
			useRouter().push('/');
			console.log('error:', e);
		}
	};

	onMounted(() => {
		getMedia(constraints.pc);
	});
</script>

<style lang="scss" scoped>
	.main {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.camera {
			max-width: 1280px;
			max-height: 720px;
		}

		video {
			border-radius: 1rem;
		}
	}
</style>
