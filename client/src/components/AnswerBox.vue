<template>
  <v-container fluid elevation-2>
  <v-layout justify-space-between class="white pa-2" >
    <v-flex>
      <v-layout>
        <span class="subheading">{{answer.author.userName}} :</span>
      </v-layout>
      <v-layout class="pt">
        <span class=""> {{answer.content}}</span>
      </v-layout>
    </v-flex>
    <v-btn icon small flat color="red" @click="deleteAnswer" v-if="isUserAuth">
      <v-icon flat small icon color="red">delete</v-icon>
    </v-btn>
  </v-layout>
  <v-layout justify-space-around>
    <v-btn icon small flat color="blue" @click="upvoteAnswer">
      <v-badge overlay small left bottom color="green" >
        <span slot="badge" dark>{{answer.upvoters.length}}</span>
        <v-icon flat small icon :color="isAnswerUpvoting">thumb_up</v-icon>
      </v-badge>
    </v-btn>
    <v-btn icon small flat color="blue" @click="downvoteAnswer" >
      <v-badge overlay small right bottom color="green" >
        <span slot="badge" dark>{{answer.downvoters.length}}</span>
        <v-icon flat small icon :color="isAnswerDownvoting">thumb_down</v-icon>
      </v-badge>
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
          this.answerContent = null
          this.$emit('deleteAnswer')
        })
        .catch(err => {
          console.log(err)
        })
    },
    upvoteAnswer () {
      this.$axios({
        method: 'put',
        url: `/answers/${this.answer._id}/upvote`,
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          this.$emit('upvoteAnswer')
        })
        .catch(err => {
          console.log(err)
        })
    },
    downvoteAnswer () {
      'downvoting answer'
      this.$axios({
        method: 'put',
        url: `/answers/${this.answer._id}/downvote`,
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          this.$emit('downvoteAnswer')
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
    },
    isAnswerUpvoting () {
      let userId = jwt.decode(localStorage.token)._id
      let isIdMatch = this.answer.upvoters.find(user => {
        return user === userId
      })
      if (isIdMatch !== undefined) {
        return 'blue'
      } else {
        return 'grey'
      }
    },
    isAnswerDownvoting () {
      let userId = jwt.decode(localStorage.token)._id
      let isIdMatch = this.answer.downvoters.find(user => {
        return user === userId
      })
      if (isIdMatch !== undefined) {
        return 'blue'
      } else {
        return 'grey'
      }
    }
  }
}
</script>

<style>

</style>
