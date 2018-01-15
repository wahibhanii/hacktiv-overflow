<template>
  <v-toolbar fixed :clipped-left="true" dark color="orange" app>
    <v-toolbar-side-icon @click="drawerAction"></v-toolbar-side-icon>
    <v-toolbar-title class="white--text" > 
      <v-icon>question_answer</v-icon>
      <span class="white--text hidden-xs-only">HackFLow</span>
    </v-toolbar-title>
    <v-toolbar-title class="white--text" > 
      <span class="white--text hidden-xs-only">
        <v-icon>keyboard_arrow_right</v-icon>
        {{pageName}}
        </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn flat  @click="openLogin" v-if="!isLoggedIn">
      <v-icon>fingerprint</v-icon> 
      <span >Login</span>
    </v-btn>
    <v-menu left min-width=200>
      <v-btn flat icon slot="activator">
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list >
        <v-list-tile>
          <v-list-tile-title v-if="isLoggedIn">Hello, {{userName}}</v-list-tile-title>
          <v-list-tile-title v-else>Hello, Guest</v-list-tile-title>
        </v-list-tile>
        <v-divider/>
        <v-list-tile  v-if="isLoggedIn">
            <v-btn outline @click="logout">
              <v-icon >exit_to_app</v-icon>
              Logout
            </v-btn>
        </v-list-tile>
        <v-divider/>
        <v-list-tile>
          <v-layout class="mt-4">
            <v-switch  label="admin mode" v-model="isAdmin"></v-switch>
          </v-layout>
        </v-list-tile>

      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import jwt from 'jsonwebtoken'
export default {
  data () {
    return {
      isAdmin: false
    }
  },
  methods: {
    drawerAction () {
      console.log(this.$store.state.leftDrawer)
      this.$store.state.leftDrawer = !this.$store.state.leftDrawer
    },
    openLogin () {
      this.$store.state.loginDialog = true
    },
    logout () {
      localStorage.removeItem('token')
      this.$store.state.isLoggedIn = false
    }
  },
  watch: {
    isAdmin () {
      this.$store.state.isAdmin = this.isAdmin
    }
  },
  computed: {
    userName () {
      return jwt.decode(localStorage.token).userName
    },
    isLoggedIn: {
      get () {
        return this.$store.state.isLoggedIn
      }
    },
    pageName () {
      let resultName
      switch (this.$route.name) {
        case 'WelcomePage': resultName = 'Home'; break
        case 'MainEntries': resultName = 'Blog Entries'; break
        case 'BlogEntries': resultName = 'Blog Entries'; break
        case 'AllEntries' : resultName = 'Blog Entries - All'; break
        case 'MyEntries' : resultName = 'Blog Entries - Your\'s'; break
        case 'NewBlog' : resultName = 'New Blog + '; break
        default: resultName = null; break
      }
      return resultName
    }
  }
}
</script>
