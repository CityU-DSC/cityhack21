<template>
  <v-container>
    <v-toolbar flat class="mb-5">
      <v-toolbar-title>CityHack 2021 Q&A</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-row>
      <v-col cols="12" sm="12" md='12' lg="6" v-for="qa in qas" :key="qa.id">
        <figure class="qaCard">
          <div class="profile-image">
            <img :src="qa.img" alt="qa profile" />
            <div class="icons">
              <h3>{{ qa.question }}</h3>
            </div>
          </div>
          <figcaption>
            <h3>Best Answer:</h3>
            <p>{{ qa.answer }}</p>
          </figcaption>
        </figure>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "QandA",
  props: {
    value: Boolean
  },
  data() {
    return {
      qas: [
        {
          img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample1.jpg',
          question: 'How can you do this to me?',
          answer: 'bcoz u r my ex',
        },
        {
          img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample4.jpg',
          question: 'How can you do this to me?',
          answer: 'bcoz u r my ex',
        },
        {
          img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample9.jpg',
          question: 'How can you do this to me?',
          answer: 'bcoz u r my ex',
        },
      ],
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
    close() {
      this.$emit('close');
    }
  },
}
</script>

<style scoped>
.qaCard {
  box-shadow: none !important;
  color: #141414;
  display: inline-block;
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: 14px;
  line-height: 1.4em;
  margin: 10px;
  max-width: 515px;
  min-width: 430px;
  position: relative;
  text-align: left;
  width: 100%;
}

.qaCard * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.qaCard .profile-image img {
  border-radius: 5px;
  max-width: 100%;
  height: 80px;
  vertical-align: top;
  float: left;
}

.qaCard figcaption {
  background-color: #333333;
  border-radius: 5px;
  color: #fff;
  display: inline-block;
  margin-top: 15px;
  padding: 25px;
  position: relative;
  width: 100%;
}

.qaCard figcaption:after {
  border-color: transparent transparent #333333 transparent;
  border-style: solid;
  border-width: 0 10px 10px 10px;
  bottom: 100%;
  content: '';
  height: 0;
  left: 32px;
  position: absolute;
  width: 0;
}

.qaCard h3,
.qaCard p {
  margin: 0 0 5px;
}

.qaCard h3 {
  font-weight: 600;
  font-size: 1.2em;
  font-family: 'Montserrat', Arial, sans-serif;
}

.qaCard p {
  font-size: 0.9em;
  letter-spacing: 1px;
  opacity: 0.9;
}

.qaCard .icons {
  padding: 20px 90px;
}
</style>