<template>
  <div>
    <v-breadcrumbs
        :items="navSlides"
        large
        class="text-center"
    >
      <template v-slot:item="{item}">
        <v-breadcrumbs-item class="v-chip--clickable" @click="quickNavigate(item.id)">
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>


    <carousel-3d
        :width="1000" height="500"
        :controls-visible="true"
        :controls-prev-html="'&#10092; '"
        :controls-next-html="'&#10093;'"
        :controls-width="30" :controls-height="30"
        :clickable="false"
    >
      <slide v-for="(slide, i) in slides" :index="i" :key="slide.id">
        <div class="slide-header" align="center">
          <h3>{{ slide.name }} </h3>
        </div>
        <figure>
          <img :src="slide.img" alt="">
        </figure>
        <figcaption>
          <v-btn
              dark
              rounded
              color="rgba(235, 173, 0, 1)"
              class="bounce"
              @click.stop="viewDetail(slide.id)"
          >
            View More
            <v-icon right>
              {{ openDetail ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
              mdi-chevron-down
            </v-icon>
          </v-btn>
        </figcaption>
      </slide>
    </carousel-3d>
    <div v-if="selectedSlideId===1">
      <AboutUs v-model="openDetail" @close="closeDetail"/>
    </div>
    <div v-if="selectedSlideId===2">
      <RulesAndCriteria v-model="openDetail" @close="closeDetail"/>
    </div>
    <div v-if="selectedSlideId===3">
      <TimeLine v-model="openDetail" @close="closeDetail"/>
    </div>
    <div v-if="selectedSlideId===4">
      <Prizes v-model="openDetail" @close="closeDetail"/>
    </div>
    <div v-if="selectedSlideId===5">
      <QandA v-model="openDetail" @close="closeDetail"/>
    </div>
    <div v-if="selectedSlideId === 6">
      <Judges v-model="openDetail" @close="closeDetail"/>
    </div>
    <div v-if="selectedSlideId===7">
      <Sponsors v-model="openDetail" @close="closeDetail"/>
    </div>
  </div>
</template>

<script>
import imageOne from "../../assets/image/slides/1.jpg";
import imageTwo from "../../assets/image/slides/2.jpg";
import imageThree from "../../assets/image/slides/3.jpg";
import imageFour from "../../assets/image/slides/4.jpg";
import imageFive from "../../assets/image/slides/5.jpg";
import imageSix from "../../assets/image/slides/6.jpg";
import imageSeven from "../../assets/image/slides/7.jpg";

import AboutUs from "./aboutUs";
import TimeLine from "./timeLine";
import Judges from "./judges";
import Prizes from "./prizes";
import RulesAndCriteria from "./rulesAndCriteria";
import Sponsors from './sponsors';
import QandA from "./QandA";

export default {
  name: "carousel",
  components: {
    AboutUs,
    TimeLine,
    Judges,
    Prizes,
    RulesAndCriteria,
    Sponsors,
    QandA,
  },
  data() {
    return {
      navSlides: [
        {id: 1, text: 'About CityHack'},
        {id: 2, text: 'Rules & Judging Criteria'},
        {id: 3, text: 'TimeLine'},
        {id: 4, text: 'Prizes'},
        {id: 5, text: 'Q&As'},
        {id: 6, text: 'Judges'},
        {id: 7, text: 'Sponsors'},
      ],
      slides: [
        {id: 1, name: "About CityHack", img: imageOne},
        {id: 2, name: "Rules & Judging Criteria", img: imageThree},
        {id: 3, name: "TimeLine", img: imageTwo},
        {id: 4, name: "Prizes", img: imageFour},
        {id: 5, name: "Q&As", img: imageFive},
        {id: 6, name: "Judges", img: imageSix},
        {id: 7, name: "Sponsors", img: imageSeven},
      ],
      count: null,
      selectedSlideId: null,
      openDetail: false,
    }
  },
  methods: {
    quickNavigate(slideId) {
      console.log(slideId);
      this.selectedSlideId = slideId;
    },
    viewDetail(slideId) {
      if (this.openDetail && this.selectedSlideId !== slideId) {
        this.closeDetail();
        this.selectedSlideId = slideId;
        this.openDetail = true;
      } else if (this.openDetail && this.selectedSlideId === slideId) {
        this.closeDetail();
      } else {
        this.selectedSlideId = slideId;
        this.openDetail = true;
      }
    },
    closeDetail() {
      this.selectedSlideId = null;
      this.openDetail = false;
    }
  }
}
</script>

<style scoped>
ul {
  width: 50%;
  margin: auto;
}

li:hover {
  color: #ebad00;
}

.carousel-3d-container figure {
  margin: 0;
  object-fit: cover;
}

.carousel-3d-container figcaption[data-v-05ba4f99] {
  background-color: rgba(0, 0, 0, 0);
  margin-left: 26rem;
  margin-bottom: 1rem;
}

.bounce {
  animation: bounce 2s 1;
}

@keyframes bounce {
  20%, 53%, 80%, 0%, 100% {
    -webkit-animation-timing-function: cubic-bezier(0.215, .61, .355, 1);
    animation-timing-function: cubic-bezier(0.215, .61, .355, 1);
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    -webkit-animation-timing-function: cubic-bezier(0.755, .050, .855, .060);
    animation-timing-function: cubic-bezier(0.755, .050, .855, .060);
    -webkit-transform: translate3d(0, -30px, 0);
    transform: translate3d(0, -30px, 0);
  }
  70% {
    -webkit-animation-timing-function: cubic-bezier(0.755, .050, .855, .060);
    animation-timing-function: cubic-bezier(0.755, .050, .855, .060);
    -webkit-transform: translate3d(0, -15px, 0);
    transform: translate3d(0, -15px, 0);
  }
  90% {
    -webkit-transform: translate3d(0, -4px, 0);
    transform: translate3d(0, -4px, 0);
  }
}

.carousel-3d-slide {
  background-color: rgba(0, 0, 0, 0.9);
  border-color: aliceblue;
}

.slide-header {
  padding-top: .5rem;
  color: aliceblue;
}

.carousel-3d-container figcaption {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: rgb(255, 153, 0);
  bottom: 0;
  padding: 15px;
  font-size: 12px;
  min-width: 100%;
  box-sizing: border-box;
}
</style>