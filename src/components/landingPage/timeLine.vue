<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title>TimeLine</v-toolbar-title>
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

    <vue-horizontal-timeline class="d-md-none" :items="horizontalItems" />

    <v-timeline class="d-none d-md-block">
      <v-timeline-item
          v-for="timeLine in timeLines"
          :key="timeLine.id"
          color="#ff9900"
          large
      >
        <template v-slot:opposite>
          <span>{{ timeLine.time }}</span>
        </template>
        <v-card class="elevation-2">
          <v-card-title class="headline">{{ timeLine.title }}</v-card-title>
          <v-card-text>{{timeLine.content}}</v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script>
import { VueHorizontalTimeline } from "vue-horizontal-timeline";
export default {
name: "timeLine",
  props: {
    value: Boolean,
    isOverView: {
      default: false,
      type: Boolean
    }
  },
  components: {
    VueHorizontalTimeline,
  },
  data(){
    return {
      timeLines: [
        {time: "30 November 2020", title: "Pre Registration", content: "Pre-registration for workshops. It will be our first round of promotion for the event."},
        {time: "22 December 2020 - 23 December 2020", title: "Workshop", content: "A two-day workshop will be held, ensuring participants have better preparation for the competition."},
        {time: "28 December 2020", title: "Registration", content: "Starts the formal registration period until a week before CityHack 2021."},
        {time: "30 January 2021 - 31 January 2021", title: "CityHack21", content: "Let’s start Hacking for two days!"},
      ],
      horizontalItems: [
        {title: "30 Nov. 2020", content: "Pre Pre-registration for workshops. It will be our first round of promotion for the event."},
        {title: "22-23 Dec. 2020", content: "A two-day workshop will be held, ensuring participants have better preparation for the competition."},
        {title: "28 Dec. 2020", content: "Starts the formal registration period until a week before CityHack 2021."},
        {title: "30-31 Jan. 2021", content: "Let’s start Hacking for two days!"}
      ]
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
.v-timeline:before {
  left: 50%;
}
</style>
