<template>
	<div class="main">
		<div
			class="container"
			v-if="list"
		>
			<!-- <template v-for="user in list"> -->
			<div
				v-for="photo in list"
				class="photo_wrap"
			>
				<div class="image">
					<img
						:src="photo.href"
						alt=""
					/>
				</div>
				<div class="shadow"></div>
			</div>
			<!-- </template> -->
		</div>
		<div
			v-else
			class="empty"
		>
			Empty Photo
			<p @click="goHome">home</p>
		</div>
		<div class="btn-group">
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
	import { getDatabase, ref as fref, child as fchild, get as fget } from 'firebase/database';
	import { initializeApp } from 'firebase/app';
	import { useKakaoStore } from '~/stores/kakao';

	const config = useRuntimeConfig();
	const app = initializeApp(config.public.firebaseConfig);
	const router = useRouter();
	const db = getDatabase(app);
	let list = ref({});
	const store = useKakaoStore();
	const route = useRoute();

	onMounted(() => {
		if (route.query?.isMain) {
			fadeIn('.main, .profile');
		} else {
			fadeIn();
		}
		fget(fchild(fref(db), `photo/${store.id}`))
			.then(res => {
				list.value = res.val();
				console.log(list.value);
			})
			.catch(() => {
				alert('로그인 후 접근 가능합니다.');
				router.replace('/');
			});
	});

	const goHome = () => {
		fadeOut('.main', () => {
			router.push('/');
		});
	};
</script>

<style lang="scss" scoped>
	.main {
		.empty {
			font-size: 2em;
			text-align: center;
			p {
				cursor: pointer;
				padding-top: 30px;
				font-family: sans-serif;
				font-size: 1rem;
				text-decoration: underline;
			}
		}
		.container {
			display: flex;
			flex-wrap: wrap;
			padding: 90px 0;
			justify-content: center;
			.photo_wrap {
				position: relative;
				margin: 10px;
				.image {
					img {
						display: block;
					}
				}
				.shadow {
					z-index: -1;
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					box-shadow: 0px 0px 10px;
				}
			}
		}
	}
</style>
