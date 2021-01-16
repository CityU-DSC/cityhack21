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
              <h1 class="mb-5">Theme - Covid19</h1>
              <p>
                This year we will have open-ended tasks. Participants can think of possible problems, solutions or ideas to improve the situation caused by Covid19. The following example problems are the topics you can consider with, but not limited to these:
              </p>
            </v-card-text>
          </v-card>
<!--          <v-list-item>-->
<!--            <v-list-item-content>-->
<!--              <v-list-item-subtitle>1. WFH, online meeting, online learning</v-list-item-subtitle>-->
<!--              <v-list-item-subtitle>2. Resource allocation</v-list-item-subtitle>-->
<!--              <v-list-item-subtitle>3. Reduce direct contact and promote social distancing</v-list-item-subtitle>-->
<!--              <v-list-item-subtitle>4. Safety precautions</v-list-item-subtitle>-->
<!--            </v-list-item-content>-->
<!--          </v-list-item>-->
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header><p class="ml-3">WFH, online meeting, online learning</p></v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="ml-3 grey-color">COVID 19 has had a strong negative effect on economies around the world. However, it has also been a catalyst for great positive change. Many organizations have developed robust systems for keeping adequate levels of productivity outside of the office area. And that allowed professionals and students to stay productive at home. </p>
                <p class="ml-3 grey-color">Work from home arrangement has its challenges, for instance, the difficulty of managing tasks and inefficient collaboration while being at a distance from colleagues. These challenges are partly being solved through intelligent use of technology such as online conferencing, task managing software, corporate messaging portals, but unfortunately, the aforementioned tools leave a lot to be desired. </p>
                <p class="ml-3 grey-color">Innovative solutions, developed by CityHack contestants, could make a home office a viable substitute for an office or a university campus.</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header><p class="ml-3">Resource allocation</p></v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="ml-3 grey-color">COVID 19 has slowed the traffic system and the whole world. In this critical period, any resources have to be appreciated and be well allocated to make use of the limited to the maximum. In your solution/project, get resource allocation into your mind. The resources we are talking about here can be life attached, such as food, toilet paper, masks, and other everyday necessities. It can also be medical-related, such as medicine, medical gloves, or other medical supplies. It can be human resources, such as task management with geological limits, as we cannot travel around at this moment. It can also be services such as delivery, quarantine hotel vacancies, or even the quotas of testing. </p>
                <p class="ml-3 grey-color">Not only do you need to consider the availability of the resources, but also the priority and how it can be accessed. If there are two hospitals that both have a doctor in need but there is only one allocatable, where should we send the doctor to? The one with more cases, or the closest one? You also need to think about the access processes, that can be, how to notify the doctor and the hospital? How to deliver the doctor to the designated location? How to make sure the doctor can arrive on time? </p>
                <p class="ml-3 grey-color">There is always more to dig into when it comes to resource allocation. For example, if you are trying to build up your solution with an independent online meeting service, you will also need to consider the allocation of data storage, network connection, and access to the service. Sometimes a trade-off policy is needed if you have already maximized the efficiency. Thinking about the subtleties makes the project more complete. </p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header><p class="ml-3">Reduce direct contact and promote social distancing</p></v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="ml-3 grey-color">The outbreak of Covid-19 has hugely damaged global business and the economy. Providing contactless services has been vitally important to getting the industry back on its feet and encouraging consumers to use/buy the services and products. This topic is for those who would like to come up with contactless technologies that can help various industries to overcome the challenges of Covid-19 and raise public awareness about social distancing. Please provide solutions to minimize the risk of exposure to the virus such as self-service systems, online payment, online taxi booking service, and real-time public transportation service. </p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header><p class="ml-3">Safety precautions</p></v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="ml-3 grey-color">Covid-19 has been an incredible demonstrator for the fact that, if we as humans take care, maintain social distancing, and avoid crowding, we can be successful at alleviating this contagious disease. </p>
                <p class="ml-3 grey-color">As technology and business experts, we have the advantage of understanding how technology can help in detecting objects and optimizing processes. This topic is for those of you who would like to come up with solutions for helping with the different safety precautions that have been put up, including but not limited to face mask detection, face mask position correction, recording entry and exit for venues, handwashing posture/time reminders and so on. </p>
                <p class="ml-3 grey-color">Get creative, and feel free to come up with more safety precautions that technology can help improve! </p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
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
  font-size:1.1rem;
  line-height:1.6rem;
}
.grey-color{
  color: rgba(255, 255, 255, 0.7);

}
  .highlight{
    color: #FF9900; font-weight:bold;
  }
</style>
