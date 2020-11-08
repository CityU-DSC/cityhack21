<template>
  <v-container>
    <v-toolbar
        flat
    >
      <v-toolbar-title class="ml-3">CityHack 2021 Judges</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-row>
      <v-col cols="12" sm="12" md='6' lg="4" v-for="judge in judges" :key="judge.id">
        <figure  class="judgeCard mt-5">
          <div class="profile-image">
            <img :src="judge.img" alt="judge photo"/>
          </div>
          <figcaption>
            <h3>{{ judge.name }}</h3>
            <h4>{{ judge.title }}</h4>
            <p>{{ judge.info }}</p>
            <div class="icons">
              <a :href="judge.socialLinkA"><v-icon>mdi-twitter</v-icon></a>
              <a :href="judge.socialLinkB"><v-icon>mdi-instagram</v-icon></a>
              <a :href="judge.socialLinkC"><v-icon>mdi-web</v-icon></a>
            </div>
          </figcaption>
        </figure>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Judges",
  props: {
    value: Boolean
  },
  data() {
    return {
      judges: [
        {
          name: 'Ryan Yen',
          title: 'DSC Lead',
          info: 'Which is worse, that everyone has his price, or that the price is always so low.',
          img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample47.jpg',
          socialLinkA: '',
          socialLinkB: '',
          socialLinkC: 'https://cityu-hall2.github.io/',
        },
        {
          name: 'Eugene Low',
          title: 'DSC guy',
          info: 'Which is worse, that everyone has his price, or that the price is always so low.',
          img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample70.jpg',
          socialLinkA: '',
          socialLinkB: '',
          socialLinkC: 'https://cityu-hall2.github.io/',
        },
        {
          name: 'My Ex',
          title: 'pretty hot',
          info: 'Which is worse, that everyone has his price, or that the price is always so low.',
          img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample83.jpg',
          socialLinkA: '',
          socialLinkB: '',
          socialLinkC: 'https://cityu-hall2.github.io/',
        },
      ]
    }
  },
  computed: {
    show: {
      get() {
        return this.value
      },
      set(value) {
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
.judgeCard {
  font-family: 'Open Sans', Arial, sans-serif;
  position: relative;
  margin: 10px;
  min-width: 230px;
  max-width: 315px;
  width: 100%;
  color: #000000;
  text-align: center;
  line-height: 1.4em;
  font-size: 14px;
  box-shadow: none !important;
}

.judgeCard * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.judgeCard .profile-image {
  display: inline-block;
  width: 80%;
  z-index: 1;
  position: relative;
  padding: 10px;
  border: 2px solid #e8b563;
}

.judgeCard .profile-image img {
  max-width: 100%;
  vertical-align: top;
}

.judgeCard figcaption {
  width: 100%;
  background-color: #F2F2F2;
  color: #555;
  padding: 125px 25px 25px;
  margin-top: -100px;
  display: inline-block;
  box-shadow: 5px 10px #555555;
}

.judgeCard h3,
.judgeCard h4,
.judgeCard p {
  margin: 0 0 5px;
}

.judgeCard h3 {
  font-weight: 600;
  font-size: 1.3em;
  font-family: 'Playfair Display', Arial, sans-serif;
}

.judgeCard h4 {
  color: #8c8c8c;
  font-weight: 400;
  letter-spacing: 2px;
}

.judgeCard p {
  font-size: 0.9em;
  letter-spacing: 1px;
  opacity: 0.9;
}

.judgeCard .icons {
  text-align: center;
  width: 100%;
}

.judgeCard i {
  padding: 10px 2px;
  display: inline-block;
  font-size: 18px;
  font-weight: normal;
  color: #e8b563;
  opacity: 0.75;
}

.judgeCard i:hover {
  opacity: 1;
  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease;
}
</style>