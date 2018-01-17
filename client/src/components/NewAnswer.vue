<template>
  <v-container class="white" elevation-3 fluid>
        <v-layout  row class="">
           <h1 class="title">Post New Answer</h1>
        </v-layout>
        <v-form class="">
          <v-layout row>
            <v-text-field
              label="Your Answer"
              v-model="answerContent"
              multi-line
              light
            >
            </v-text-field>
          </v-layout>
        </v-form>
        <v-layout row justify-center >
          <v-btn color="orange lighten-1" large dark @click="postAnswer">
            <v-icon>add</v-icon>Post Answer
          </v-btn>
        </v-layout>
      </v-container>
</template>

<script>
export default {
  data () {
    return {
      answerContent: ''
    }
  },
  props: [
    'questionId'
  ],
  methods: {
    postAnswer () {
      this.$axios({
        method: 'post',
        url: `/answers/`,
        headers: {
          token: localStorage.token
        },
        data: {
          questionId: this.questionId,
          content: this.answerContent
        }
      })
        .then(response => {
          this.answerContent = null
          this.$emit('postAnswer')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
