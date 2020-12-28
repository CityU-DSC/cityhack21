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


        <v-tab-item>
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
                <v-expansion-panel v-for="team in teams" :key="team.name">
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
                          class="mr-5"
                          max-width="524"
                          outlined
                          min-width="300"
                      >
                        <v-img height="50" src="https://firebasestorage.googleapis.com/v0/b/cityhack21-6404b.appspot.com/o/registration_material%2F1.jpg?alt=media&token=183fac76-6f53-4ca6-88f1-7bf080067780"></v-img>
                        <v-card-title>{{ team.name }}</v-card-title>

                        <v-card-text>
                          <v-row class="ml-2 mb-2">
                            <div class="subtitle-1">Team Leader: </div>
                            <h3 class="ml-3">{{team.leader}}</h3>
                          </v-row>
                          <v-row class="ml-2 mb-2">
                            <div class="subtitle-1">Team Description</div>
                          </v-row>
                          <v-row class="ml-2 mb-2">
                            <h5>{{team.description}}</h5>
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
                                v-model="team.privateGroup"
                                label="Private Group?"
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
                              {{topic}}
                            </v-chip>
                          </v-chip-group>
                        </v-card-text>
                        <v-divider class="mx-4"></v-divider>
                        <v-card-actions>
                          <v-row class="mr-3 mt-2">
                            <v-spacer />
                            <v-btn color="#ff9900">Edit</v-btn>
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
        </v-tab-item>

        <!--        SearchMembers-->
        <v-tab-item>
          <v-card flat>
            <v-card-text> Search Members</v-card-text>
            <v-col>
              <v-form ref="membersSearch">
                <v-row class="mx-1">
                  <v-text-field
                      v-model="searchMemberName"
                      label="Name"
                      class="mr-5"
                      clearable
                  ></v-text-field>
                  <v-text-field
                      v-model="searchMemberEmail"
                      label="Email"
                      clearable
                  ></v-text-field>
                </v-row>
                <v-row class="mx-1">
                  <v-autocomplete
                      multiple
                      small-chips
                      label="University"
                      v-model="searchMemberSchool"
                      :items="universities"
                      class="mr-2"
                      clearable
                  ></v-autocomplete>
                  <v-autocomplete
                      multiple
                      small-chips
                      label="Major/Programme"
                      v-model="searchMemberProgram"
                      :items="majors"
                      class="mr-2"
                      clearable
                  ></v-autocomplete>
                  <v-autocomplete
                      multiple
                      small-chips
                      label="Academic Year"
                      v-model="searchMemberYear"
                      clearable
                      :items="years"
                  ></v-autocomplete>
                </v-row>
              </v-form>
              <v-row>
                <v-spacer/>
                <v-btn outlined color="#ff9900" class="mr-3" @click="searchTeams">Search</v-btn>
                <v-btn outlined color="#a64942" class="mr-3" @click="resetTeamSearchFrom">Reset</v-btn>
              </v-row>
            </v-col>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-col>
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

    //team info
    topics: ["Atlas", "SageMaker", "AWS"],

    //search field
    searchTeamName: null,
    searchLeader: null,
    usingAtlasTeam: true,
    usingSageMakerTeam: true,

    searchMemberName: null,
    searchMemberEmail: null,
    searchMemberSchool: null,
    searchMemberYear: null,
    searchMemberProgram: null,
    universities: [
      "City University of Hong Kong",
      "Hong Kong Baptist University",
      "Chinese University of Hong Kong",
      "Hong Kong Polytechnic University",
      "Hong Kong University of Science and Technology",
      "University of Hong Kong",
      "Others"
    ],
    majors: [
      "Architecture",
      "Interior Architecture",
      "Landscape Architecture",
      "Art, General",
      "Art History, Criticism & Conservation",
      "Fine/Studio Arts",
      "Cinema/Film",
      "Dance",
      "Design & Visual Communications, General",
      "Graphic Design",
      "Industrial Design",
      "Interior Design",
      "Music, General",
      "Music, Theory & Composition",
      "Photography",
      "Accounting",
      "Business Administration & Management, General",
      "Hotel/Motel Management",
      "Human Resources Management",
      "International Business Management",
      "Logistics & Materials Management",
      "Marketing Management & Research",
      "Operations Management & Supervision",
      "Purchasing/Procurement/Contracts Management",
      "Travel/Tourism Management",
      "Business/Management Quantitative Methods, General",
      "Finance, General",
      "Insurance & Risk Management",
      "Investments & Securities",
      "Management Information Systems",
      "Sales, Merchandising, & Marketing, General",
      "Tourism & Travel Marketing",
      "Communications, General",
      "Advertising",
      "Digital Communications/Media",
      "Journalism, Broadcast",
      "Computer Networking/Telecommunications",
      "Computer Science & Programming",
      "Data Management Technology",
      "Mathematics, General",
      "Applied Mathematics",
      "Statistics",
      "Counseling & Student Services",
      "Educational Administration",
      "Teacher Education, General",
      "Aerospace/Aeronautical Engineering",
      "Agricultural/Bioengineering",
      "Architectural Engineering",
      "Biomedical Engineering",
      "Chemical Engineering",
      "Civil Engineering",
      "Computer Engineering",
      "Construction Engineering/Management",
      "Electrical, Electronics & Communications Engineering",
      "Environmental Health Engineering",
      "Industrial Engineering",
      "Mechanical Engineering",
      "Nuclear Engineering",
      "Biology, General",
      "Biochemistry & Biophysics",
      "Zoology",
      "Physical Sciences, General",
      "Astronomy",
      "Chemistry",
      "Geological & Earth Sciences",
      "Physics",
      "Law",
      "History",
      "Social Sciences",
      "Sociology",
      "Philosophy",
      "Chiropractic (Pre-Chiropractic)",
      "Dental Hygiene",
      "Dentistry (Pre-Dentistry)",
      "Emergency Medical Technology",
      "Health-Related Professions & Services, General*",
      "Athletic Training",
      "Communication Disorder Services (e.g., Speech Pathology)",
      "Public Health",
      "Health/Medical Technology, General",
      "Medical Laboratory Technology",
      "Medical Radiologic Technology",
      "Nuclear Medicine Technology",
      "Respiratory Therapy Technology",
      "Surgical Technology",
      "Medicine (Pre-Medicine)",
      "Nursing, Practical/Vocational (LPN)",
      "Nursing, Registered (BS/RN)",
      "Optometry (Pre-Optometry)",
      "Osteopathic Medicine",
      "Pharmacy (Pre-Pharmacy)",
      "Physician Assisting",
      "Therapy & Rehabilitation, General",
      "Alcohol/Drug Abuse Counseling",
      "Massage Therapy",
      "Mental Health Counseling",
      "Occupational Therapy",
      "Physical Therapy (Pre-Physical Therapy)",
      "Psychiatric/Mental Health Technician",
      "Rehabilitation Therapy",
      "Vocational Rehabilitation Counseling",
    ],
    years: ["Year 1", "Year 2", "Year 3", "Year 4", "> Year 4", "Graduated", "Postgrad"],
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
    openProfileDetail(member) {
      this.selectedProfile = member;
      this.openProfile = true;
    },
    searchTeams() {
      if (this.searchTeamName || this.searchLeader) {
        if (this.searchTeamName && this.searchLeader) {
          this.teams = this.teams.filter(team => {
            this.searchTeamName.toLowerCase().split(' ').every(v => team.name.toLowerCase().includes(v))
            && this.searchLeader.toLowerCase().split(' ').every(v => team.leader.toLowerCase().includes(v))
          })
        } else if (this.searchLeader) {
          this.teams = this.teams.filter(team => this.searchLeader.toLowerCase().split(' ').every(v => team.leader.toLowerCase().includes(v)));
        } else {
          this.teams = this.teams.filter(team => this.searchTeamName.toLowerCase().split(' ').every(v => team.name.toLowerCase().includes(v)));
        }
      }
    },
    resetTeamSearchFrom() {
      Object.assign(this.$data.teams, this.$options.data().teams);
      this.$refs.teamSearch.reset()
    }
  }
}
</script>

<style scoped>
.inTeam {
  background: linear-gradient(90deg, rgba(255, 153, 0, 1) 0%, rgba(176, 121, 38, 1) 22%, rgba(113, 77, 21, 1) 49%, rgba(30, 30, 30, 1) 100%);
}
</style>
