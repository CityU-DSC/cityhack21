<template>
  <div>
    <carousel-3d
        :width="1000" height="500"
        :controls-visible="true" :controls-prev-html="'&#10092; '" :controls-next-html="'&#10093;'"
        :controls-width="30" :controls-height="30" :clickable="false">
      <slide v-for="(slide, i) in slides" :index="i" :key="slide.id" @>
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
              mdi-chevron-down
            </v-icon>
          </v-btn>
        </figcaption>
      </slide>
    </carousel-3d>
    <div v-if="selectedSlideId===1">
      <AboutUs v-model="openDetail" @close="closeDetail"/>
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

export default {
  name: "carousel",
  components: {
    AboutUs,
  },
  data() {
    return {
      slides: [
        {id: 1, name: "About CityHack", img: imageOne},
        {id: 2, name: "Rules", img: imageThree},
        {id: 3, name: "TimeLine", img: imageTwo},
        {id: 4, name: "Prizes", img: imageFour},
        {id: 5, name: "FAQs", img: imageFive},
        {id: 6, name: "Judges", img: imageSix},
        {id: 7, name: "Sponsors", img: imageSeven},
      ],
      selectedSlideId: null,
      openDetail: false,
    }
  },
  methods: {
    viewDetail(slideId) {
      this.selectedSlideId = slideId;
      this.openDetail = true;
      console.log(this.selectedSlideId, this.openDetail);
    },
    closeDetail() {
      this.selectedSlideId = null;
      this.openDetail = false;
    }
  }
}
</script>

<style scoped>
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
  animation: bounce 2s 3;
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