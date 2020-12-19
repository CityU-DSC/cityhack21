<template>
  <div id="clock">
    <p class="date">{{ date }}</p>
    <p class="time">{{ time }}</p>
    <p class="text">DIGITAL CLOCK with Vue.js</p>
  </div>
</template>

<script>
  function zeroPadding(num, digit) {
              var zero = '';
              for(var i = 0; i < digit; i++) {
                zero += '0';
              }
              return (zero + num).slice(-digit);
            }
    export default {
        name: 'clock',
        data() {
          return {
            date: '',
            time: '',
            week: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
          }
        },
        methods: {
          updateTime() {
            var cd = new Date();
            this.time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
            this.date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth()+1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + this.week[cd.getDay()];
          }
        },
        mounted (){
          this.timerId = setInterval(this.updateTime, 1000);
        },
    }
</script>
<style lang="scss" scoped>
html,body {
    height: 100%;
}
body {
    background: #0f3854;
    background: radial-gradient(ellipse at center,  #0a2e38  0%, #000000 70%);
    background-size: 100%;
}
p {
    margin: 0;
    padding: 0;
}
#clock {
    font-family: 'Share Tech Mono', monospace;
    color: #ffffff;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #daf6ff;
    text-shadow: 0 0 20px rgba(10, 175, 230, 1),  0 0 20px rgba(10, 175, 230, 0);
    .time {
        letter-spacing: 0.05em;
        font-size: 80px;
        padding: 5px 0;
    }
    .date {
        letter-spacing: 0.1em;
        font-size: 24px;
    }
    .text {
        letter-spacing: 0.1em;
        font-size: 12px;
        padding: 20px 0 0;
    }
}
</style>

