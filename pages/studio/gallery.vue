<template>
	<div class="main">
		<div class="container">
			<template v-for="user in list">
				<div
					v-for="photo in user"
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
			</template>
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
		fget(fchild(fref(db), `photo`))
			.then(res => {
				list.value = res.val();
				console.log(list.value);
			})
			.catch(() => {
				alert('잘못된 접근입니다.');
				router.replace('/');
			});
	});
</script>

<style lang="scss" scoped>
	.main {
		.container {
			display: flex;
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
