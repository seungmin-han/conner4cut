<template>
	<div></div>
</template>

<script setup>
	import axios from 'axios';
	const route = useRoute();
	const code = route.query.code;
	console.log(code);

	axios
		.post(
			'https://kauth.kakao.com/oauth/token',
			{
				client_id: useRuntimeConfig().public.kakaoConfig.restApiKey,
				redirect_uri: `${window.location.origin}/success`,
				grant_type: 'authorization_code',
				code: code,
			},
			{
				headers: {
					'Content-Type': `application/x-www-form-urlencoded`,
				},
			}
		)
		.then(res => {
			console.log(res);
			opener.sessionStorage.setItem('token', res.data.access_token);
			close();
		});
</script>

<style lang="scss" scoped></style>
