<template>
	<div class="main">
		<div class="frame">
			<div v-for="(image, idx) in store.images">
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
		</div>
	</div>
</template>

<script setup>
	import { useImageStore } from '~/stores/image';

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
</script>

<style lang="scss" scoped>
	.main {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
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
			div {
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
		}
	}
</style>
