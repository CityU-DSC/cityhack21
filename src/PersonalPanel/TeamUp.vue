<template>
  <v-container style="padding: 30px;">
    <nav-drawer @direct="directTo" :current="pathName"/>
    <v-col>
      <p>This is the team up function for CityHack21</p>
    </v-col>
    <v-col>
      <v-tabs color="#ff9900">
        <v-tabs-slider></v-tabs-slider>
        <v-tab>
          <v-icon left>mdi-account-multiple-plus-outline</v-icon>
          Search Teams
        </v-tab>
        <v-tab>
          <v-icon left>mdi-account-search-outline</v-icon>
          Search Members
        </v-tab>

        <!--Search Teams-->
        <v-tab-item>
          <search-teams :teams="teams"/>
        </v-tab-item>

        <!-- Search Members-->
        <v-tab-item>
          <search-members />
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-container>
</template>

<script>
import navDrawer from "@/PersonalPanel/components/navDrawer";
import {mapGetters} from "vuex";
import SearchTeams from "@/PersonalPanel/components/SearchTeams";
import SearchMembers from "@/PersonalPanel/components/SearchMembers";

export default {
  name: "TeamUp",
  components: {
    navDrawer,
    SearchTeams,
    SearchMembers,
  },
  data: () => ({
    date: null,
    pathName: "Team Up",
    teams: [
      {
        name: "Team1",
        leader: "Ryanyen2",
        description: "this is testing team",
        topic: "Atlas",
        needPhysicalSpace: true,
        privateGroup: true,
        members: [
          {name: "Ryanyen2", email: "ryanyen89@gmail.com", avatar: "https://cdn.vuetifyjs.com/images/john.png"},
          {name: "Ruby", email: "rubbb@gmail.com", avatar: "https://cdn.vuetifyjs.com/images/john.png"},
          {name: "Eugene", email: "eugenelow@gmail.com", avatar: "https://cdn.vuetifyjs.com/images/john.png"},
          {name: "Michelle", email: "michellle@gmail.com", avatar: "https://cdn.vuetifyjs.com/images/john.png"},
        ],
      },
      {
        name: "Team2",
        leader: "Ruby",
        description: "this is testing team",
        topic: "SageMaker",
        needPhysicalSpace: false,
        privateGroup: false,
        members: [
          {name: "Ruby", email: "ryanyen89@gmail.com", avatar: "https://cdn.vuetifyjs.com/images/john.png"},
          {name: "Ryanyen", email: "rubbb@gmail.com", avatar: "https://cdn.vuetifyjs.com/images/john.png"},
          {name: "Eugene", email: "eugenelow@gmail.com", avatar: "https://cdn.vuetifyjs.com/images/john.png"},
          {name: "Michelle", email: "michellle@gmail.com", avatar: "https://cdn.vuetifyjs.com/images/john.png"},
          {name: "asdasd", email: "xavier@gmail.com", avatar: "https://cdn.vuetifyjs.com/images/john.png"},
        ],
      },
      {
        name: "Team3",
        leader: "Ruby",
        description: "this is testing team pofk o4kpo4k rpo4k po4kr 4prk 4pork4pr ok4po4 krp4okrp4rk4pork4prok4 rpo4krp4o k4pork",
        topic: "Atlas",
        needPhysicalSpace: false,
        privateGroup: false,
        members: [
          {name: "Ruby", email: "ryanyen89@gmail.com", avatar: "https://cdn.vuetifyjs.com/images/john.png"},
          {name: "Ryanyen", email: "rubbb@gmail.com", avatar: "https://cdn.vuetifyjs.com/images/john.png"},
          {name: "Eugene", email: "eugenelow@gmail.com", avatar: "https://cdn.vuetifyjs.com/images/john.png"},
          {name: "Michelle", email: "michellle@gmail.com", avatar: "https://cdn.vuetifyjs.com/images/john.png"},
        ],
      },
    ],
  }),
  computed: {
    ...mapGetters('auth', ['currentUser']),
  },
  methods: {
    directTo(page) {
      this.$router.push(page);
    },
  }
}
</script>

<style scoped>

</style>
