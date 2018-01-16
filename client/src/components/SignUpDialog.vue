<template>
  <v-layout row justify-center>
    <v-dialog v-model="this.$store.state.signupDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
        <v-layout justify-center>
          <span class="headline">Sign Up</span>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
              <v-form v-model.lazy="valid">
                <v-flex xs12>
                  <v-text-field label="Email" required v-model="email" :rules="emailRules"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Name" required v-model="userName"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Password" type="password" required v-model="password" :rules="passwordRules"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Re-enter Password" type="password" required v-model="passwordConf" :rules="passwordRules"></v-text-field>
                </v-flex>
              </v-form>
          </v-container>
          <small>*indicates required field</small>
          <v-layout row justify-center v-if="failMessage">
              <p class="subheading red--text">{{failMessage}}</p>
            </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-layout justify-center>
            <v-btn color="red" flat @click.native="closeDialog">Close</v-btn>
            <v-btn color="primary"  darkflat @click.native="signUp">Sign Up</v-btn>
          </v-layout>
        </v-card-actions>
        <v-layout row justify-center pa-4>
          <p>Already have account </p><a @click="gotoSignup" class="pl-2">Log in</a>
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
      userName: null,
      email: null,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        /* eslint-disable */
        (v) => /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v) || 'E-mail must be valid'
        /* eslint-enable */
      ],
      password: null,
      passwordConf: null,
      passwordRules: [
        (v) => !!v || 'Password is required'
        // (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      failMessage: null
    }
  },
  methods: {
    signUp () {
      if (this.valid) {
        if (this.password !== this.passwordConf) {
          this.failMessage = 'Password not matched please re-enter password'
          this.passwordConf = null
        } else {
          this.$axios({
            method: 'post',
            url: `/users`,
            data: {
              email: this.email,
              password: this.password,
              userName: this.userName
            }
          })
            .then(signUpResponse => {
              console.log(signUpResponse)
              if (signUpResponse.status === 200) {
                this.email = null
                this.password = null
                this.failMessage = null
                this.userName = null
                this.passwordConf = null
                this.valid = false
                this.$store.state.loginDialog = true
                this.$store.state.signupDialog = false
              } else if (signUpResponse.status === 202) {
                this.failMessage = signUpResponse.data.message
              } else {
                this.failMessage = signUpResponse
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      } else {
        this.failMessage = 'Validation error'
      }
    },

    closeDialog () {
      this.$store.state.signupDialog = false
    },
    gotoSignup () {
      this.$store.state.loginDialog = true
      this.$store.state.signupDialog = false
    }
  }
}
</script>