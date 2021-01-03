<template>
  <v-container style="padding: 30px;">
    <nav-drawer @direct="directTo" :current="pathName"/>
    <v-col class="ml-3">
      <v-row class="mr-3">
        <p>This is the team up page for CityHack21</p>
        <v-spacer/>
        <v-btn outlined color="#ff9900" @click="show = !show">
          Create Team
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-row>
      <v-expand-transition>
        <v-card v-show="show" shaped elevation="12" class="mr-4 mt-5 mb-3">
          <v-form ref="createTeamForm" v-model="valid">
            <v-card-text>
              <v-row class="ml-2 mb-2">
                <v-text-field
                    v-model="newTeam.name"
                    label="Team Name"
                    class="mr-5"
                    required
                    :rules="[v => !!v || 'Name is required']"
                    clearable
                ></v-text-field>
                <div class="ml-5 subtitle-1">Team Leader:</div>
                <h3 class="ml-3 mr-2">{{ currentUser.accountId }}</h3>
              </v-row>
              <v-row class="ml-2 mb-2">
                <v-textarea
                    v-model="newTeam.description"
                    label="Team Description"
                    class="mr-3"
                    clearable
                    requireds
                    :rules="[v => !!v || 'Description is required']"
                    counter
                ></v-textarea>
              </v-row>
              <v-row class="ml-2 mt-3">
                <div class="subtitle-1">Team Detail</div>
              </v-row>
              <v-row class="ml-2">
                <v-switch
                    class="mr-3"
                    color="#a64942"
                    v-model="newTeam.needPhysicalSpace"
                    label="Need Physical Space?"
                ></v-switch>
                <v-switch
                    class="mr-3"
                    color="#a64942"
                    v-model="newTeam.private"
                    label="Private ?"
                ></v-switch>
              </v-row>


            </v-card-text>
            <v-card-subtitle class="ml-2">Selected Topic</v-card-subtitle>
            <v-card-text>
              <v-radio-group
                  v-model="newTeam.topic"
                  row
                  :rules="[v => !!v || 'Topic is required']"
              >
                <v-radio
                    color="#a64942"

                    v-for="topic in topics"
                    :key="topic.id"
                    :label="topic"
                    :value="topic"
                ></v-radio>
              </v-radio-group>
            </v-card-text>
          </v-form>
          <v-card-actions>
            <v-row>
              <v-spacer/>
              <v-btn class="mr-3" @click="createTeam" outlined color="#ff9900">Creat Team</v-btn>
              <v-btn class="mr-3" @click="resetCreateForm" outlined color="#a64942">Reset All</v-btn>
            </v-row>

          </v-card-actions>
        </v-card>
      </v-expand-transition>
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
          <search-members/>
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
    topics: ["Atlas", "SageMaker", "Others"],

    show: false,
    newTeam: {
      name: null,
      leader: null,
      description: null,
      needPhysicalSpace: false,
      private: false,
      topic: "Others",
      members: [],
    },
    valid: false,

    teams: [
      {
        name: "Team1",
        leader: "Ryanyen2",
        description: "this is testing team",
        topic: "Atlas",
        needPhysicalSpace: true,
        private: true,
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
        private: false,
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
        topic: "Others",
        needPhysicalSpace: false,
        private: false,
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
    resetCreateForm(){
      this.$refs.createTeamForm.reset();
    },
    createTeam(){
      if(this.$refs.createTeamForm.validate()){
        this.newTeam.leader = this.currentUser.accountId;
        this.newTeam.members = this.newTeam.members.concat(this.currentUser);
        this.teams = this.teams.concat(this.newTeam);
        console.log(this.teams);
      }
    }
  }
}
</script>

<style scoped>

</style>
