<template>
  <div>
    <v-container class="pa-5" fluid>
      <v-container class="cyan" elevation-3>
          <v-layout row>
            <h1 class="display-2">{{question.title}}</h1>
          </v-layout>
          <v-layout row class="pt-3 pb-3 pl-3">
            <em class="title">By {{question.author.userName}}, at {{questionDate}}</em>
          </v-layout>
        <v-layout class="pt-4 pl-4" justify-left>
            <p align="left">{{question.content}}</p>
        </v-layout>
        <v-layout row justify-end v-if="isUserAuth">
          <v-btn color="orange lighten-1" small dark @click="gotoEditQuestion">
            <v-icon class="pr-2">edit</v-icon> Edit Question
          </v-btn>
        </v-layout>
        <v-layout row justify-end v-if="isUserAuth">
          <v-btn color="red" small dark @click="deleteQuestion">
            <v-icon class="pr-2">delete</v-icon> Delete
          </v-btn>
        </v-layout>
      </v-container>
    </v-container>
    <v-container>
      <v-container v-for="(answer, i) in question.answers" :key="i" fluid class="orange">
        <answer-box :answer="answer" :questionId="question._id" @deleteAnswer="getQuestion"></answer-box>
      </v-container>
    </v-container>
    <v-container>
      <new-answer :questionId="question._id" @postAnswer="getQuestion"></new-answer>
    </v-container>
  </div>
</template>

<script>
import jwt from 'jsonwebtoken'
import AnswerBox from './AnswerBox'
import NewAnswer from './NewAnswer'

export default {
  data () {
    return {
      question: {
        title: '',
        content: '',
        answers: [],
        createdAt: '',
        author: {
          userName: ''
        }
      }
    }
  },
  components: {
    AnswerBox, NewAnswer
  },
  props: ['id'],
  methods: {
    getQuestion () {
      console.log('getting question . . .')
      this.$axios({
        method: 'get',
        url: `/questions/${this.id}`,
        headers: {token: localStorage.token}
      })
        .then(response => {
          console.log('get data ok', response)
          this.question = response.data.data
          console.log(this.question.content)
        })
        .catch(err => {
          console.log(err)
        })
    },
    gotoEditQuestion () {
      this.$router.push({name: 'EditQuestion', params: {id: this.question._id}})
    },
    deleteQuestion () {
      console.log('deleting question')
      this.$axios({
        method: 'delete',
        url: `/questions/${this.id}`,
        headers: {token: localStorage.token}
      })
        .then(response => {
          console.log('get data ok', response)
          console.log(this.question.content)
          this.$store.commit('getAllQuestions')
          this.$router.push({name: 'AllEntries'})
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    questionDate () {
      let date = Date(this.question.createdAt)
      return date.toString()
    },
    paragraph () {
      let arrParagraph = this.question.content
      arrParagraph = arrParagraph.split(`\n`)
      console.log(arrParagraph)
      return arrParagraph
    },
    isUserAuth () {
      let userId = jwt.decode(localStorage.token)._id
      return ((userId === this.question.author._id) || this.$store.state.isAdmin)
    }
  },
  created () {
    this.getQuestion()
  }
}
</script>

<style>
p {
  white-space: pre-wrap;
}
</style>
