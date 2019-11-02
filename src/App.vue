<template>
  <div id="app" :style="{background: gradient}">
    <h1 style="font-family: 'Sacramento', cursive !important">Linear-Mixr</h1>
    <ColorCard msg="Welcome to Linear Mixr"/>

    <Footer></Footer>
  </div>
</template>

<script>
import ColorCard from './components/ColorCard.vue'
import Footer from './components/footer'
import { bus } from './main'

export default {
  name: 'app',
  components: {
    ColorCard,
    Footer
  },
  data: () => {
    return {
      gradient: ''
    }
  },
  created() {
    bus.$on('gradientChanged', (data) => {
      this.gradient = data;
    })
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');
@import url('https://fonts.googleapis.com/css?family=Sacramento&display=swap');

#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: whitesmoke;
  padding-top: 60px;
  min-height: 100%;
}

img {
  height: 50px;
}
</style>
