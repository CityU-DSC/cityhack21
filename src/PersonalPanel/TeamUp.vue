<template>
  <v-container style="padding: 30px;">
    <nav-drawer @direct="directTo" :current="pathName"/>
    <v-col class="ml-3">
      <v-row class="mr-3">
        <p>This is the team up page for CityHack21</p>
        <v-spacer/>
      </v-row>
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
          <search-teams />
        </v-tab-item>

        <!-- Search Members-->
        <v-tab-item>
          <search-members/>
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-container>
</template>

<script>
import navDrawer from "@/PersonalPanel/components/navDrawer";
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
  }),
  computed: {
  },
  methods: {
    directTo(page) {
      this.$router.push(page);
    },
  },
}
</script>

<style scoped>

</style>
