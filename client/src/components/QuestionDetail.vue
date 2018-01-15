<template>
  <div>
      <v-container class="cyan lighten-4" elevation-3 fluid>
          <v-layout row>
            <h1 class="headline">{{question.title}}</h1>
          </v-layout>
          <v-layout row class="pt-3 pb-3 " >
            <em class="caption">By {{question.author.userName}}, at {{questionDate}}</em>
          </v-layout>
        <v-layout class="pt-4" justify-left>
            <p align="left">{{question.content}}</p>
        </v-layout>
        <v-layout justify-end>
          <v-menu
            transition="scale-transition"
            bottom
            right
          >
            <v-btn flat dark color="blue" slot="activator" v-if="isUserAuth" 
            >
              More
            </v-btn>
            <v-list>
              <v-list-tile>
                <v-btn color="orange lighten-1" small dark @click="gotoEditQuestion">
                  <v-icon class="pr-2">edit</v-icon> Edit Question
                </v-btn>
              </v-list-tile>
              <v-list-tile>
                <v-btn color="red" small dark @click="deleteQuestion">
                  <v-icon class="pr-2">delete</v-icon> Delete
                </v-btn>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-layout>
        <v-layout justify-space-around>
          <v-btn icon small flat color="blue" @click="upvoteQuestion">
            <v-badge overlay small left bottom color="green" >
              <span slot="badge" dark>{{question.upvoters.length}}</span>
              <v-icon flat small icon color="blue">thumb_up</v-icon>
            </v-badge>
          </v-btn>
          <v-btn icon small flat color="blue" @click="downvoteQuestion" >
            <v-badge overlay small right bottom color="green" >
              <span slot="badge" dark>{{question.downvoters.length}}</span>
              <v-icon flat small icon color="blue">thumb_down</v-icon>
            </v-badge>
          </v-btn>
        </v-layout>
      </v-container>

      <v-container fluid pa-0 >
        <answer-box 
          :answer="answer" 
          :questionId="question._id" 
          @deleteAnswer="getQuestion"
          v-for="(answer, i) in question.answers" 
          :key="i" 
          fluid class="white"
          @upvoteAnswer ="getQuestion"
          @downvoteAnswer ="getQuestion"></answer-box>
      </v-container>
    <v-container>
      <new-answer 
        :questionId="question._id" 
        @postAnswer="getQuestion"
        >
      </new-answer>
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
    },
    upvoteQuestion () {
      console.log('upvoting answer')
      this.$axios({
        method: 'put',
        url: `/questions/${this.question._id}/upvote`,
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          console.log('Upvoted ', response)
          this.getQuestion()
        })
        .catch(err => {
          console.log(err)
        })
    },
    downvoteQuestion () {
      'downvoting answer'
      this.$axios({
        method: 'put',
        url: `/questions/${this.question._id}/downvote`,
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          console.log('Downvoted ', response)
          this.getQuestion()
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
    },
    isAdmin () {
      return this.$store.state.isAdmin
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
