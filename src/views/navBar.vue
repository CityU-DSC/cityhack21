<template>
  <div class="navigation">
    <v-container>
      <v-row class="iconLink mt-md-3 mb-md-3 mx-0 mb-2 mt-2">
        <v-col class="d-flex p-0">
          <v-icon class="mr-2"> mdi-instagram</v-icon>
          <v-icon class="mr-2"> mdi-facebook</v-icon>
          <v-icon class=" mr-auto"> mdi-twitter</v-icon>
          <a
              href="https://cityu-dsc.github.io/dsc-web/"
              target="_blank"
              class="mr-md-2 mr-1"
          >
            <v-chip pill dark class="v-chip--clickable"> CityU DSC</v-chip>
          </a>
          <a href="https://cityu-hall2.github.io/" target="_blank">
            <v-chip pill dark class="v-chip--clickable"> Hall2 IT Team</v-chip>
          </a>
        </v-col>
      </v-row>
    </v-container>
    <div class="title">
      <router-link to="/">#CityHack 2021</router-link>
    </div>
    <b-nav align="center" class="navBarNav  d-flex align-items-center">
      <b-nav-item v-if="isOverviewPage">
        <v-app-bar-nav-icon
            class="overviewNavButton"
            @click.stop="toggleDrawer"
            width
        ></v-app-bar-nav-icon>
      </b-nav-item>
      <b-nav-item active>
        <router-link to="/overview">Overview</router-link>
      </b-nav-item>
      <b-nav-item>Resources</b-nav-item>
      <b-nav-item-dropdown v-if="isLoggedIn">
        <template #button-content>
          <em>Hello {{ currentUserName }}</em>
        </template>
        <b-dropdown-item @click="logOut">Log Out</b-dropdown-item>
        <b-dropdown-item>
          <router-link to="/login">Switch Account</router-link>
        </b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown v-else>
        <template #button-content>
          <em>Log In</em>
        </template>
        <b-dropdown-item>
          <router-link to="/login">Log In</router-link>
        </b-dropdown-item>
        <b-dropdown-item>
          <router-link to="/register">Register</router-link>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapActions} from 'vuex';

export default {
  name: 'navBar',
  computed: {
    isOverviewPage() {
      console.log(this.$route);
      return this.$route.name === 'overview';
    },
    ...mapGetters('auth', ['isLoggedIn', 'currentUserName']),
  },
  methods: {
    ...mapActions('auth', ['logOutUser']),
    ...mapMutations('menu', ['toggleDrawer']),
    logOut() {
      localStorage.removeItem("jwt");
      this.logOutUser();
      this.$router.push("/");
    },
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}

.navBarNav {
  height: 36px;
}

.iconLink {
  /* margin: 1rem 0 2rem 0; */
}

.navigation {
  /* height: 20vh; */
  text-align: center;
  position: relative;
  z-index: 6;
  background: white;
  -webkit-box-shadow: 0px 13px 14px 0px rgba(138,138,138,0.92);
  box-shadow: 0px 13px 14px 0px rgba(138,138,138,0.92);
}

.title {
  font-size: 40px;
  font-weight: bold;
}
</style>
