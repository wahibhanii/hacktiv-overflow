<template>
  <div>
    <v-tabs grow>
      <v-tabs-bar color="cyan darken-1" dark>
        <v-tabs-item
          href="#posts"
          ripple
          @click="seeAllEntries"
        >
          <span class="title">All </span>
        </v-tabs-item>
         <v-tabs-item
          href="#users"
          ripple
          @click="seeMyEntries"
        >
          <span class="title">By You</span>
        </v-tabs-item>
        <v-tabs-slider color="yellow" class="pt-1"></v-tabs-slider>
      </v-tabs-bar>
    </v-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    seeAllEntries () {
      this.$router.push({name: 'AllEntries'})
    },
    seeMyEntries () {
      this.$router.push({name: 'MyEntries'})
    }
  }
}
</script>

<style>
</style>
