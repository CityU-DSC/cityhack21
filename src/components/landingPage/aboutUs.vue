<template>
  <v-container>
    <v-card>
      <v-toolbar
          flat
      >
        <v-toolbar-title>About CityHack</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-tabs vertical>
        <v-tab>
          <v-icon left> mdi-information </v-icon>
          What is Hackathon
        </v-tab>
        <v-tab>
          <v-icon left> mdi-layers-search </v-icon>
          What is CityHack
        </v-tab>
        <v-tab>
          <v-icon left> mdi-view-agenda </v-icon>
          Events Outline
        </v-tab>
        <v-tab>
          <v-icon left> mdi-shape </v-icon>
          Themes
        </v-tab>
        <v-tab>
          <v-icon left> mdi-contacts </v-icon>
          Contact Info
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <p>
                The word “hackathon” is a portmanteau of “hacking marathon”.
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
              <p>
                CityHack is CityU’s largest Hackathon event. We aim to break away from conventional education and provide students with a unique opportunity to create a “hack” through a collaborative effort.
              </p>
              <p>
                For us, a hackathon means creative and innovative problem-solving. CityHack is open to everyone, be it designers, curious individuals, geeks, or even technophobes. Even if you have never been to a hackathon before, believe us when we say: “All you need to be part of CityHack is a passionate heart”.
              </p>
              <p>
                The event will be a fulfilling experience for individuals hailing from all sorts of backgrounds. Various workshops will be provided and held in parallel during CityHack to allow newcomers to pick up new skills, whilst allowing experienced participants to hone their abilities.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <h4>Basic Information</h4>
              <p>Name: CityHack 2021</p>
              <p>Time: 30 January 2021 - 30 January 2021</p>
              <p>Format: Virtual + Physical</p>
              <p>Participants: More than 120 students from different universities in Hong Kong</p>

              <h4>Cooperation with Corporation</h4>
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
    value: Boolean
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
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>

</style>