<template>
  <div class="navigation">
    <v-row class="iconLink">
      <v-col align="left">
        <v-icon class="mr-2 ml-2">
          mdi-instagram
        </v-icon>
        <v-icon class="mr-2">
          mdi-facebook
        </v-icon>
        <v-icon class="mr-2">
          mdi-twitter
        </v-icon>
      </v-col>
      <v-col align="right">
        <a href="https://cityu-dsc.github.io/dsc-web/" target="_blank">
          <v-chip pill dark class="mr-2 v-chip--clickable">
            CityU DSC
          </v-chip>
        </a>
        <a href="https://cityu-hall2.github.io/" target="_blank">
          <v-chip pill dark class="v-chip--clickable">
            Hall2 IT Team
          </v-chip>
        </a>
      </v-col>
    </v-row>
    <div class="title"><router-link to="/">#CityHack 2021</router-link></div>
    <b-nav align="center">
      <b-nav-item active><router-link to="/overview">Overview</router-link></b-nav-item>
      <b-nav-item>Resources</b-nav-item>
      <b-nav-item>Log In</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  name: "navBar"
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}

.iconLink {
  margin: 1rem 0 2rem 0;
}

.navigation {
  height: 20vh;
  text-align: center;
}

.title {
  font-size: 40px;
  font-weight: bold;
}
</style>