<template>
	<div class="main">
		<h1>Conner 4 Cuts</h1>
		<NuxtLink to="/studio">
			<button class="start-btn btn">Press to Start</button>
		</NuxtLink>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
	.main {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		h1 {
			font-size: 5em;
		}

		.start-btn {
			margin-top: 40px;
		}
		.btn {
			font: 1em;
			font-weight: bold;
			padding: 6px 12px;
			border-radius: 10px;
			height: 50px;
			background: none;
		}
	}
</style>
