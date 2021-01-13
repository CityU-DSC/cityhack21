<template>
  <v-app>
    <nav-drawer @direct="directTo"/>
    <v-app-bar
        absolute
        shrink-on-scroll
        scroll-target="#scrolling-techniques-2"
    >

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-app-bar-title class="ml-5 mt-2">CityHack21 Projects List</v-app-bar-title>

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
        max-height="800"
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
                  <v-btn color="#2c3e50" rounded @click.stop="drawer = !drawer">
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
                  <v-btn color="#2c3e50" rounded>
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
                  <v-btn color="#2c3e50" rounded>
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
                  <v-btn color="#2c3e50" rounded>
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
                    <v-btn icon small outlined><v-icon>mdi-chevron-right</v-icon></v-btn>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card class="mx-auto" color="rgba(207, 10, 44, .6)" height="135px">
                    <v-card-text class="pt-4">
                      Huawei Atlas 200
                    </v-card-text>
                    <v-btn icon small outlined><v-icon>mdi-chevron-right</v-icon></v-btn>
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
        width="300"
        right
        temporary
    >
      <v-list-item-title class="ma-5" style="">Category</v-list-item-title>
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
            v-for="project in allProjects"
            :key="project._id"
            link
        >
          <v-list-item-avatar>
            <v-img :src="project.logoUrl"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title @click="viewDetailProject(project)">{{ project.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
        v-model="drawer2"
        style="margin-right: 300px;"
        width="500"
        absolute
        right
        temporary
    >
      <ProjectDetail :projectDetail="selectedProject" />
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import navDrawer from "@/PersonalPanel/components/navDrawer";
import ProjectDetail from "@/PersonalPanel/components/ProjectDetail";
import {mapActions} from 'vuex';

export default {
  name: "Projects",
  components: {navDrawer, ProjectDetail},
  data(){
    return {
      //search
      categories: [
          'All',
          'Winning',
          'Final Round',
          'Champion',
          '1st runner up',
          '2nd runner up',
          'Honorable mention',
          'Best Team Award',
          'Atlas Projects',
          'AWS SageMaker Projects',
      ],
      selectCategory: null,

      //drawer
      drawer: null,
      drawer2: false,
      showProjectDetail: false,

      allProjects: [],
      currentProject: null,
      selectedProject: null,
    }
  },
  watch: {
    drawer(val){
      console.log(this.drawer)
      if(!val) { this.drawer2 = false; }
    },
  },
  methods: {
    ...mapActions('project', ['myProject', 'listAllProjects', 'toggleProjectVote']),
    directTo(page) {
      this.$router.push(page);
    },
    viewDetailProject(project) {
      if (!this.selectedProject || this.selectedProject.name !== project.name) {
        this.selectedProject = project;
        this.drawer2 = true;
      } else {
        this.selectedProject = null;
        this.drawer = false;
      }
    },
  },
  async mounted() {
    await this.listAllProjects().then(res => this.allProjects = res).catch(console.error);
    await this.myProject().then(res => this.currentProject = res).catch(console.error);
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
  box-shadow: 11px 13px 7px 0 rgba(18,18,18,0.8) !important;
}
</style>
