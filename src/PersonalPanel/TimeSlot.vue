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
              color="#ff9900"
              type="custom-daily"
              show-week="false"
              start='2021-01-30:09:00:00'
              end='2021-01-31:23:59:59'
              interval-count='17'
              :first-interval='8.5'
              :hide-header="false"
              :events="duringEvents"
              :event-color="getEventColor"
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
      focus: '2021-01-30:00:00:00',
      duringEvents: [
        {
          name: 'Warm up session',
          start: new Date('2021-01-30T09:00:00'),
          end: new Date('2021-01-30T09:20:00'),
          color: 'grey darken-3',
          timed: true,
        },
        {
          name: 'Opening Ceremony',
          start: new Date('2021-01-30T09:20:00'),
          end: new Date('2021-01-30T10:30:00'),
          color: '#054e02',
          timed: true,
        },
        {
          name: 'Hacking Time!',

      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
          start: new Date('2021-01-30T10:30:00'),
          end: new Date('2021-01-31T13:30:00'),
          color: '#1a237e',
          timed: true,
        },
        {
          name: 'Mentoring Session 1',
          start: new Date('2021-01-30T14:00:00'),
          end: new Date('2021-01-30T15:00:00'),
          color: 'cyan darken-4',
          timed: true,
        },
        {
          name: 'MS only for Atlas',
          start: new Date('2021-01-30T15:00:00'),
          end: new Date('2021-01-30T16:00:00'),
          color: 'rgb(255, 0, 119)',
          timed: true,
        },

        {
          name: 'Mentoring Session 2',
          start: new Date('2021-01-30T16:00:00'),
          end: new Date('2021-01-30T17:00:00'),
          color: 'cyan darken-4',
          timed: true,
        },

        {
          name: 'Mentoring session 3',
          start: new Date('2021-01-30T19:30:00'),
          end: new Date('2021-01-30T20:30:00'),
          color: 'cyan darken-4',
          timed: true,
        },

        {
          name: 'Warm Up Session',
          start: new Date('2021-01-31T10:00:00'),
          end: new Date('2021-01-31T10:20:00'),
          color: 'grey darken-3',
          timed: true,
        },
        {
          name: 'Day 2 Briefing',
          start: new Date('2021-01-31T10:20:00'),
          end: new Date('2021-01-31T11:00:00'),
          color: '#054e02',
          timed: true,
        },
        {
          name: 'Mentoring Session 4',
          start: new Date('2021-01-31T11:00:00'),
          end: new Date('2021-01-31T12:00:00'),
          color: 'cyan darken-4',
          timed: true,
        },
        {
          name: 'Submssion Deadline',
          start: new Date('2021-01-31T13:30:00'),
          end: new Date('2021-01-31T14:00:00'),
          color: 'rgb(218,0,102)',
          timed: true,
        },


        {
          name: 'Briefing before Pitching',
          start: new Date('2021-01-31T14:10:00'),
          end: new Date('2021-01-31T14:30:00'),
          color: 'grey darken-2',
          timed: true,
        },
        {
          name: 'First Round Pitching',
          start: new Date('2021-01-31T14:30:00'),
          end: new Date('2021-01-31T15:40:00'),
          color: 'black',
          timed: true,
        },


        {
          name: 'Judges Marking Time',
          start: new Date('2021-01-31T15:40:00'),
          end: new Date('2021-01-31T16:00:00'),
          color: 'lime darken-4',
          timed: true,
        },
        {
          name: 'Final Round Pitching',
          start: new Date('2021-01-31T16:00:00'),
          end: new Date('2021-01-31T17:50:00'),
          color: 'black',
          timed: true,
        },
        {
          name: 'Judges Marking Time. Voting Time',
          start: new Date('2021-01-31T17:50:00'),
          end: new Date('2021-01-31T18:10:00'),
          color: 'lime darken-4',
          timed: true,
        },

        {
          name: 'Closing Ceremony',
          start: new Date('2021-01-31T18:10:00'),
          end: new Date('2021-01-31T18:30:00'),
          color: '#054e02',
          timed: true,
        },




        
      ],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }
  },
  methods: {
    directTo(page) {
      this.$router.push(page);
    },

    getEventColor(event) {
      return event.color
    },
    // fetchEvents({start, end}) {
      // const events = [];

      // const min = new Date(`${start.date}T00:00:00`)
      // const max = new Date(`${end.date}T23:59:59`)
      // const days = (max.getTime() - min.getTime()) / 86400000
      // const eventCount = this.rnd(days, days + 20)

      // for (let i = 0; i < eventCount; i++) {
      //   const allDay = this.rnd(0, 3) === 0
      //   const firstTimestamp = this.rnd(min.getTime(), max.getTime())
      //   const first = new Date(firstTimestamp - (firstTimestamp % 900000))
      //   const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
      //   const second = new Date(first.getTime() + secondTimestamp)

      //   events.push({
      //     name: this.names[this.rnd(0, this.names.length - 1)],
      //     start: first,
      //     end: second,
      //     color: this.colors[this.rnd(0, this.colors.length - 1)],
      //     timed: true,
      //     category: this.categories[this.rnd(0, this.categories.length - 1)],
      //   })
      // }
      // // console.log(this.duringEvents);
      // this.duringEvents.push(...events);
      // console.log(this.duringEvents);
    // },
    // rnd(a, b) {
    //   return Math.floor((b - a + 1) * Math.random()) + a
    // },
  },
  mounted() {
    this.$refs.calendar.checkChange()
  }
}
</script>

<style>
.theme--dark.v-calendar-daily {
  background-color: #121212;
  border: none;
}
#app .v-application--wrap .container .row .col.col-5 .v-calendar-daily__body .v-event-timed-container .v-event-timed{
  border:none !important;
}
</style>
