<template>
	<div id="app">
		<NavBar />
		<router-view />
	</div>
</template>

<script>
	import NavBar from './views/navBar.vue';

	export default {
		name: 'App',
		components: {
			NavBar,
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
