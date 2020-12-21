<template>
  <div class="navigation" v-if="!isPersonalPage">
    <v-container class="pb-0" >
      <v-row class="iconLink mt-md-3 mb-md-3 mx-0 mb-1 mt-1">
        <v-col class="d-flex p-0">
          <v-icon class="mr-2">mdi-instagram</v-icon>
          <v-icon class="mr-2">mdi-facebook</v-icon>
          <v-spacer />
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
    <div class="d-flex justify-center">
      <img :src="CityHackLogo" style="max-width: 60px; max-height: 60px;" alt="cityHack-logo"/>
      <router-link class="pl-3 d-none d-md-block" to="/" style="font-size: 40px; font-weight: bold;">#CityHack 20<span style="color:#ff9900;">21</span></router-link>
      <router-link class="d-md-none pl-3" to="/" style="font-size: 25px; font-weight: bold;">#CityHack 20<span style="color:#ff9900;">21</span></router-link>
    </div>
    <v-row align="center" no-gutters>
      <v-spacer></v-spacer>
      <v-col cols="4" lg="1">
        <v-app-bar-nav-icon
          v-if="isOverviewPage"
          class="overviewNavButton d-md-none"
          @click.stop="setDrawer(true)"
          width
        ></v-app-bar-nav-icon>
        <router-link to="/overview">Overview</router-link>
      </v-col>
      <v-col cols="3" lg="1"><router-link to="/personal">Personal</router-link></v-col>
      <v-col v-if="isLoggedIn" cols="3" lg="1">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on"> Hello {{ currentUserName }} </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title @click="logOut">Log Out</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title><router-link to="/admin">Admin Panel</router-link></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-col v-else cols="3" lg="1">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on"> Register </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title><router-link to="/login">Log In</router-link></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title><router-link to="/register">Register</router-link></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-spacer />
    </v-row>
  </div>
</template>

<script>
import CityHackLogo from "../assets/logo/logo_w.png";
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "navBar",
  data() {
    return {
      CityHackLogo,
    };
  },
  computed: {
    isOverviewPage() {
      return this.$route.name === "overview";
    },
    isPersonalPage() {
      return this.$route.name.includes('personal');
    },
    ...mapGetters("auth", ["isLoggedIn", "currentUserName"]),
  },
  methods: {
    ...mapActions("auth", ["logOutUser"]),
    ...mapMutations("menu", ["setDrawer"]),
    logOut() {
      localStorage.removeItem("jwt");
      this.logOutUser();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.theme--dark {
  background: #222 !important;
}

#app a {
  text-decoration: none;
  color: #ffffff;
}
#app a:hover {
  color: #ff9900;
  text-decoration: none;
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

a:hover {
  color: #ff9900;
  text-decoration: none;
}

.navigation {
  /* height: 20vh; */
  text-align: center;
  position: relative;
  z-index: 6;
  background: #121212;
}
</style>
