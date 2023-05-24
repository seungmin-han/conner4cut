<template>
	<div class="main">
		<div v-for="userId in data">
			<div v-for="photoInfo in userId">
				<img
					:src="photoInfo.href"
					alt=""
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { getDatabase, ref as fref, child as fchild, get as fget } from 'firebase/database';
	import { initializeApp } from 'firebase/app';
	const config = useRuntimeConfig();
	const app = initializeApp(config.public.firebaseConfig);
	const db = getDatabase(app);
	let data = reactive(null);
	onMounted(() => {
		fget(fchild(fref(db), 'photo')).then(res => {
			console.log(res.val());
			data = res.val();
		});
	});
</script>

<style lang="scss" scoped></style>
