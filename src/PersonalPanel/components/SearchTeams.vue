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
          <v-btn outlined color="#ff9900" class="mr-3" @click="searchTeams">Search</v-btn>
          <v-btn outlined color="#a64942" class="mr-3" @click="resetTeamSearchFrom">Reset</v-btn>
        </v-row>
      </v-col>

      <v-col>
        <v-expansion-panels>
          <v-expansion-panel v-for="team in filteredTeams" :key="team.name">
            <v-expansion-panel-header v-bind:class="{inTeam: checkUserinTeam(team.name)}">
              <template v-slot:default="{ open }">
                <v-row no-gutters>
                  <v-col cols="4">
                    <span v-if="open" key="0">Team Info</span>
                    <span v-else key="1">{{ team.name }}</span>
                  </v-col>
                  <v-col cols="8" class="text--secondary">
                    <v-fade-transition leave-absolute>
                      <span v-if="open" key="0" style="margin-left: 14rem;">Members List</span>
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
              <v-row class="mt-3">
                <v-card
                    v-if="editMode !== team.name"
                    class="mr-5"
                    max-width="524"
                    outlined
                    min-width="300"
                >
                  <v-img height="50"
                         src="https://firebasestorage.googleapis.com/v0/b/cityhack21-6404b.appspot.com/o/registration_material%2F1.jpg?alt=media&token=183fac76-6f53-4ca6-88f1-7bf080067780"></v-img>
                  <v-card-title>{{ team.name }}</v-card-title>

                  <v-card-text>
                    <v-row class="ml-2 mb-2">
                      <div class="subtitle-1">Team Leader:</div>
                      <h3 class="ml-3">{{ team.leader }}</h3>
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
                  </v-card-text>
                  <v-card-subtitle class="ml-2">Selected Topic</v-card-subtitle>
                  <v-card-text>
                    <v-chip-group>
                      <v-chip
                          v-for="topic in topics"
                          :key="topic.id"
                          :color="team.topic === topic? '#a64942' : null"
                      >
                        {{ topic }}
                      </v-chip>
                    </v-chip-group>
                  </v-card-text>
                  <v-divider class="mx-4"></v-divider>
                  <v-card-actions>
                    <v-row class="mr-3 mt-2">
                      <v-spacer/>
                      <v-btn color="#ff9900" @click="editTeam(team)">Edit</v-btn>
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
                  <v-img height="50"
                         src="https://firebasestorage.googleapis.com/v0/b/cityhack21-6404b.appspot.com/o/registration_material%2F1.jpg?alt=media&token=183fac76-6f53-4ca6-88f1-7bf080067780"></v-img>
                  <v-form>
                    <v-card-title>
                      <v-text-field
                          v-model="editInfo.name"
                          label="Team Name"
                          :rules="[v => !!v || 'Name is required']"
                          class="mr-3"
                          clearable
                      ></v-text-field>
                    </v-card-title>

                    <v-card-text>
                      <v-row class="ml-2 mb-2">
                        <v-select
                            :items="editInfo.members"
                            v-model="editInfo.leader"
                            item-text="name"
                            label="Team Leader"
                            class="mr-3"
                        ></v-select>
                      </v-row>
                      <v-row class="ml-2 mb-2">
                        <v-textarea
                            v-model="editInfo.description"
                            label="Team Description"
                            :rules="[v => !!v || 'Description is required']"
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
                    <v-card-subtitle class="ml-2">Selected Topic</v-card-subtitle>
                    <v-card-text>
                      <v-radio-group
                          v-model="editInfo.topic"
                          row
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
                  <v-divider class="mx-4"></v-divider>
                  <v-card-actions>
                    <v-row class="mr-3 mt-2">
                      <v-spacer/>
                      <v-btn color="purple darken-2" @click="saveEdit">Save</v-btn>
                    </v-row>
                  </v-card-actions>
                </v-card>
                <v-list rounded>
                  <v-list-item-group v-model="selectedMember" color="grey">
                    <v-list-item v-for="member in team.members" :key="member.id"
                                 :color="team.leader === member.name? '#a64942': null"
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
              </v-row>
              <v-row>
                <v-spacer/>
                <v-btn :disabled="team.members.length === 5" color="indigo">Join</v-btn>
                <v-btn :disabled="!checkUserinTeam(team.name)" color="warning" class="ml-3">Leave</v-btn>
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
import {mapGetters} from "vuex";
import ProfileDetail from "@/PersonalPanel/components/ProfileDetail";

export default {
  name: "searchTeams",
  components: {
    ProfileDetail,
  },
  props: {
    teams: Array,
  },
  data() {
    return {
      selectedMember: 0,
      selectedProfile: null,
      openProfile: false,
      topics: ["Atlas", "SageMaker", "Others"],
      filteredTeams: [],

      //search
      searchTeamName: null,
      searchLeader: null,
      usingAtlasTeam: true,
      usingSageMakerTeam: true,

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
    }
  },
  watch: {
    teams(val) {
      console.log("Hello", val);
      this.filteredTeams = val;

    }
  },
  computed: {
    ...mapGetters('auth', ['currentUser']),
  },
  methods: {
    checkUserinTeam(name) {
      if (this.currentUser) {
        let team = this.filteredTeams.filter(team => team.name === name);
        return team[0].members.some(member => member.name === this.currentUser.nickName);
      }
    },
    openProfileDetail(member) {
      this.selectedProfile = member;
      this.openProfile = true;
    },
    searchTeams() {
      if (this.searchTeamName || this.searchLeader) {
        if (this.searchTeamName && this.searchLeader) {
          this.filteredTeams = this.filteredTeams.filter(team => {
            this.searchTeamName.toLowerCase().split(' ').every(v => team.name.toLowerCase().includes(v))
            && this.searchLeader.toLowerCase().split(' ').every(v => team.leader.toLowerCase().includes(v))
          })
        } else if (this.searchLeader) {
          this.filteredTeams = this.filteredTeams.filter(team => this.searchLeader.toLowerCase().split(' ').every(v => team.leader.toLowerCase().includes(v)));
        } else {
          this.filteredTeams = this.filteredTeams.filter(team => this.searchTeamName.toLowerCase().split(' ').every(v => team.name.toLowerCase().includes(v)));
        }
      }
    },
    resetTeamSearchFrom() {
      this.filteredTeams = this.teams;
      this.$refs.teamSearch.reset()
    },
    editTeam(team) {
      this.editMode = team.name;
      this.editInfo = {...team};
      console.log(this.editInfo);
    },
    saveEdit() {
      console.log(this.editInfo);
      this.editMode = null;
    }
  },
  mounted() {
    this.filteredTeams = this.teams;
  }
}
</script>

<style scoped>
.inTeam {
  background: linear-gradient(90deg, rgba(255, 153, 0, 1) 0%, rgba(176, 121, 38, 1) 22%, rgba(113, 77, 21, 1) 49%, rgba(30, 30, 30, 1) 100%);
}
</style>
