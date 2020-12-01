<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title>CityHack 2021 Prizes</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-row>
      <v-col cols="12" sm="12" md='6' lg="4" v-for="prize in prizes" :key="prize.id">
        <figure class="prizeCard">
          <img :src="prize.img" alt="prize image"/>
          <figcaption>
            <v-avatar class="mb-2">
              <img
                  :src="prize.brandLogo"
                  alt="brand logo"
              >
              <a :href="prize.brandUrl" target="_blank" />
            </v-avatar>
            <h4> {{prize.brand}} <span>{{ prize.name }}</span></h4>
            <p> $ {{prize.value}} HKD</p>
          </figcaption>
        </figure>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "prizes",
  props: {
    value: Boolean
  },
  data() {
    return {
      prizes: [
        {
          name: 'Old Radio',
          brand: 'OldSchool',
          brandLogo: 'https://cdn.vuetifyjs.com/images/john.jpg',
          brandUrl: 'https://cityu-hall2.github.io/',
          img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample103.jpg',
          value: '1,500',
        },
        {
          name: 'AWS Develop kit',
          brand: 'AWS Educate',
          brandLogo: 'https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/r4wsu8rl4jvpjydbhooy',
          brandUrl: 'https://cityu-hall2.github.io/',
          img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample104.jpg',
          value: '5,250',
        },
        {
          name: 'Google Support',
          brand: 'Google',
          brandLogo: 'https://cdn.iconscout.com/icon/free/png-256/google-146-189804.png',
          brandUrl: 'https://cityu-hall2.github.io/',
          img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample105.jpg',
          value: '600',
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
.prizeCard {
  background-color: #fff;
  color: #444;
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  margin: 8px;
  max-width: 340px;
  min-width: 260px;
  overflow: hidden;
  position: relative;
  text-align: center;
  width: 100%;
}

.prizeCard * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.45s ease;
  transition: all 0.45s ease;
}

.prizeCard:after {
  background-color: #ebad00;
  height: 150%;
  bottom: -145%;
  content: '';
  left: 0;
  right: 0;
  position: absolute;
  -webkit-transition: all 0.5s linear;
  transition: all 0.5s linear;
}

.prizeCard img {
  vertical-align: top;
  max-width: 100%;
  backface-visibility: hidden;
}

.prizeCard figcaption {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.1em;
  opacity: 0;
  -webkit-transition-delay: 0s;
  transition-delay: 0s;
}

.prizeCard h4 {
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 1px;
  margin: 0;
  text-transform: uppercase;
}

.prizeCard h4 span {
  display: block;
  font-size: 25px;
  font-weight: 700;
}

.prizeCard p {
  font-size: 12px;
  font-style: italic;
  font-weight: normal;
}

.prizeCard a {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.prizeCard:hover > img,
.prizeCard.hover > img {
  opacity: 0.1;
}

.prizeCard:hover:after,
.prizeCard.hover:after {
  bottom: 95%;
}

.prizeCard:hover figcaption,
.prizeCard.hover figcaption {
  opacity: 1;
  -webkit-transition-delay: 0.4s;
  transition-delay: 0.4s;
}
</style>