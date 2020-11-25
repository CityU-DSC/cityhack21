<template>
	<div id="app">
			<b-modal ref="my-modal" hide-footer>
			<div class="d-block text-center">
			<!-- The template is placed here -->
			<PromotionMaterial/>
			</div>
			<b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close</b-button>
			</b-modal>
		<NavBar />
		<router-view />
	</div>
</template>

<script>
	import NavBar from './views/navBar.vue';
	import PromotionMaterial from './components/promotion/promotion.vue';

		export default {
			name: 'App',
			methods: {
			showModal() {
				this.$refs['my-modal'].show()
			},
			hideModal() {
				this.$refs['my-modal'].hide()
			}
			},
			mounted() {
				this.showModal();
			},
			components: {
				NavBar,
				PromotionMaterial
			},
		};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cousine:ital,wght@0,400;0,700;1,400;1,700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
#app {
  font-family: "Space Mono",serif;
}

.v-window__next{
  right:0;  
}
</style>
