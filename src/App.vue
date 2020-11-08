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
  }
}
</script>

<style>
#app {
  font-family: Bahnschrift,serif;
}
</style>
