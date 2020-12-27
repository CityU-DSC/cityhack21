<template>
  <v-container style="padding: 30px;">
    <v-col>
      <p>This is the team up function for CityHack21</p>
    </v-col>
    <nav-drawer @direct="directTo" :current="pathName"/>
    <v-expansion-panels>
      <v-expansion-panel v-for="team in teams" :key="team.name">
        <v-expansion-panel-header v-bind:class="{inTeam: checkUserinTeam(team.name)}">
          <template v-slot:default="{ open }">
            <v-row no-gutters>
              <v-col cols="4">
                {{ team.name }}
              </v-col>
              <v-col
                  cols="8"
                  class="text--secondary"
              >
                <v-fade-transition leave-absolute>
                <span
                    v-if="open"
                    key="0"
                >
                  Manage Your group
                </span>
                  <span v-else key="1">
                    <v-row>
                      <v-chip
                          v-for="member in team.members" :key="member.id"
                          class="mr-2"
                          :color="team.leader === member.name? 'black':null"
                      >
                        <v-avatar left v-if="team.leader === member.name"><v-icon>mdi-flag-variant</v-icon></v-avatar>
                        <v-avatar left>
                          <v-img :src="member.avatar"></v-img>
                        </v-avatar>
                          {{ member.name }}
                        </v-chip>
                    </v-row>
                </span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list rounded>
            <v-list-item-group
                v-model="selectedMember"
                color="grey"
            >
              <v-list-item v-for="member in team.members" :key="member.id"
                           :color="team.leader === member.name? '#ff9900': null"
                           @click="openProfileDetail(member)"
              >
                <v-list-item-avatar>
                  <v-img :src="member.avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-icon v-if="team.leader === member.name" class="mr-2">
                  <v-icon>mdi-flag-variant</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="member.name"></v-list-item-title>
                  <v-list-item-subtitle v-html="member.email"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-row>
            <v-spacer/>
            <v-btn :disabled="team.members.length === 5" color="indigo">Join</v-btn>
            <v-btn :disabled="!checkUserinTeam(team.name)" color="warning" class="ml-3">Leave</v-btn>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <ProfileDetail v-model="openProfile" :profileDetail="selectedProfile"/>
  </v-container>
</template>

<script>
import navDrawer from "@/PersonalPanel/components/navDrawer";
import {mapGetters} from "vuex";
import ProfileDetail from "@/PersonalPanel/components/ProfileDetail";

export default {
  name: "TeamUp",
  components: {
    navDrawer,
    ProfileDetail,
  },
  data: () => ({
    date: null,
    pathName: "Team Up",
    selectedMember: 0,
    selectedProfile: null,
    openProfile: false,
    teams: [
      {
        name: "Team1",
        leader: "Ryanyen2",
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
    checkUserinTeam(name) {
      if (this.currentUser) {
        let team = this.teams.filter(team => team.name === name);
        return team[0].members.some(member => member.name === this.currentUser.nickName);
      }
    },
    openProfileDetail(member){
      this.selectedProfile = member;
      this.openProfile = true;
    }
  }
}
</script>

<style scoped>
.inTeam {
  background: linear-gradient(90deg, rgba(255,153,0,1) 0%, rgba(176,121,38,1) 22%, rgba(113,77,21,1) 49%, rgba(30,30,30,1) 100%);
}
</style>
