<template>
  <div class="navigation">
    <v-container class='pb-0'>
      <v-row class="iconLink mt-md-3 mb-md-3 mx-0 mb-1 mt-1">
        <v-col class="d-flex p-0">
          <v-icon class="mr-2">mdi-instagram</v-icon>
          <v-icon class="mr-2">mdi-facebook</v-icon>
          <v-icon class=" mr-auto">mdi-twitter</v-icon>
          <a
            href="https://cityu-dsc.github.io/dsc-web/"
            target="_blank"
            class="mr-md-2 mr-1"
          >
            <v-chip pill dark class="v-chip--clickable color-black">CityU DSC</v-chip>
          </a>
          <a href="https://cityu-hall2.github.io/" target="_blank">
            <v-chip pill dark class="v-chip--clickable">Hall2 IT Team</v-chip>
          </a>
        </v-col>
      </v-row>
    </v-container>
    <div class="title d-flex justify-content-center align-items-center" >
      <img :src="CityHackLogo" alt="" width=60px/> <router-link class='pl-3' to="/">#CityHack 2021</router-link>
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
<!--      <b-nav-item>Resources</b-nav-item>-->
<!--      <b-nav-item-dropdown v-if="isLoggedIn">-->
<!--        <template #button-content>-->
<!--          <em>Hello {{ currentUserName }}</em>-->
<!--        </template>-->
<!--        <b-dropdown-item @click="logOut">Log Out</b-dropdown-item>-->
<!--        <b-dropdown-item>-->
<!--          <router-link to="/login">Switch Account</router-link>-->
<!--        </b-dropdown-item>-->
<!--      </b-nav-item-dropdown>-->
<!--      <b-nav-item-dropdown v-else>-->
<!--        <template #button-content>-->
<!--          <em>Log In</em>-->
<!--        </template>-->
<!--        <b-dropdown-item>-->
<!--          <router-link to="/login">Log In</router-link>-->
<!--        </b-dropdown-item>-->
<!--        <b-dropdown-item>-->
<!--          <router-link to="/register">Register</router-link>-->
<!--        </b-dropdown-item>-->
<!--      </b-nav-item-dropdown>-->
    </b-nav>
  </div>
</template>

<script>

import CityHackLogo from "../assets/logo/city_hack_logo.png";
  import { mapMutations, mapGetters, mapActions } from 'vuex';

  export default {
    name: 'navBar',
    data() {
      return {
        CityHackLogo
      }
    },
    computed: {
      isOverviewPage() { return this.$route.name === 'overview'; } ,
      ...mapGetters('auth', ['isLoggedIn', 'currentUserName']),
    },
    methods: {
      ...mapActions('auth', ['logOutUser']),
      ...mapMutations('menu', ['toggleDrawer']),
      logOut() {
        localStorage.removeItem('jwt');
        this.logOutUser();
        this.$router.push('/');
      },
    },
  };
</script>

<style scoped>
  .theme--dark{
      background: #222 !important;
  }
  a {
    text-decoration: none;
    color: black;
  }

  .navBarNav {
    height: 36px;
  }

  .nav-link {
    height: 24px;
    /* padding: 0px; */
    display: flex;
    align-items: center;
  }
  /* .nav-item .nav-link, .nav-link {
padding: 0px;;
  } */

  .iconLink {
    /* margin: 1rem 0 2rem 0; */
  }

  .navigation {
    /* height: 20vh; */
    text-align: center;
    position: relative;
    z-index: 6;
    background: white;
    box-shadow: -1px 2px 8px 3px rgba(158,158,158,0.55);
  }

  .title {
    font-size: 40px;
    font-weight: bold;
  }
</style>
