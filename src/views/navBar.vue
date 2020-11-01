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
        <p>CityU DSC</p>
      </v-col>
    </v-row>
    <div class="title">#CityHack 3th</div>
    <b-nav align="center">
      <b-nav-item active>Overview</b-nav-item>
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