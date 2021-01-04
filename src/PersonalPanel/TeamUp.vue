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
              <v-btn class="mr-3" @click="createTeamHandler" outlined color="#ff9900">Creat Team</v-btn>
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
import {mapGetters, mapActions} from "vuex";
import SearchTeams from "@/PersonalPanel/components/SearchTeams";
import SearchMembers from "@/PersonalPanel/components/SearchMembers";
//import actions from "../store/modules/teams"

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

    teams: [],
  }),
  computed: {
    ...mapGetters('auth', ['currentUser']),
  },
  methods: {
    ...mapActions('teams',['createTeam', 'listAllTeams',"toogleTeamPrivate", 'myTeam',
                  'getTeamCode']),
    directTo(page) {
      this.$router.push(page);
    },
    resetCreateForm(){
      this.$refs.createTeamForm.reset();
    },
    async createTeamHandler(){
      if(this.$refs.createTeamForm.validate()){
        this.newTeam.leader = this.currentUser.accountId;
        this.newTeam.members = this.newTeam.members.concat(this.currentUser);
        await this.createTeam(this.newTeam).then(res => console.log(res));
        this.teams = this.teams.concat(this.newTeam);
        if(this.newTeam.private){
          await this.toogleTeamPrivate();
          await this.getTeamCode().then(res=> console.log("TEAM", res));
        }
      }
    }
  },
  async mounted(){
    await this.listAllTeams().then(res => this.teams = res).catch(err => console.error(err));
    await this.myTeam().catch(err => console.error(err));
  }
}
</script>

<style scoped>

</style>
