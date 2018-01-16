<template>
  <div>
    <v-tabs grow class="vtab">
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
    <div class="viewPane">
      <router-view class="scrollable"></router-view>
    </div>
    
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
.vtab {
  position: fixed;
  z-index: 10;
}

.viewPane {
  /* position: fixed; */
  padding-top: 12%;
  overflow: scroll;
  
}

.scrollable {
  overflow: scroll
}
</style>
