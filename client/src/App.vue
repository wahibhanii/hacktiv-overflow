<template>
  <div id="app">
    <v-app>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
import store from './vuex/index'

export default {
  name: 'app',
  store,
  data () {
    return {
    }
  },
  created () {
    this.$store.commit('setLoginStatus')
    this.$store.commit('getAllQuestions')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
