<template>
  <v-layout row justify-center>
    <v-dialog v-model="this.$store.state.loginDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
        <v-layout justify-center>
          <span class="headline">Login</span>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
              <v-form v-model.lazy="valid">
                <v-flex xs12>
                  <v-text-field label="Email" required v-model="email" :rules="emailRules"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Password" type="password" required v-model="password" :rules="passwordRules"></v-text-field>
                </v-flex>
              </v-form>
          </v-container>
          <small>*indicates required field</small>
          <v-layout row justify-center v-if="failMessage" class="pt-3">
              <p class="title red--text">{{failMessage}}</p>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-layout justify-center>
            <v-btn color="red" flat @click.native="closeDialog">Close</v-btn>
            <v-btn color="primary"  darkflat @click.native="login">Login</v-btn>
          </v-layout>
        </v-card-actions>
        <v-layout row justify-center pa-4>
          <p>Doesn't have account yet? </p><a @click="gotoSignup" class="pl-2">Sign Up</a>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      email: null,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        /* eslint-disable */
        (v) => /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v) || 'E-mail must be valid'
        /* eslint-enable */
      ],
      password: null,
      passwordRules: [
        (v) => !!v || 'Password is required'
        // (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      failMessage: null
    }
  },
  methods: {
    login () {
      if (this.valid) {
        this.$axios({
          method: 'post',
          url: `/users/login`,
          data: {
            email: this.email,
            password: this.password
          }
        })
          .then(loginResponse => {
            if (loginResponse.status === 200) {
              localStorage.setItem('token', loginResponse.data.token)
              this.$store.commit('getAllQuestions')
              this.email = null
              this.password = null
              this.failMessage = null
              this.$store.state.isLoggedIn = true
              this.$store.state.loginDialog = false
            } else if (loginResponse.status === 202) {
              this.failMessage = loginResponse.data.message
              this.email = null
              this.password = null
            } else {
              this.failMessage = loginResponse.data.message
              this.email = null
              this.password = null
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.failMessage = 'Validation error'
      }
    },
    closeDialog () {
      this.$store.state.loginDialog = false
    },
    gotoSignup () {
      this.$store.state.loginDialog = false
      this.$store.state.signupDialog = true
    }
  }
}
</script>