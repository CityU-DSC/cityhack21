<template>
  <carousel-3d
      :width="1000" height="500"
      :controls-visible="true" :controls-prev-html="'&#10092; '" :controls-next-html="'&#10093;'"
      :controls-width="30" :controls-height="30" :clickable="false">
    <slide v-for="(slide, i) in slides" :index="i" :key="slide.id">
      <figure>
        <img src="https://placehold.it/1000x500" alt="">
      </figure>
    </slide>
  </carousel-3d>
</template>

<script>

export default {
  name: "carousel",
  data() {
    return {
      slides: 7
    }
  },
}
</script>

<style scoped>
.carousel-3d-container figure {
  margin: 0;
}

.carousel-3d-container figcaption {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  bottom: 0;
  padding: 15px;
  font-size: 12px;
  min-width: 100%;
  box-sizing: border-box;
}
</style>