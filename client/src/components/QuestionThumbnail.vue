<template>
    <v-layout>
      <v-card class="cyan">
        <v-card-media
          height="150px"
        >
          <v-container fill-height fluid wrap>
            <v-layout fill-height wrap>
              <v-flex xs12 align-end flexbox>
                <span class="display-1 yellow--text" >{{question.title}}</span>
              </v-flex>
              <v-flex>
                <span class="title yellow--text" >By: {{question.author.userName}}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-actions class="yellow">
          <v-spacer></v-spacer>
          <v-btn flat @click="seeQuestionDetail">
            <v-icon class="pr-2">remove_red_eye</v-icon> See Entry
          </v-btn>
          <v-btn icon v-if="this.$store.state.isAdmin" @click="gotoEditQuestion">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn icon flat v-if="this.$store.state.isAdmin" color="red" @click="deleteQuestion">
            <v-icon >delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
</template>

<script>
export default {
  props: ['question'],
  methods: {
    seeQuestionDetail () {
      this.$router.push({name: 'QuestionDetail', params: { id: this.question._id }})
    },
    deleteQuestion () {
      this.$axios({
        method: 'delete',
        url: `/questions/${this.id}`,
        headers: {token: localStorage.token}
      })
        .then(response => {
          this.$store.commit('getAllQuestions')
          this.$router.push({name: 'AllEntries'})
        })
        .catch(err => {
          console.log(err)
        })
    },
    gotoEditQuestion () {
      this.$router.push({name: 'EditQuestion', params: {id: this.question._id}})
    }
  }
}
</script>

<style>

</style>
