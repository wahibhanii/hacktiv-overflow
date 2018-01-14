<template>
  <v-navigation-drawer 
    fixed
    dark
    v-model="leftDrawer" 
    :clipped="true"
    app>
    <v-list class="pt-0" >
      <v-list-tile @click="gotoHome">
        <v-list-tile-action>
          <v-icon>home </v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="gotoNewQuestion" >
        <v-list-tile-action >
          <v-icon>fiber_new</v-icon>
        </v-list-tile-action>
        <v-list-tile-content >
          <v-list-tile-title>Write new Question!</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="gotoBrowse" >
        <v-list-tile-action >
          <v-icon>search</v-icon>
        </v-list-tile-action>
        <v-list-tile-content >
          <v-list-tile-title>Browse Questions</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  methods: {
    gotoNewQuestion () {
      this.$router.push({name: 'NewQuestion'})
    },
    gotoHome () {
      this.$router.push({name: 'WelcomePage'})
    },
    gotoBrowse () {
      this.$router.push({ name: 'MainEntries' })
    }
  },
  computed: {
    leftDrawer: {
      get () {
        return this.$store.state.leftDrawer
      },
      set (value) {
        this.$store.state.leftDrawer = value
      }
    }
  },
  updated () {
  }
}
</script>
