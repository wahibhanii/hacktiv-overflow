<template>
  <v-container fluid elevation-3 white pa-2>
    <v-layout justify-space-between>
      <v-flex>
        <v-layout>
          <span class="title">{{answer.author.userName}} :</span>
        </v-layout>
        <v-layout class="pt-2">
          <span class="subheading"> {{answer.content}}</span>
        </v-layout>
      </v-flex>
      <v-btn flat color="red" @click="deleteAnswer" v-if="isUserAuth">
        Delete answer
      </v-btn>
  
    </v-layout>
    
  </v-container>
</template>

<script>
import jwt from 'jsonwebtoken'
export default {
  props: ['answer', 'questionId'],
  methods: {
    deleteAnswer () {
      console.log('deleting answer')
      this.$axios({
        method: 'delete',
        url: `/answers/${this.answer._id}`,
        headers: {
          token: localStorage.token
        },
        data: {
          questionId: this.questionId
        }
      })
        .then(deleteResponse => {
          console.log(deleteResponse)
          this.answerContent = null
          this.$emit('deleteAnswer')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    isUserAuth () {
      let userId = jwt.decode(localStorage.token)._id
      return ((userId === this.answer.author._id) || this.$store.state.isAdmin)
    }
  }
}
</script>

<style>

</style>
