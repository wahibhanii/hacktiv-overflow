<template>
  <div>
    <top-navbar app></top-navbar>
    <v-content >
      <router-view></router-view>
    </v-content>
    <left-drawer app/>
    <login-dialog></login-dialog>
    <sign-up-dialog></sign-up-dialog>
  
    
  </div>
</template>

<script>
  import TopNavbar from './TopNavbar'
  import LeftDrawer from './LeftDrawer'
  import LoginDialog from './LoginDialog'
  import SignUpDialog from './SignUpDialog'
  export default {
    data () {
      return {
      }
    },
    components: {
      TopNavbar, LeftDrawer, LoginDialog, SignUpDialog
    }
  }
</script>