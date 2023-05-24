<template>
	<div id="wrapper">
		<Header></Header>
		<div id="content">
			<slot />
		</div>
		<div class="footer">
			<a href="https://github.com/seungmin-han">Copyright © SEUNGMIN HAN 2023. All rights reserved.</a>
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

	.main {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.btn-group {
		position: fixed;
		bottom: 30px;
		right: 30px;
		display: flex;
		.btn {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 10px;
			cursor: pointer;
		}
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

		.footer {
			position: fixed;
			left: 5px;
			bottom: 0px;
			a {
				text-decoration: underline;
				font-family: consolas;
				color: #000;
			}
		}
	}
</style>
