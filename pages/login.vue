<template>
	<div></div>
</template>

<script setup>
	Kakao.init(useRuntimeConfig().public.kakaoConfig.jsKey);
	Kakao.Auth.authorize({ redirectUri: `${window.location.origin}/success` });
	// Kakao.API.request({ url: '/v2/user/me' });
</script>

<style lang="scss" scoped></style>
