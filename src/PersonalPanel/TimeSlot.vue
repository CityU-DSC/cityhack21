<template>
  <v-container>
    <nav-drawer @direct="directTo"/>
    <v-card-text class="py-0 mt-5">
      <v-timeline
          align-top
          dense
      >
        <v-timeline-item color="pink" small>
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>22nd/Jan</strong>
            </v-col>
            <v-col>
              <strong>New Icon</strong>
              <div class="caption">
                Mobile App
              </div>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
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
        { time: '22nd / Jan', title: 'AWS Technical Workshop', detail: 'AWS SageMaker Workshop (registration needed)', link: 'https://forms.gle/9ug5id6tFyLuMPNS8' },
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
      postEvents: [
        {time: '1', title: '', detail: '', link: ''},
      ],
    }
  },
  methods: {
    directTo(page) {
      this.$router.push(page);
    },
  },
}
</script>

<style scoped>

</style>
