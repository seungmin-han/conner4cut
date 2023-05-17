<template>
	<footer>
		<div class="footer-wrap">
			<p>Copyright © SEUNGMIN HAN 2023. All rights reserved.</p>
			<ul class="social-media">
				<li>
					<a
						href="https://github.com/seungmin-han"
						target="_blank"
						>github</a
					>
				</li>
				<li>
					<a
						href="https://www.instagram.com/1seungm1n/"
						target="_blank"
						>instagram</a
					>
				</li>
			</ul>
		</div>
	</footer>
</template>

<script setup></script>

<style lang="scss" scoped>
	footer {
		font-size: 1em;
		width: 100%;
		.footer-wrap {
			margin-top: 20px;
			padding: 10px;
			width: 100%;
			background-color: #444;

			p {
				color: #fff;
				text-align: center;
				margin: 20px 0;
			}

			> ul {
				text-align: center;
				> li {
					color: #fff;
					display: inline-block;
					padding: 5px 10px;
					a {
						color: #fff;
						text-decoration: underline;
					}
				}
			}
		}
	}
</style>
