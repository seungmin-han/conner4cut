<template>
	<div class="main">
		<div class="frame">
			<div
				v-for="(image, idx) in store.images"
				class="image"
			>
				<div
					:class="{ selected: store.isSelected(idx) }"
					@click="pick(idx)"
				></div>
				<img
					:key="idx"
					:class="`__${idx}`"
					:src="image"
					alt=""
					@click="pick(idx)"
				/>
			</div>
			<div class="select_count">
				<span>{{ store.selectedIndex.size }} / 4</span>
			</div>
		</div>
		<div class="btn-group">
			<div
				class="btn film"
				:class="{ active: store.selectedIndex.size == 4 }"
				@click="nextStep"
			>
				<img
					src="~/assets/images/film.png"
					alt=""
					width="70"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useImageStore } from '~/stores/image';

	onMounted(() => {
		fadeIn();
	});

	const store = useImageStore();

	const pick = idx => {
		if (store.isSelected(idx)) {
			store.deselect(idx);
		} else {
			if (store.selectedIndex.size == 4) {
				return;
			}
			store.select(idx);
		}
	};

	const nextStep = () => {
		if (store.selectedIndex.size != 4) {
			return;
		}
		fadeOut('.main', () => {
			useRouter().push('/studio/frame');
		});
	};
</script>

<style lang="scss" scoped>
	.main {
		.frame {
			max-width: 600px;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			z-index: 3;
			position: relative;
			background-color: #fff;
			padding: 50px 10px;
			box-shadow: 0px 0px 10px;
			.image {
				position: relative;
				height: auto;
				width: calc(50% - 5px);
				div {
					display: none;
					position: absolute;
					width: 100%;
					height: 100%;
					background-color: rgba(255, 255, 255, 0.4);
					z-index: 3;
					&.selected {
						display: block;
					}
				}
				img {
					box-sizing: border-box;
					width: 100%;
					transform: rotateY(180deg);
				}
			}

			.select_count {
				position: absolute;
				bottom: 10px;
				right: 10px;
				span {
					font-size: 1.2em;
				}
			}
		}
		.film {
			opacity: 0.3;
			transform-origin: 50% 50%;
			&.active {
				opacity: 1;
				animation: shaking 0.1s ease-in;
			}
		}

		@keyframes shaking {
			0% {
				transform: rotate(-5deg);
			}

			90% {
				transform: rotate(5deg);
			}
			100% {
				transform: rotate(0deg);
			}
		}
	}
</style>
