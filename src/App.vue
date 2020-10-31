<template>
  <div id="app">
    <NavBar />
    <h2>Hello</h2>
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
