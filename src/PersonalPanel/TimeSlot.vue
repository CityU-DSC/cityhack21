<template>
  <v-container>
    <nav-drawer @direct="directTo"/>
    <v-row>
      <v-col>
        <v-card-text class="py-0 mt-5">
          <v-timeline
              align-top
              dense
          >
            <v-timeline-item
                color="#ff9900"
                small
                v-for="event in events" :key="event.id"
            >
              <v-row class="pt-1" style="width: 500px;">
                <v-col cols="3">
                  <strong>{{ event.time }}</strong>
                </v-col>
                <v-col>
                  <strong style="color: #FF9900;">{{ event.title }}</strong>
                  <div class="caption">
                    {{ event.detail }}
                  </div>
                  <div align="right">
                    <a :href="event.link" target="_blank">
                      <v-btn x-small>Act Now</v-btn>
                    </a>
                  </div>
                </v-col>
              </v-row>
            </v-timeline-item>
            <v-timeline-item color="#ff9900" icon="mdi-star">
              <v-row>
                <v-col class="mt-2" cols="3"><strong>30 & 31 / JAN</strong></v-col>
                <v-col class="mt-3">
                  <v-row>
                    <v-divider class="mt-3" />
                    <v-icon right>mdi-arrow-right</v-icon>
                  </v-row>
                </v-col>
              </v-row>
            </v-timeline-item>
            <v-timeline-item
                color="#ff9900"
                small
                v-for="event in postEvent" :key="event.id"
            >
              <v-row class="pt-1" style="width: 500px;">
                <v-col cols="3">
                  <strong>{{ event.time }}</strong>
                </v-col>
                <v-col>
                  <strong style="color: #FF9900;">{{ event.title }}</strong>
                  <div class="caption">
                    {{ event.detail }}
                  </div>
                  <div align="right">
                    <a :href="event.link" target="_blank">
                      <v-btn x-small>Act Now</v-btn>
                    </a>
                  </div>
                </v-col>
              </v-row>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-col>
      <v-col cols="5">
        <v-sheet height="600">
          <v-calendar
              ref="calendar"
              v-model="focus"
              color="#ff9900"
              type="category"
              category-show-all
              :categories="categories"
              :events="duringEvents"
              :event-color="getEventColor"
              @change="fetchEvents"
          ></v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import navDrawer from "@/PersonalPanel/components/navDrawer";

export default {
  name: "timeSlot",
  components: {navDrawer},
  data() {
    return {
      events: [
        {
          time: '22nd / Jan',
          title: 'AWS Technical Workshop',
          detail: 'AWS SageMaker Workshop (registration needed)',
          link: 'https://forms.gle/9ug5id6tFyLuMPNS8'
        },
        {
          time: '24th / Jan',
          title: 'CityHack21 Registration Deadline',
          detail: 'This is the last day for participants to register for the CityHack21! Let\'s move on and send invitation to your friend ASAP!!',
          link: 'https://cityhack21.com/register',
        },
        {
          time: '27th / Jan',
          title: 'Last Date to Team Up!',
          detail: 'This is the Team Up deadline, please remember to team up in the personal panel by today!!',
          link: 'https://cityhack21.com/personal/team',
        },
      ],
      postEvent: [
        {
          time: '5th / Feb', title: 'Deadline to Submit Post-Event Form',
          detail: 'Only the one who completed this form can get the souvenirs from us (need to confirm address)',
          link: ''
        },
      ],

      //calendar
      focus: '',
      duringEvents: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      categories: ['30th Jan', '31th Jan'],
    }
  },
  methods: {
    directTo(page) {
      this.$router.push(page);
    },

    getEventColor(event) {
      return event.color
    },
    fetchEvents({start, end}) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
          category: this.categories[this.rnd(0, this.categories.length - 1)],
        })
      }

      this.duringEvents = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },
  mounted() {
    this.$refs.calendar.checkChange()
  }
}
</script>

<style scoped>
.theme--dark.v-calendar-daily {
  background-color: #121212;
  border: none;
}
</style>
