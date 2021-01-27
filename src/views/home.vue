<template>
  <div>
    <Carousel/>
    <!-- <v-btn
        class="mx-2 btn btn-marquee"
        dark
        x-large
        @click.stop="gotoRegister"
    >
      Registration
    </v-btn> -->
  </div>
</template>

<script>
import Carousel from '../components/landingPage/carousel';

export default {
  name: "home",
  components: {
    Carousel,
  },
  data() {
    return {}
  },
  methods: {
    // gotoRegister() {
    //   this.$router.push({name: 'register'});
    // }
  }
}
</script>

<style lang="scss" scoped>
$white: #121212;
$black: #ff9900;
$red1: #ffffff;
$red2: #c92918;
$colorPrimary: $red1;
$colorSecondary: $red2;
$cubic-bezier: cubic-bezier(0.68, -0.55, 0.265, 1.55);

//split button mixin
@mixin btn__split($foregroundColor, $backgroundColor, $textColor) {
  button.btn {
    text-transform: uppercase;
    text-decoration: none;
    font-weight: 700;
    border: 0;
    //display: block;
    position: fixed;
    right: -155px;
    bottom: 8em;
    letter-spacing: 0.15em;
    padding: 1rem 2.5rem;
    background: transparent;
    outline: none;
    font-size: 28px;
    color: $textColor;
    -moz-transform:rotate(90deg);
    -ms-transform:rotate(90deg);
    -o-transform:rotate(90deg);
    -webkit-transform:rotate(90deg);
    transition: all 0.5s $cubic-bezier 0.15s;
    &::after,
    &::before {
      border: 0;
      content: "";
      position: absolute;
      height: 10%;
      width: 10%;
      transition: all 0.5s $cubic-bezier;
      z-index: -2;
    }
    &::before {
      border: 0;
      background-color: $backgroundColor;
      top: -0.75rem;
      left: 0.5rem;
      animation: topAnimation 2s $cubic-bezier 0.25s infinite alternate;
    }
    &::after {
      background-color: $foregroundColor;
      top: 3rem;
      left: 13rem;
      animation: bottomAnimation 2s $cubic-bezier 0.5s infinite alternate;
    }
    &:hover {
      color: black;
      &::before,
      &::after {
        top: 0;
        //transform: skewx(-10deg);
        height: 100%;
        width: 100%;
        border-radius: 0;
        animation: none;
      }
      &::after {
        left: 0rem;
      }
      &::before {
        top: 0.5rem;
        left: 0.35rem;
      }
    }
  }
}

@keyframes topAnimation {
  from {
    transform: translate(0rem, 0);
  }
  to {
    transform: translate(0rem, 3.5rem);
  }
}
@keyframes bottomAnimation {
  from {
    transform: translate(-11.5rem, 0);
  }
  to {
    transform: translate(0rem, 0);
  }
}

@include btn__split($colorPrimary, $colorSecondary, $black);
</style>
