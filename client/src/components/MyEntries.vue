<template>

  <div>
    <v-layout wrap>
      <v-flex v-for="question in MyQuestions" :key="question._id" class="pa-3">
        <question-thumbnail :question="question"></question-thumbnail>
      </v-flex>
    </v-layout>
  </div>
  
</template>

<script>
import QuestionThumbnail from './QuestionThumbnail'
import jwt from 'jsonwebtoken'
export default {
  data () {
    return {

    }
  },
  computed: {
    MyQuestions: {
      get () {
        let userId = jwt.decode(localStorage.token)._id
        let myQuestions = this.$store.state.allQuestions.filter(question => {
          return question.author._id === userId
        })
        return myQuestions
      }
    }
  },
  components: {
    QuestionThumbnail
  }
}
</script>

<style>

</style>
