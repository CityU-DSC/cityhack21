<template>
  <v-container>
    <v-toolbar flat class="mb-3">
      <v-toolbar-title>Sponsors</v-toolbar-title>
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
    <v-row>
      <v-col v-for="sponsor in diamondSponsors" :key="sponsor.id" cols="12" sm="12" md='6' lg="4">
        <figure class="sponsorCard">
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
            <div class="icons" style="color: #000000;">
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

import awsImage from "../../assets/image/sponsors/AWS.jpg";
import siemensImage from "../../assets/image/sponsors/Siemens.png";
export default {
  name: "sponsors",
  props: {
    value: Boolean,
    isOverView: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      diamondSponsors: [
        {
          name: 'Huawei',
          img: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/9C22/production/_113407993_5ff189dc-c134-4906-8935-a40a13a906d1.jpg',
          brandLogo: 'https://mobilelux.al/wp-content/uploads/2018/03/Huawei.png',
          brandUrl: 'https://consumer.huawei.com/hk/phones/',
          info: 'Huawei is a leading global provider of ICT infrastructure and smart devices.',
          websiteUrl: 'https://consumer.huawei.com/hk/phones/',
          socialMediaUrl: ''
        },
        {
          name: 'AWS',
          img: awsImage,
          brandLogo: 'https://www.shareicon.net/data/256x256/2016/06/21/607538_aws_4096x4096.png',
          brandUrl: 'https://aws.amazon.com/?nc2=h_lg',
          info: 'AWS is the world’s most comprehensive and broadly adopted cloud platform',
          websiteUrl: 'https://aws.amazon.com/?nc2=h_lg',
          socialMediaUrl: ''
        },
        {
          name: 'Siemens Mobility',
          img: "https://group.thinkproject.com/cms/assets/projects/siemens.jpg",
          brandLogo: siemensImage,
          brandUrl: 'https://new.siemens.com/global/en/company/about.html',
          info: 'Siemens Mobility is a leader in transport solutions for more than 160 years.',
          websiteUrl: 'https://www.mobility.siemens.com/global/en.html',
          socialMediaUrl: ''
        },
        {
          name: 'Sense Time',
          img: 'https://inews.gtimg.com/newsapp_bt/0/10193044096/641',
          brandLogo: 'https://s3-us-west-1.amazonaws.com/welcome.ai/attachments/attachments/000/001/588/original/22780528_1132381643558413_1252524198112219533_n_sensetime_welcome_ai.jpg?1517767743',
          brandUrl: 'https://www.sensetime.com/hmt-en?gclid=CjwKCAiAtej9BRAvEiwA0UAWXpe2JrYBEdizIR7TMM09yZtNtiUohK6xd-89tdoqyJhXQBygEW635xoCDg8QAvD_BwE',
          info: 'SenseTime aims to develop AI technologies that advance the world for a better tomorrow.',
          websiteUrl: 'https://www.sensetime.com/hmt-en?gclid=CjwKCAiAtej9BRAvEiwA0UAWXpe2JrYBEdizIR7TMM09yZtNtiUohK6xd-89tdoqyJhXQBygEW635xoCDg8QAvD_BwE',
          socialMediaUrl: ''
        },
        {
          name: 'Sengital',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Streulichtfilterung.3.P1023258.jpg/540px-Streulichtfilterung.3.P1023258.jpg',
          brandLogo: 'https://secure.gravatar.com/blavatar/ff5e861d3e43910df2102e768d3f208e?s=200&ts=1604902363',
          brandUrl: 'https://sengital.com/about/',
          info: 'Sengital has rich experience in sensor and wireless network for IoT applications',
          websiteUrl: 'https://sengital.com/about/',
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
figure.sponsorCard {
  font-family: 'Raleway', Arial, sans-serif;
  position: relative;
  margin: 10px;
  min-width: 260px;
  max-width: 360px;
  max-height: 220px;
  min-height: 200px;
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

figure.sponsorCard figcaption {
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
