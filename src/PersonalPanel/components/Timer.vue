<template>
  <div id="clock">
    <p class="infoCompetition">{{ infoCompetition }}</p>
    <p class="time">{{ time }}</p>
  </div>
</template>

<script>
// set the competition date and time in here.
// default is (just for testing) Jan 11 2021, 9:00 am
const competitionDate = "2021-01-29T15:59:59.003Z";
const MILLISECONDS_SECOND = 1000;
const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND;
const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE;
const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR;

export default {
  name: "clock",
  data() {
    return {
      infoCompetition: "",
      time: "",
      week: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      // for the count down
      counting: false,
      endTime: 0,
      totalMilliseconds: 0,
    };
  },
  computed: {
    /**
     * Remaining days.
     * @returns {number} The computed value.
     */
    days() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_DAY);
    },

    /**
     * Remaining hours.
     * @returns {number} The computed value.
     */
    hours() {
      return Math.floor(
        (this.totalMilliseconds % MILLISECONDS_DAY) / MILLISECONDS_HOUR
      );
    },

    /**
     * Remaining minutes.
     * @returns {number} The computed value.
     */
    minutes() {
      return Math.floor(
        (this.totalMilliseconds % MILLISECONDS_HOUR) / MILLISECONDS_MINUTE
      );
    },

    /**
     * Remaining seconds.
     * @returns {number} The computed value.
     */
    seconds() {
      return Math.floor(
        (this.totalMilliseconds % MILLISECONDS_MINUTE) / MILLISECONDS_SECOND
      );
    },

    /**
     * Remaining milliseconds.
     * @returns {number} The computed value.
     */
    milliseconds() {
      return Math.floor(this.totalMilliseconds % MILLISECONDS_SECOND);
    },

    /**
     * Total remaining days.
     * @returns {number} The computed value.
     */
    totalDays() {
      return this.days;
    },

    /**
     * Total remaining hours.
     * @returns {number} The computed value.
     */
    totalHours() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_HOUR);
    },

    /**
     * Total remaining minutes.
     * @returns {number} The computed value.
     */
    totalMinutes() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_MINUTE);
    },

    /**
     * Total remaining seconds.
     * @returns {number} The computed value.
     */
    totalSeconds() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_SECOND);
    },
  },
  methods: {
    updateTime() {
      var cd = new Date();
      var endDate = new Date(competitionDate);
      this.totalMilliseconds = Math.abs(endDate.getTime() - cd.getTime());
      this.time =
        this.days + " days " +
        this.hours + " hours " +
        this.minutes + " minutes " +
        this.seconds + " seconds ";
      this.infoCompetition = "COMPETITION STARTS"
    },
  },
  mounted() {
    this.timerId = setInterval(this.updateTime, 1000);
  },
};
</script>
<style lang="scss" scoped>

#clock {
  position: relative;
  display: block;
  left: 50%;
  top: 30%;
  padding: 30px;
  margin: 10px;
  text-align: center;
  transform: translate(-50%, -50%);
  color: #daf6ff;
  text-shadow: 0 0 20px rgba(10, 175, 230, 1),  0 0 20px rgba(10, 175, 230, 0);
  .time {
    letter-spacing: 0.03em;
    font-size: 40px;
    padding: 5px 0;
  }
  .infoCompetition {
    letter-spacing: 0.1em;
    font-size: 24px;
  }
  .text {
    letter-spacing: 0.1em;
    font-size: 12px;
    padding: 20px 0 0;
  }
}
</style>

