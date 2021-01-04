<template>
  <div>
    <v-card flat>
      <v-card-text> Search Teams</v-card-text>
      <v-col>
        <v-form ref="teamSearch">
          <v-row class="mx-1">
            <v-text-field
                v-model="searchTeamName"
                label="Team Name"
                class="mr-5"
                outlined
                clearable
            ></v-text-field>
            <v-text-field
                v-model="searchLeader"
                label="Team Leader"
                outlined
                clearable
            ></v-text-field>
          </v-row>
        </v-form>
        <v-row class="mx-1">
          <v-switch
              class="mr-3"
              color="#53354a"
              v-model="usingAtlasTeam"
              label="Using Atlas?"
          ></v-switch>
          <v-switch
              color="#53354a"
              v-model="usingSageMakerTeam"
              label="Using SageMaker?"
          ></v-switch>
          <v-spacer/>
          <v-btn outlined color="#ff9900" @click="show = !show" class="mt-3">
            Create Team
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-row>
        <v-row>
          <v-spacer/>
          <v-btn outlined color="green" class="mr-3" @click="searchTeams">Search</v-btn>
          <v-btn
              outlined
              color="#a64942"
              class="mr-3"
              @click="resetTeamSearchFrom"
          >Reset
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
        <v-expansion-panels>
          <v-expansion-panel v-for="team in filteredTeams" :key="team.name">
            <v-expansion-panel-header v-if='team.show'
                                      v-bind:class="{ inTeam: checkUserinTeam(team.name) }"
            >
              <template v-slot:default="{ open }">
                <v-row no-gutters>
                  <v-col cols="4">
                    <span v-if="open" key="0">Team Info</span>
                    <span v-else key="1">{{ team.name }}</span>
                  </v-col>
                  <v-col cols="8" class="text--secondary">
                    <v-fade-transition leave-absolute>
                      <span v-if="open" key="0" style="margin-left: 14rem"
                      >Members List</span
                      >
                      <span v-else key="1">
                        <v-row>
                          <v-chip
                              v-for="member in team.members"
                              :key="member.id"
                              class="mr-2"
                              :color="
                              team.leader.firstName + team.leader.lastName ===
                              member.firstName + member.lastName
                                ? 'black'
                                : null
                            "
                          >
                            <v-avatar
                                left
                                v-if="team.leader.firstName === member.firstName"
                            ><v-icon>mdi-flag-variant</v-icon></v-avatar
                            >
                            <v-avatar left>
                              <v-img :src="member.avatarUrl"></v-img>
                            </v-avatar>
                            {{ member.firstName + " " + member.lastName }}
                          </v-chip>
                        </v-row>
                      </span>
                    </v-fade-transition>
                  </v-col>
                </v-row>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content v-if='team.show'>
              <v-row class="mt-3">
                <v-card
                    v-if="editMode !== team.name"
                    class="mr-5"
                    max-width="524"
                    outlined
                    min-width="300"
                >

                  <v-img
                      height="50"
                      src="https://firebasestorage.googleapis.com/v0/b/cityhack21-6404b.appspot.com/o/registration_material%2F1.jpg?alt=media&token=183fac76-6f53-4ca6-88f1-7bf080067780"
                  ></v-img>
                  <v-card-title>{{ team.name }}</v-card-title>

                  <v-card-text>
                    <v-row class="ml-2 mb-2">
                      <div class="subtitle-1">Team Leader:</div>
                      <h3 class="ml-3">{{ team.leader.accountId }}</h3>
                    </v-row>
                    <v-row class="ml-2 mb-2">
                      <div class="subtitle-1">Team Description</div>
                    </v-row>
                    <v-row class="ml-2 mb-2">
                      <h5>{{ team.description }}</h5>
                    </v-row>
                    <v-row class="ml-2 mt-3">
                      <div class="subtitle-1">Team Detail</div>
                    </v-row>
                    <v-row class="ml-2">
                      <v-switch
                          class="mr-3"
                          color="#a64942"
                          disabled
                          v-model="team.needPhysicalSpace"
                          label="Need Physical Space?"
                      ></v-switch>
                      <v-switch
                          class="mr-3"
                          disabled
                          color="#a64942"
                          v-model="team.private"
                          label="Private ?"
                      ></v-switch>
                    </v-row>
                    <v-row class="ml-2 mt-3">
                      <div class="subtitle-1">Team Code</div>
                      <h5>{{ teamCode }}</h5>
                    </v-row>
                  </v-card-text>
                  <v-card-subtitle class="ml-2">Selected Topic</v-card-subtitle>
                  <v-card-text>
                    <v-chip-group>
                      <v-chip
                          v-for="topic in topics"
                          :key="topic.id"
                          :color="team.topic === topic ? '#a64942' : null"
                      >
                        {{ topic }}
                      </v-chip>
                    </v-chip-group>
                  </v-card-text>

                  <v-divider class="mx-4"></v-divider>
                  <v-card-actions>
                    <v-row class="mr-3 mt-2">
                      <v-spacer/>
                      <v-btn v-if="team.leader.accountId===currentUser.accountId" color="#ff9900"
                             @click="editTeamHandler(team)"
                      >Edit
                      </v-btn
                      >
                    </v-row>
                  </v-card-actions>
                </v-card>
                <!--                EDIT GROUP-->
                <v-card
                    v-else
                    class="mr-5"
                    max-width="524"
                    outlined
                    min-width="300"
                >
                  <v-img
                      height="50"
                      src="https://firebasestorage.googleapis.com/v0/b/cityhack21-6404b.appspot.com/o/registration_material%2F1.jpg?alt=media&token=183fac76-6f53-4ca6-88f1-7bf080067780"
                  ></v-img>
                  <v-form>
                    <v-card-title>
                      <v-text-field
                          v-model="editInfo.name"
                          label="Team Name"
                          :rules="[(v) => !!v || 'Name is required']"
                          class="mr-3"
                          clearable
                      ></v-text-field>
                    </v-card-title>

                    <v-card-text>
                      <v-row class="ml-2 mb-2">
                        <v-select
                            :items="editInfo.members"
                            v-model="editInfo.leader"
                            item-text="accountId"
                            label="Team Leader"
                            class="mr-3"
                        ></v-select>
                      </v-row>
                      <v-row class="ml-2 mb-2">
                        <v-textarea
                            v-model="editInfo.description"
                            label="Team Description"
                            :rules="[(v) => !!v || 'Description is required']"
                            class="mr-3"
                            clearable
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
                            v-model="editInfo.needPhysicalSpace"
                            label="Need Physical Space?"
                        ></v-switch>
                        <v-switch
                            class="mr-3"
                            color="#a64942"
                            v-model="editInfo.private"
                            label="Private ?"
                        ></v-switch>
                      </v-row>
                    </v-card-text>
                    <v-card-subtitle class="ml-2"
                    >Selected Topic
                    </v-card-subtitle
                    >
                    <v-card-text>
                      <v-radio-group v-model="editInfo.topic" row>
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
                  <v-divider class="mx-4"></v-divider>
                  <v-card-actions>
                    <v-row class="mr-3 mt-2">
                      <v-spacer/>
                      <v-btn color="purple darken-2" @click="saveEdit"
                      >Save
                      </v-btn
                      >
                    </v-row>
                  </v-card-actions>
                </v-card>
                <v-list rounded>
                  <v-list-item-group v-model="selectedMember" color="grey">
                    <v-list-item
                        v-for="member in team.members"
                        :key="member.id"
                        :color="team.leader === member.name ? '#a64942' : null"
                        @click="openProfileDetail(member)"
                    >
                      <v-list-item-avatar>
                        <v-img :src="member.avatarUrl"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-icon
                          v-if="
                          team.leader.firstName + team.leader.lastName ===
                          member.firstName + member.lastName
                        "
                          class="mr-2"
                      >
                        <v-icon>mdi-flag-variant</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title
                            v-text="member.firstName + ' ' + member.lastName"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                            v-html="member.email"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-row>
              <v-row>
                <v-spacer/>
                <v-btn
                    :disabled="team.members.length === 5"
                    color="indigo"
                    @click="joinTeamHandler(team)"
                >Join
                </v-btn
                >
                <v-btn
                    :disabled="!checkUserinTeam(team.name)"
                    color="warning"
                    class="ml-3"
                    @click="leaveTeamHandler"
                >Leave
                </v-btn>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-card>
    <ProfileDetail v-model="openProfile" :profileDetail="selectedProfile"/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ProfileDetail from "@/PersonalPanel/components/ProfileDetail";
import Swal from "sweetalert2";

export default {
  name: "searchTeams",
  components: {
    ProfileDetail,
  },
  data() {
    return {
      teams: [],

      selectedMember: 0,
      selectedProfile: null,
      openProfile: false,
      filteredTeams: [],

      //search
      searchTeamName: '',
      searchLeader: '',
      usingAtlasTeam: true,
      usingSageMakerTeam: true,

      //create
      valid: false,
      newTeam: {
        name: null,
        leader: null,
        description: null,
        needPhysicalSpace: false,
        private: false,
        topic: "Others",
        members: [],
      },
      topics: ["Atlas", "SageMaker", "Others"],
      show: false,

      // Edit
      editMode: null,
      editInfo: {
        name: null,
        leader: null,
        description: null,
        needPhysicalSpace: null,
        private: null,
        topic: null,
        members: null,
      },
      teamCode: null,
    };
  },
  watch: {
    teams(val) {
      console.log("NEWVAL", val);
      this.filteredTeams = val;
      for (let filterT of this.filteredTeams) {
        if (!this.searchLeader && !this.searchTeamName) {
          filterT.show = true;
        }
      }
      this.getTeamCode().then((res) => (this.teamCode = res));
    },
  },
  computed: {
    ...mapGetters("auth", ["currentUser"]),
    ...mapGetters("teams", ["currentTeam"]),
  },
  methods: {
    ...mapActions("teams", [
      "createTeam",
      "joinTeam",
      "leaveTeam",
      "editTeam", 'myTeam']),
    async createTeamHandler() {
      if (this.$refs.createTeamForm.validate()) {
        this.newTeam.leader = this.currentUser.accountId;
        this.newTeam.members = this.newTeam.members.concat(this.currentUser);
        await this.createTeam(this.newTeam).then(res => {
          console.log(res);
          Swal.fire("Success", "Create Team is successful", "success");
          this.show = !this.show;
          this.teams = this.teams.concat(this.newTeam);
          if (this.newTeam.private) {
            this.toogleTeamPrivate();
            this.getTeamCode().then(res => console.log("TEAM", res));
          }
        });
      }
    },
    resetCreateForm() {
      this.$refs.createTeamForm.reset();
    },
    leaveTeamHandler() {
      let cur = this.currentTeam;
      this.filteredTeams = this.filteredTeams.filter(team => team._id !== cur._id);
      this.leaveTeam().then(res => {
        console.log(res)
      });
    },
    async joinTeamHandler(team) {
      if (team.private) {
        const {value: inputTeamCode} = await Swal.fire({
          title: "Enter your team code",
          input: "text",
          inputLabel: "Team Code",
          inputPlaceholder: "team code...",
          inputValidator: (value) => {
            if (!value) {
              return "Empty Field Error";
            }
          },
        });
        if (inputTeamCode) {
          this.joinTeam({teamId: team._id, teamCode: inputTeamCode}).then(res => {
            console.log(res);
            Swal.fire("Success", "Join Team Was successful", "success");
          }).catch(err => {
            console.error(err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
        }
      } else {
        this.joinTeam({teamId: team._id}).then(res => {
          console.log(res);
          Swal.fire("Success", "Join Team Was successful", "success");
        }).catch(err => {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
      }
    },

    checkUserinTeam(name) {
      return this.currentTeam ? name === this.currentTeam.name : false;
    },
    openProfileDetail(member) {
      this.selectedProfile = member;
      this.openProfile = true;
    },
    searchTeams() {
      let tempSearchLeader = this.searchLeader.toLowerCase().split(' ');
      let tempSearchTeamName = this.searchTeamName.toLowerCase().split(' ');

      if (this.searchLeader === '') {
        tempSearchLeader = []
      }
      if (this.searchTeamName === '') {
        tempSearchTeamName = []
      }

      const topics = ['Others']
      if (this.usingAtlasTeam) {
        topics.push('Atlas')
      }
      if (this.usingSageMakerTeam) {
        topics.push('SageMake')
      }
      for (let i = 0; i < this.filteredTeams.length; i++) {
        console.log(this.searchTeamName)
        console.log(this.searchLeader);
        const filterT = this.filteredTeams[i];
        console.log(tempSearchLeader.every((v) => filterT.leader.accountId.toLowerCase().includes(v)))
        console.log(tempSearchTeamName.every((v) => filterT.name.toLowerCase().includes(v)))
        if (this.searchTeamName || this.searchLeader) {
          this.filteredTeams[i].show = (tempSearchLeader.every((v) => filterT.leader.accountId.toLowerCase().includes(v)) && tempSearchTeamName.every((v) => filterT.name.toLowerCase().includes(v))) && (topics.indexOf(filterT.topic) != -1);
        } else {
          this.filteredTeams[i].show = true;
        }

        console.log(filterT,)
      }
      console.log(this.filteredTeams);
    },
    resetTeamSearchFrom() {
      this.filteredTeams = this.teams;
      this.$refs.teamSearch.reset();
    },
    editTeamHandler(team) {
      this.editMode = team.name;
      this.editInfo = {...team};
    },
    saveEdit() {
      this.editMode = null;
      this.editTeam({
        name: this.editInfo.name,
        leader: this.editInfo.members.filter(x => x.accountId === this.editInfo.leader)[0],
        description: this.editInfo.description,
        needPhysicalSpace: this.editInfo.needPhysicalSpace,
        topic: null,
      });

    },
  },
  async mounted() {
    this.filteredTeams = this.teams;
    await this.getTeamCode().then((res) => (this.teamCode = res));
    await this.listAllTeams().then(res => this.teams = res).catch(err => console.error(err));
    await this.myTeam().catch(err => console.error(err));
  },
};
</script>

<style scoped>
.inTeam {
  background: linear-gradient(
      90deg,
      rgba(255, 153, 0, 1) 0%,
      rgba(176, 121, 38, 1) 22%,
      rgba(113, 77, 21, 1) 49%,
      rgba(30, 30, 30, 1) 100%
  );
}
</style>
