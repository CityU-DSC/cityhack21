<template>
  <div class="mt-5">
    <carousel-3d
        :width="1000" height="500"
        :controls-visible="true"
        :controls-prev-html="'&#10092; '"
        :controls-next-html="'&#10093;'"
        :controls-width="30" :controls-height="30"
        :clickable="false"
        @before-slide-change="onBeforeSlideChange"
    >
      <slide v-for="(slide, i) in slides" :index="i" :key="slide.id">
        <div class="slide-header" align="center">
          <h3>{{ slide.name }} </h3>
        </div>
        <figure>
          <img style="top: -10px;" :src="slide.img" alt="">
        </figure>
      </slide>
    </carousel-3d>
    <div v-if="selectedSlideId===1"> <AboutUs/> </div>
    <div v-if="selectedSlideId===2"> <Prizes/> </div>
    <div v-if="selectedSlideId===3"> <RulesAndCriteria/> </div>
    <div v-if="selectedSlideId===4"> <TimeLine/> </div>
    <div v-if="selectedSlideId===5"> <QandA/> </div>
    <!--    <div v-if="selectedSlideId === 6"><Judges/></div>-->
    <div v-if="selectedSlideId===6"> <Sponsors/> </div>
  </div>
</template>

<script>
import imageOne from "../../assets/image/slides/1.jpg";
import imageTwo from "../../assets/image/slides/2.jpg";
import imageThree from "../../assets/image/slides/3.jpg";
// import imageFour from "../../assets/image/slides/4.jpg";
import imageFive from "../../assets/image/slides/5.jpg";
// import imageSix from "../../assets/image/slides/6.jpg";
import imageSeven from "../../assets/image/slides/7.jpg";
import imagePrize from "../../assets/image/slides/8.jpg";

import AboutUs from "./aboutUs";
import TimeLine from "./timeLine";
// import Judges from "./judges";
import Prizes from "./prizes";
import RulesAndCriteria from "./rulesAndCriteria";
import Sponsors from './sponsors';
import QandA from "./QandA";

export default {
  name: "carousel",
  components: {
    AboutUs,
    TimeLine,
    // Judges,
    Prizes,
    RulesAndCriteria,
    Sponsors,
    QandA,
  },
  data() {
    return {
      navSlides: [
        {id: 1, text: 'About CityHack'},
        {id: 2, text: 'Prizes'},
        {id: 3, text: 'Rules & Judging Criteria'},
        {id: 4, text: 'TimeLine'},
        {id: 5, text: 'Q&As'},
        // {id: 6, text: 'Judges'},
        {id: 6, text: 'Sponsors'},
      ],
      slides: [
        {id: 1, name: "About CityHack", img: imageOne},
        {id: 2, name: "Prizes", img: imagePrize},
        {id: 3, name: "Rules & Judging Criteria", img: imageThree},
        {id: 4, name: "TimeLine", img: imageTwo},
        {id: 5, name: "Q&As", img: imageFive},
        // {id: 6, name: "Judges", img: imageSix},
        {id: 6, name: "Sponsors", img: imageSeven},
      ],
      count: null,
      selectedSlideId: 1,
      openDetail: false,
    }
  },
  methods: {
    onBeforeSlideChange(index) {
      this.selectedSlideId = index+1;
    },
  }
}
</script>

<style>
.next[data-v-05517ad0], .prev[data-v-05517ad0] {
  color: white !important;
}

.carousel-3d-container figure {
  margin: 0;
  object-fit: cover;
}

.carousel-3d-container figcaption[data-v-05ba4f99] {
  background-color: rgba(0, 0, 0, 0);
  /* margin-left: 26rem; */
  margin-bottom: 1rem;

  display: flex;
  justify-content: center;
}

.carousel-3d-slide {
  background-color: #272727 !important;
  color: #121212;
}

.slide-header {
  padding-top: .5rem;
  color: #ffffff;
}

.carousel-3d-container figcaption {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  right: 0;
  padding: 15px;
  font-size: 12px;
  min-width: 100%;
  box-sizing: border-box;
}
</style>
