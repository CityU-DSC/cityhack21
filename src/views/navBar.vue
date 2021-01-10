<template>
  <div class="navigation" v-if="!isPersonalPage">
    <v-container class="pb-0">
      <v-row class="iconLink mt-md-3 mb-md-3 mx-0 mb-1 mt-1">
        <v-col class="d-flex p-0">
          <a href="https://www.instagram.com/cityhack21/" target="_blank"><v-icon class="mr-2">mdi-instagram</v-icon></a>
          <a href="https://discord.com/channels/779277242567229500/779277244081111040" target="_blank"><v-icon class="mr-2">mdi-discord</v-icon></a>
          <v-spacer></v-spacer>
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
    <div class="d-flex justify-center align-center">
      <img :src="CityHackLogo" style="max-width: 80px; max-height: 80px;" alt="cityHack-logo"/>
      <router-link class="pl-3 d-none d-md-block" to="/" style="font-size: 40px; font-weight: bold;">#CityHack 20<span
          style="color:#ff9900;">21</span></router-link>
      <router-link class="d-md-none pl-3" to="/" style="font-size: 25px; font-weight: bold;">#CityHack 20<span
          style="color:#ff9900;">21</span></router-link>
    </div>
    <v-app-bar class="appBar" elevation="0" flat justify="center" no-gutters dense>
      <v-spacer/>
      <v-app-bar-nav-icon
          v-if="isOverviewPage"
          class="overviewNavButton d-md-none"
          @click.stop="setDrawer(true)"
          width
      ></v-app-bar-nav-icon>
      <v-btn text><router-link to="/overview">Overview</router-link></v-btn>
      <v-btn text><router-link v-if="isLoggedIn" to="/personal">Personal</router-link></v-btn>
      <v-menu offset-y v-if="isLoggedIn" cols="3" lg="1">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">{{ currentUserName }}</v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title @click="logOut">Log Out</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="directToAdmin">Admin Panel</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <div v-else>
        <v-btn text><router-link to="/login">Log In</router-link></v-btn>
        <v-btn text><router-link to="/register">Register</router-link></v-btn>
      </div>
      <v-spacer/>
    </v-app-bar>
  </div>
</template>

<script>
import CityHackLogo from "../assets/logo/logo_w.png";
import {mapMutations, mapGetters, mapActions} from "vuex";

export default {
  name: "navBar",
  data() {
    return {
      CityHackLogo,
    };
  },
  computed: {
    ...mapGetters('adminList', ['adminList']),
    isOverviewPage() {
      return this.$route.name === "overview";
    },
    isPersonalPage() {
      return this.$route.name.includes('personal');
    },
    ...mapGetters("auth", ["isLoggedIn", "currentUserName", "currentUser"]),
  },
  methods: {
    ...mapActions("auth", ["logOutUser", "me", "init"]),
    ...mapMutations("menu", ["setDrawer"]),
    logOut() {
      localStorage.removeItem("jwt");
      this.logOutUser();
      this.$router.push("/");
    },
    directToAdmin() {
      this.adminList.includes(this.currentUser.email) ? this.$router.push("/admin") : this.$router.push("/");
    }
  },
  async mounted() {
    await this.init();
  }
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
#app > div.v-application--wrap > div.navigation > header {
  background: #121212 !important;
}
#app > div.v-application--wrap > div.navigation > header > div > div:nth-child(4) > button {
  background: #121212 !important;
}

#app > div.v-application--wrap > div.navigation > header > div > button {
  background: #121212 !important;
}
</style>
