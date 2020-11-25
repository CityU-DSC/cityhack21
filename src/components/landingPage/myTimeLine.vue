<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title>CityHack 2021 TimeLine</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    
    <!-- <div id="myTimeLine"> -->
    <vue-horizontal-timeline :items="items" />
    <!-- </div> -->
  </v-container>
  
  
</template>

<script>
// import Timeline from "timeline-vuejs";
import { VueHorizontalTimeline } from "vue-horizontal-timeline";

export default {
  name: "myTimeLine",
  components: {
    VueHorizontalTimeline
  },
  // timeLines: [
  //       {time: "30 November 2020", title: "Pre Registration", content: "Pre-registration for workshops. It will be our first round of promotion for the event."},
  //       {time: "22 December 2020 - 23 December 2020", title: "Workshop", content: "A two-day workshop will be held, ensuring participants have better preparation for the competition."},
  //       {time: "28 December 2020", title: "Registration", content: "Starts the formal registration period until a week before CityHack 2021."},
  //       {time: "30 January 2021 - 31 January 2021", title: "CityHack21", content: "Let’s start Hacking for two days!"},
  //     ]
  data: () => ({
    items: [
      {
        title: "30 Nov. 2020",
        content:
          "Pre Registration \nPre-registration for workshops. It will be our first round of promotion for the event."
      },
      {
        title: "22-23 Dec. 2020",
        content:
          "Workshop \nA two-day workshop will be held, ensuring participants have better preparation for the competition."
      },
      {
        title: "28 Dec. 2020",
        content:
          "Registration \nStarts the formal registration period until a week before CityHack 2021."
      },
      {
        title: "30-31 Jan. 2021",
        content:
          "CityHack21 \nLet’s start Hacking for two days!"
      }
    ]
  })
};
</script>


