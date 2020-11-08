<template>
  <v-container>
    <v-toolbar flat class="mb-3">
      <v-toolbar-title>CityHack 2021 Sponsors</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <div class="text-center">
      <v-chip
          color="#b9f2ff"
          style="padding: 2rem 1.8rem 1.5rem 2rem; color: white;"
      >
        <h1 style="font-weight: normal"> Diamond Sponsor</h1>
      </v-chip>
    </div>
    <v-row>
      <v-col v-for="sponsor in diamondSponsors" :key="sponsor.id" cols="12" sm="12" md='6' lg="4">
        <figure class="sponsorCard yellow">
          <img :src="sponsor.img" alt="sponsor img"/>
          <figcaption>
            <div class="sponsorName">
              <img
                  :src="sponsor.brandLogo"
                  alt="brand logo"
                  width="100"
              >
              <a :href="sponsor.brandUrl" target="_blank"/>
            </div>
          </figcaption>
          <div class="reverse">
            <div class="icons">
              <h5>{{ sponsor.name }}</h5>
              <p>{{ sponsor.info }} </p>
              <a :href="sponsor.websiteUrl">
                <v-icon>mdi-web</v-icon>
              </a>
              <a :href="sponsor.socialMediaUrl">
                <v-icon>mdi-facebook</v-icon>
              </a>
            </div>
          </div>
        </figure>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-chip
          class="mt-5"
          color="#ebad00"
          style="padding: 2rem 1.8rem 1rem 2rem; color: white;"
      >
        <h3 style="font-weight: normal"> Golden Sponsor</h3>
      </v-chip>
    </div>
    <v-row>
      <v-col v-for="sponsor in diamondSponsors" :key="sponsor.id" cols="12" sm="12" md='6' lg="4">
        <figure class="sponsorCard yellow">
          <img :src="sponsor.img" alt="sponsor img"/>
          <figcaption>
            <div class="sponsorName">
              <img
                  :src="sponsor.brandLogo"
                  alt="brand logo"
                  width="100"
              >
              <a :href="sponsor.brandUrl" target="_blank"/>
            </div>
          </figcaption>
          <div class="reverse">
            <div class="icons">
              <h5>{{ sponsor.name }}</h5>
              <p>{{ sponsor.info }} </p>
              <a :href="sponsor.websiteUrl">
                <v-icon>mdi-web</v-icon>
              </a>
              <a :href="sponsor.socialMediaUrl">
                <v-icon>mdi-facebook</v-icon>
              </a>
            </div>
          </div>
        </figure>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-chip
          class="mt-5"
          color="#c0c0c0"
          style="padding: 1.8rem 1.8rem 1rem 2rem; color: white;"
      >
        <h5 style="font-weight: normal"> Silver Sponsor</h5>
      </v-chip>
    </div>
    <v-row>
      <v-col v-for="sponsor in diamondSponsors" :key="sponsor.id" cols="12" sm="12" md='6' lg="4">
        <figure class="sponsorCard yellow">
          <img :src="sponsor.img" alt="sponsor img"/>
          <figcaption>
            <div class="sponsorName">
              <img
                  :src="sponsor.brandLogo"
                  alt="brand logo"
                  width="100"
              >
              <a :href="sponsor.brandUrl" target="_blank"/>
            </div>
          </figcaption>
          <div class="reverse">
            <div class="icons">
              <h5>{{ sponsor.name }}</h5>
              <p>{{ sponsor.info }} </p>
              <a :href="sponsor.websiteUrl">
                <v-icon>mdi-web</v-icon>
              </a>
              <a :href="sponsor.socialMediaUrl">
                <v-icon>mdi-facebook</v-icon>
              </a>
            </div>
          </div>
        </figure>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "sponsors",
  props: {
    value: Boolean
  },
  data() {
    return {
      diamondSponsors: [
        {
          name: 'CityU CS',
          img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample49.jpg',
          brandLogo: 'https://www.cityu.edu.hk/cityu30/img/favicon.ico',
          brandUrl: '',
          info: 'rhtithr ihttruo htoteo rwjojwo jer ewoijo jwo jrr ee',
          websiteUrl: '',
          socialMediaUrl: ''
        },
        {
          name: 'CityU CS',
          img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample54.jpg',
          brandLogo: 'https://www.cityu.edu.hk/cityu30/img/favicon.ico',
          brandUrl: '',
          info: 'rhtithr ihttruo htoteo rwjojwo jer ewoijo jwo jrr ee',
          websiteUrl: '',
          socialMediaUrl: ''
        },
        {
          name: 'CityU CS',
          img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample8.jpg',
          brandLogo: 'https://www.cityu.edu.hk/cityu30/img/favicon.ico',
          brandUrl: '',
          info: 'rhtithr ihttruo htoteo rwjojwo jer ewoijo jwo jrr ee',
          websiteUrl: '',
          socialMediaUrl: ''
        },
      ],
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
figure.sponsorCard {
  font-family: 'Raleway', Arial, sans-serif;
  position: relative;
  margin: 10px;
  min-width: 260px;
  max-width: 360px;
  max-height: 220px;
  width: 100%;
  overflow: hidden;
  text-align: center;
  background: #000000;
  -webkit-perspective: 50em;
  perspective: 50em;
}

figure.sponsorCard * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.25s ease-in-out;
  transition: all 0.25s ease-in-out;
}

figure.sponsorCard img {
  opacity: 0.3;
  max-width: 100%;
  position: relative;
  top: 0;
  left: 0;
}

figure.sponsorCard figcaption,
figure.sponsorCard .reverse {
  position: absolute;
  top: 30px;
  bottom: 30px;
  left: 30px;
  right: 30px;
}

figure.sponsorCard figcaption {
  background: #000000;
  -webkit-transform: rotateX(0);
  transform: rotateX(0);
  -webkit-transition-delay: 0.3s;
  transition-delay: 0.3s;
}

figure.sponsorCard figcaption .sponsorName {
  color: white;
  margin-top: 10%;
}

figure.sponsorCard figcaption .sponsorName img {
  opacity: 1;
}

figure.sponsorCard .reverse {
  background: rgba(255, 255, 255, 0.8);
  opacity: 0.5;
  -webkit-transform: rotateX(-90deg);
  transform: rotateX(-90deg);
  -webkit-transition-delay: 0s;
  transition-delay: 0s;
}

figure.sponsorCard .icons {
  top: 50%;
  width: 100%;
  position: absolute;
  text-align: center;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}

figure.sponsorCard a {
  opacity: 0.55;
}

figure.sponsorCard a:hover {
  opacity: 0.9;
}

figure.sponsorCard {
  background: #000000;
}

figure.sponsorCard.yellow figcaption {
  background: rgba(235, 173, 0, 0);
}

figure.sponsorCard:hover img,
figure.sponsorCard.hover img {
  opacity: 1;
}

figure.sponsorCard:hover figcaption,
figure.sponsorCard.hover figcaption {
  opacity: 0.5;
  -webkit-transform: rotateX(90deg);
  transform: rotateX(90deg);
  -webkit-transition-delay: 0s;
  transition-delay: 0s;
}

figure.sponsorCard:hover .reverse,
figure.sponsorCard.hover .reverse {
  opacity: 1;
  -webkit-transform: rotateX(0);
  transform: rotateX(0);
  -webkit-transition-delay: 0.3s;
  transition-delay: 0.3s;
}
</style>