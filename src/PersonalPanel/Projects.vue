<template>
  <v-app>
    <nav-drawer @direct="directTo"/>
    <v-app-bar
        absolute
        shrink-on-scroll
        scroll-target="#scrolling-techniques-2"
    >

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <h4 class="ml-5 mt-2">CityHack21 Projects List</h4>

      <v-spacer></v-spacer>
      <v-autocomplete
          v-model="selectCategory"
          :items="categories"
          flat
          style="width: 1rem;"
          hide-no-data
          hide-details
          label="Search Category"
          solo-inverted
      ></v-autocomplete>
    </v-app-bar>
    <v-sheet
        id="scrolling-techniques-2"
        class="overflow-y-auto"
        max-height="850"

    >
      <section class="wrapper1">
        <div class="box">
          <v-row>
            <v-col cols="8">
              <v-card>
                <v-img
                    src="../assets/image/slides/1.jpg"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.3), rgba(0,0,0,0.9)"
                    height="300px"
                >
                  <v-card-title>
                    All Projects
                  </v-card-title>
                </v-img>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#2c3e50" rounded @click.stop="drawer=true; selectCategory='All Projects'">
                    Check Out More
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card>
                <v-img
                    src="../assets/image/slides/4.jpg"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.4), rgba(0,0,0,1)"
                    height="300px"
                >
                  <v-card-title>
                    Winning Projects
                  </v-card-title>
                </v-img>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#2c3e50" rounded @click.stop="drawer=true; selectCategory='Winning Projects'">
                    Check Out More
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="5">
              <v-card>
                <v-img
                    src="../assets/image/slides/3.jpg"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.4), rgba(0,0,0,1)"
                    height="250px"
                >
                  <v-card-title>
                    Final-Round Projects
                  </v-card-title>
                </v-img>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#2c3e50" rounded @click.stop="drawer=true; selectCategory='Final Round Projects'">
                    Check Out More
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="5">
              <v-card>
                <v-img
                    src="../assets/image/slides/6.jpg"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.4), rgba(0,0,0,1)"
                    height="250px"
                >
                  <v-card-title>
                    Best Team & Honorable Mention
                  </v-card-title>
                </v-img>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#2c3e50" rounded
                         @click.stop="drawer=true; selectCategory='Honorable mention & Best Team Award'">
                    Check Out More
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="2">
              <v-col>
                <v-card style="background-color: rgba(255,153,0,.7); " class="pt-3" height="135px">
                  <v-card-text>
                    AWS Sage Maker
                  </v-card-text>
                  <v-btn icon small outlined @click.stop="drawer=true; selectCategory='AWS SageMaker Projects'">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-card>
              </v-col>
              <v-col>
                <v-card class="mx-auto" color="rgba(207, 10, 44, .6)" height="135px">
                  <v-card-text class="pt-4">
                    Huawei Atlas 200
                  </v-card-text>
                  <v-btn icon small outlined @click.stop="drawer=true; selectCategory='Huawei Atlas Projects'">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-card>
              </v-col>
            </v-col>
          </v-row>
        </div>
      </section>
    </v-sheet>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        width="1000"
        right
    >
      <v-row>
        <v-col>
          <ProjectDetail :projectDetail="selectedProject" :voted="voted" @vote="voteProject"/>
        </v-col>
        <v-col>
          <v-btn
              icon
              @click.stop="drawer = !drawer"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
          <v-list-item-title class="ma-5">{{ selectCategory }}</v-list-item-title>
          <v-divider></v-divider>

          <v-list dense>
            <v-list-item
                v-for="project in filteredProjects"
                :key="project._id"
                @click.stop="viewDetailProject(project)"
                link
            >
              <v-list-item-avatar>
                <v-img :src="project.logoUrl"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ project.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import navDrawer from "@/PersonalPanel/components/navDrawer";
import ProjectDetail from "@/PersonalPanel/components/ProjectDetail";
import {mapActions, mapGetters} from 'vuex';
import Swal from "sweetalert2";

export default {
  name: "Projects",
  components: {navDrawer, ProjectDetail},
  data() {
    return {
      //search
      categories: [
        'All Projects',
        'Winning Projects',
        'Final Round Projects',
        'Honorable mention & Best Team Award',
        'Huawei Atlas Projects',
        'AWS SageMaker Projects',
      ],
      selectCategory: null,

      //drawer
      drawer: null,
      showProjectDetail: false,

      allProjects: [],
      filteredProjects: [],
      currentProject: null,
      selectedProject: null,

      voted: false,
      userDetail: null,
    }
  },
  computed: {
    ...mapGetters('auth', ['currentUser']),
  },
  watch: {
    selectCategory(v) {
      switch (v) {
        case 'Winning Projects':
          this.filteredProjects = this.allProjects.filter(pro => pro.status === 'champion' || pro.status === '1st' || pro.status === '2nd');
          break;
        case 'Final Round Projects':
          this.filteredProjects = this.allProjects.filter(pro => pro.status === 'final');
          break;
        case 'Honorable mention & Best Team Award':
          this.filteredProjects = this.allProjects.filter(pro => pro.status === 'bestTeam' || pro.status === 'honorable');
          break;
        case 'Huawei Atlas Projects':
          this.filteredProjects = this.allProjects.filter(pro => pro.team.topic === 'Atlas');
          break;
        case 'AWS SageMaker Projects':
          this.filteredProjects = this.allProjects.filter(pro => pro.team.topic === 'SageMaker');
          break;
        default:
          this.filteredProjects = this.allProjects;
          break;
      }
      this.drawer = true;
    },
  },
  methods: {
    ...mapActions('project', ['myProject', 'listAllProjects', 'toggleProjectVote']),
    directTo(page) {
      this.$router.push(page);
    },
    viewDetailProject(project) {
      this.selectedProject = project;
      // console.log(this.userDetail.projectVoted);
      if(this.userDetail.projectVoted.length > 0){
        this.userDetail.projectVoted.map(p => {
          if(p === this.selectedProject._id) {
            this.voted = true;
          }
          else {
            this.voted = false;
          }
        });
      }
      else this.voted = false;
    },

    voteProject(_id) {
      if(this.userDetail.projectVoted.length >= 2 && _id){
        Swal.fire({
          icon: 'error',
          title: 'Too Greedy...',
          text: 'You already have two votes! unvote one and vote this again',
        })
      } else if (this.voted) {
        Swal.fire({
          title: 'Are you sure?',
          text: "This will UnVote this project!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, UnVote it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.toggleProjectVote(_id).then(() => {
              Swal.fire(
                  'Success',
                  'Projects has been un-voted',
                  'success'
              );
              this.userDetail.projectVoted = this.userDetail.projectVoted.filter(p => p !== _id);
              this.voted = false;
            }).catch(err => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.message,
              })
            });
          }
        });
      } else {
        Swal.fire({
          title: 'Are you sure?',
          text: "You will vote this project!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Vote it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.toggleProjectVote(_id).then(() => {
              Swal.fire(
                  'Success',
                  'Projects has been Voted',
                  'success'
              );
              if(this.userDetail.projectVoted.length === 0){
                this.userDetail.projectVoted[0] = _id;
              } else {
                this.userDetail.projectVoted[1] = _id;
              }
              this.voted = true;
            }).catch(err => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.message,
              })
            });
          }
        });
      }
    },
  },
  async mounted() {
    await this.listAllProjects().then(res => this.allProjects = res).catch(console.error);
    await this.myProject().then(res => this.currentProject = res).catch(console.error);
    this.selectedProject = this.allProjects[0];
    this.allProjects = this.allProjects.concat(
        {
          created_at: "2021-01-12T15:18:58.848Z",
          description: "efojrpoierofjroifejrofije rofiejrf oijrejroijferoifjeoirjfeo",
          logoUrl: "https://firebasestorage.googleapis.com/v0/b/cityhack21-6404b.appspot.com/o/logo%2Faws%20sagemaker%20workshop%20poster.jpg?alt=media&token=ef5ebe48-bc62-4752-8fe1-9ce8cc9d47a6",
          motivation: "efojrpoierofjroifejrofije rofiejrf oijrejroijferoifjeoirjfeo",
          name: "HHrtojrowHH",
          pdfUrl: "https://firebasestorage.googleapis.com/v0/b/cityhack21-6404b.appspot.com/o/presentation%2FQuick%20Setup%20Guide%20for%20Atlas%20200%20DK%20for%20IT21VDMB.pdf?alt=media&token=8107f5be-45c8-45c2-95c0-167f34b8407f",
          repositoryUrl: "https://github.com",
          team: {_id: "5ffc527ed2bc1f24a0fb0a09", name: "hello", topic: "Atlas"},
          tech: ["AWS Sagemaker", "Hardware", "Atlas 200 DK"],
          updated_at: "2021-01-12T15:18:58.851Z",
          votes: 0,
          _id: "5ffdbde2e4fg980c5838630f"
        },
        {
          created_at: "2021-01-12T15:18:58.848Z",
          description: "efojrpoierofjroifejrofije rofiejrf oijrejroijferoifjeoirjfeo",
          logoUrl: "https://firebasestorage.googleapis.com/v0/b/cityhack21-6404b.appspot.com/o/logo%2Faws%20sagemaker%20workshop%20poster.jpg?alt=media&token=ef5ebe48-bc62-4752-8fe1-9ce8cc9d47a6",
          motivation: "efojrpoierofjroifejrofije rofiejrf oijrejroijferoifjeoirjfeo",
          name: "efefergreg",
          pdfUrl: "https://firebasestorage.googleapis.com/v0/b/cityhack21-6404b.appspot.com/o/presentation%2FQuick%20Setup%20Guide%20for%20Atlas%20200%20DK%20for%20IT21VDMB.pdf?alt=media&token=8107f5be-45c8-45c2-95c0-167f34b8407f",
          repositoryUrl: "https://github.com",
          team: {_id: "5ffc527ed2bc1f24a0fb3309", name: "low", topic: "SageMaker"},
          tech: ["AWS Sagemaker", "Hardware", "Atlas 200 DK"],
          updated_at: "2021-01-12T15:18:58.851Z",
          votes: 0,
          _id: "5ffdbde2e4fd890c5838630f"
        }
    );
    this.userDetail = this.currentUser;
    if (this.selectedProject && this.userDetail){
      await this.userDetail.projectVoted.map(p => this.voted = this.selectedProject._id === p)
    }
  },
}
</script>

<style scoped>

.wrapper1 {
  padding: 6em 0;
  position: relative;
  align-items: center;
  display: flex;
  justify-content: center;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-color: #2c3e50;
  /*background-image: url("https://www.chicagodigital.com/images/content/slider/champ/champ-home-slider-bg.jpg");*/
  border-top: 0;
  text-align: center;
  overflow: hidden;
}

.box {
  min-width: 90%;
  background-color: rgba(18, 18, 18, 0);
  display: block;
  overflow: hidden;
  margin-top: 3em;
  padding: 3em;
  width: 50%;
}

.v-card {
  box-shadow: 11px 13px 7px 0 rgba(18, 18, 18, 0.8) !important;
}
</style>
