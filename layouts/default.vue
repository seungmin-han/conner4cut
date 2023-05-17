<template>
	<div id="wrapper">
		<div id="content">
			<slot />
		</div>
		<!-- <Footer></Footer> -->
	</div>
</template>

<script setup></script>

<style lang="scss">
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		list-style: none;
		text-decoration: none;
	}

	body {
		background-image: url('~/assets/images/paper3.jpg');
		background-size: contain;
		// font-family: Papyrus;
		font-family: Viner Hand ITC;
	}
</style>
<style lang="scss" scoped>
	#wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100vh;

		#content {
			flex: 1;
		}
	}
</style>
