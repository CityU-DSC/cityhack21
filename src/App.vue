<template>
  <div id="app">
    <NavBar />
    <HomePage />
  </div>
</template>

<script>
import HomePage from './views/home.vue';
import NavBar from './views/navBar.vue';

export default {
  name: 'App',
  components: {
    HomePage,
    NavBar,
  }
}
</script>

<style>
#app {
  font-family: Bahnschrift,serif;
}
</style>
