<template>
	<header
		class="header"
		:class="{ top: !isMain }"
	>
		<div
			v-if="!id && $route.path == '/'"
			class="btn login"
			@click="login"
		>
			<img
				src="~/assets/images/kakao_login_medium_wide.png"
				alt=""
			/>
		</div>
		<div
			class="btn profile"
			v-else-if="id"
		>
			<!-- <span>{{ account.profile.nickname }}</span> -->
			<div
				class="profile-img"
				@click="goGallery"
			>
				<img
					:src="account.profile.profile_image_url"
					:alt="account.profile.nickname"
					:height="imgWidth"
				/>
			</div>
		</div>
	</header>
</template>

<script setup>
	import { gsap } from 'gsap';
	import { storeToRefs } from 'pinia';
	import { useKakaoStore } from '~/stores/kakao';
	const kakaoStore = useKakaoStore();
	const router = useRouter();
	let { id, account } = storeToRefs(kakaoStore);

	watch(id, v => {
		setTimeout(() => {
			gsap.fromTo(
				'.profile',
				{
					rotate: 180,
					scale: 0,
					duration: 0.5,
				},
				{
					rotate: 0,
					scale: 1,
					duration: 0.5,
				}
			);
		}, 0);
	});

	const isMain = computed(() => {
		return useRoute().path == '/';
	});

	const imgWidth = computed(() => {
		return isMain.value ? 150 : 50;
	});

	const login = () => {
		gsap.to('.login', {
			scale: 0.8,
			duration: 0.3,
		}).then(() => {
			kakaoLogin().then(res => {
				id.value = res.id;
				account.value = res.kakao_account;
			});
		});
	};

	const goGallery = () => {
		fadeOut(isMain.value ? '.main, .profile' : '.main', () => {
			router.push({
				path: '/studio/gallery',
				query: { isMain: isMain.value },
				meta: { isMain: isMain.value },
			});
		});
	};
</script>

<style lang="scss" scoped>
	header {
		position: fixed;
		z-index: 5;
		// width: 100%;
		top: calc(50% + 100px);
		left: 50%;
		text-align: center;
		transform: translateX(-50%);
		&.top {
			transform: none;
			left: 0;
			width: 100%;
			top: 0;

			.profile {
				position: initial !important;
				.profile-img {
					width: 50px !important;
					height: 50px !important;
				}
			}
		}

		.btn {
			display: inline-block;
			transform-origin: 50% 50%;
			&.login {
				cursor: pointer;
				img {
					display: block;
					padding: 20px;
				}
			}

			&.profile {
				position: relative;
				bottom: 50px;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: end;
				padding: 20px;
				span {
					padding-right: 10px;
					font-weight: bold;
					font-size: 1em;
				}
				.profile-img {
					cursor: pointer;
					border-radius: 50%;
					width: 150px;
					height: 150px;
					overflow: hidden;
					display: flex;
					justify-content: center;
				}
				img {
					display: block;
				}
			}
		}
	}
</style>
