<template>

  <div>
    <v-layout wrap>
      <v-flex v-for="question in allQuestions" :key="question._id" class="pa-3">
        <question-thumbnail :question="question"></question-thumbnail>
      </v-flex>
    </v-layout>
  </div>
  
</template>

<script>
import QuestionThumbnail from './QuestionThumbnail'
export default {
  data () {
    return {

    }
  },
  computed: {
    allQuestions: {
      get () {
        return this.$store.state.allQuestions
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
