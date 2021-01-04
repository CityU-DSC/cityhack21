<template>
  <v-container>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>About CityHack</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-if="isOverView" v-bind="attrs" v-on="on" icon @click.stop="lastPage"><v-icon>mdi-chevron-double-up</v-icon></v-btn>
          </template>
          <span>Last Page</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-if="isOverView" v-bind="attrs" v-on="on" icon @click.stop="nextPage"><v-icon>mdi-chevron-double-down</v-icon></v-btn>
          </template>
          <span>Next Page</span>
        </v-tooltip>
      </v-toolbar>

      <v-tabs color="#ff9900" next-icon="mdi-chevron-right"  prev-icon="mdi-chevron-left" show-arrows>
        <v-tab>
          <v-icon left> mdi-information </v-icon>
        </v-tab>
        <v-tab>
          <v-icon left> mdi-layers-search </v-icon>
        </v-tab>
        <v-tab>
          <v-icon left> mdi-view-agenda </v-icon>
        </v-tab>
        <v-tab>
          <v-icon left> mdi-shape </v-icon>
        </v-tab>
        <v-tab>
          <v-icon left> mdi-contacts </v-icon>
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <h1 class="mb-5">What is <span class='highlight'>Hackathon</span></h1>
              <p>
                The word “<span class='highlight'>hackathon</span>” is a portmanteau of “<span class='highlight'>hacking marathon</span>”.
              </p>
              <p>
                A hackathon is a design sprint-like event which involves parties with software development background such as computer programmers, graphic designers, interface designers, project managers, and others who collaborate intensively on software projects. The goal of the hackathon is to create functioning software or hardware before the end of the event.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <h1 class="mb-5">What is <span class='highlight'>CityHack</span></h1>
              <p>
                <span class='highlight'>CityHack is CityU’s largest Hackathon event</span>. We aim to break away from conventional education and provide students with a unique opportunity to create a “hack” through a collaborative effort.
              </p>
              <p>
                For us, a hackathon means <span class='highlight'>creative</span> and <span class='highlight'>innovative problem-solving</span>. CityHack is open to everyone, be it designers, curious individuals, geeks, or even technophobes. Even if you have never been to a hackathon before, believe us when we say: “<span class='highlight'>All you need to be part of CityHack is a passionate heart</span>”.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <h1 class="mb-5">Events Outline</h1>
              <h2>Basic Information</h2>
              <ul>
                <li>Date: <span class='highlight'>30 - 31 JAN 2021</span></li>
                <li>Format: <span class='highlight'>Virtual + Physical</span></li>
                <li>Participants: <span class='highlight'> > 120 students</span></li>
              </ul>
              <br>
              <h2>Cooperation with Corporation</h2>
              <ol class="ml-3">
                <li>Provide resources or products (e.g., hardware, API) for the participants.</li>
                <li>Provide workshops or talks on related topics.</li>
                <li>Assign one technician to assist during the competition.</li>
                <li>Assign an IT specialist as judge of the competition and present prizes on behalf of the corporation.</li>
                <li>Provide additional support or references for the participants, if necessary.</li>
              </ol>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <h1 class="mb-5">Themes</h1>
              <p>
                This year we will have open-ended tasks. Participants can think of possible solutions or ideas to improve the situation caused by Covid19. Below are the four main aspects that they can consider in their solutions:
              </p>
              <ol class="ml-3">
                <li>WFH, online meeting, online learning</li>
                <li>Resource allocation</li>
                <li>Reduce direct contact and promote social distancing </li>
                <li>Safety precautions</li>
              </ol>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <h1 class="mb-5">Contact Info</h1>
              <ul class="ml-3">
                <li>Team Lead: Su Jin -  <a href = "mailto: sjyeap2-c@my.cityu.edu.hk">sjyeap2-c@my.cityu.edu.hk</a></li>
                <li>Google DSC Lead: Ryan Yen – <a href = "mailto: ryanyen2-c@my.cityu.edu.hk">ryanyen2-c@my.cityu.edu.hk</a></li>
                <li>Public Relation Lead: Ivan MUSHKIN - <a href = "mailto: imashkin2-c@my.cityu.edu.hk">imashkin2-c@my.cityu.edu.hk</a></li>
              </ul>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "aboutUs",
  props: {
    value: Boolean,
    isOverView: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    nextPage() {
      this.$emit('next');
    },
    lastPage() {
      this.$emit('last');
    }
  }
}
</script>

<style scoped>
p, li{
  font-size:1.2rem;
  line-height:1.6rem;
}
  .highlight{
    color: #FF9900; font-weight:bold;
  }
</style>
