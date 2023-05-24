<template>
	<div class="main">
		<div class="container">
			<div v-for="user in list">
				<div v-for="photo in user">
					<img
						:src="photo.href"
						alt=""
					/>
				</div>
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
	const db = getDatabase(app);
	let list = ref({});

	const store = useKakaoStore();
	onMounted(() => {
		if (!store?.id) {
		}

		fget(fchild(fref(db), `photo/${store.id}`))
			.then(res => {
				list.value = res.val();
				console.log(list.value);
			})
			.catch(() => {
				alert('잘못된 접근입니다.');
				useRouter().replace('/');
			});
	});
</script>

<style lang="scss" scoped>
	.main {
		font-family: sans-serif;
	}
</style>
