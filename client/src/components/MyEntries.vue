<template>

  <div>
    <v-layout wrap>
      <v-flex v-for="question in myQuestions" :key="question._id" class="pa-3">
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
    myQuestions: {
      get () {
        let userId = jwt.decode(localStorage.token)._id
        let arrQuestions = this.$store.state.allQuestions.filter(question => {
          return question.author._id === userId
        })
        return arrQuestions
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
