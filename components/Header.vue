<template>
	<header class="header">
		<div
			v-if="!id"
			class="btn login"
			@click="kakaoLogin"
		>
			<img
				src="~/assets/images/kakao_login_medium_wide.png"
				alt=""
			/>
		</div>
		<div
			class="btn profile"
			v-else
		>
			<!-- <span>{{ account.profile.nickname }}</span> -->
			<div class="profile-img">
				<img
					:src="account.profile.profile_image_url"
					:alt="account.profile.nickname"
					height="150"
				/>
			</div>
		</div>
	</header>
</template>

<script setup>
	import { storeToRefs } from 'pinia';
	import { useKakaoStore } from '~/stores/kakao';
	const kakaoStore = useKakaoStore();
	let { id, account } = storeToRefs(kakaoStore);
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

		.btn {
			display: inline-block;
			cursor: pointer;
			&.login {
				img {
					display: block;
					padding: 20px;
				}
			}

			&.profile {
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
					border-radius: 50%;
					width: 150px;
					height: 150px;
					overflow: hidden;
				}
				img {
					display: block;
				}
			}
		}
	}
</style>
