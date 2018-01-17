<template>
  <div>
    <v-container class="pa-5">
      <v-container class="cyan" elevation-3>
        <v-layout  row class="pt-3 pb-5">
           <h1 class="display-2">Edit Question</h1>
        </v-layout>
        <v-form class="pa-4">
          <v-layout row>
            <v-text-field
              label="Title"
              v-model="blogTitle"
              :rules="titleRules"
              required
              light
            >
            </v-text-field>
          </v-layout>
          <v-layout row>
            <v-text-field
              label="Blog Content"
              v-model="blogContent"
              multi-line
              light
            >
            </v-text-field>
          </v-layout>
          
        </v-form>
        <v-layout row justify-center >
          <v-btn color="orange lighten-1" large dark @click="postBlog">
            <v-icon class="pr-2">edit</v-icon>Update
          </v-btn>
        </v-layout>
      </v-container>
    </v-container>
  </div>
</template>

<script>

export default {
  data () {
    return {
      blogTitle: null,
      titleRules: [
        (v) => !!v || 'Title is required'
      ],
      blogContent: null
    }
  },
  props: ['id'],
  methods: {
    postBlog () {
      this.$axios({
        method: 'put',
        url: `/questions/${this.id}`,
        headers: {
          token: localStorage.token
        },
        data: {
          title: this.blogTitle,
          content: this.blogContent
        }
      })
        .then(response => {
          this.blogContent = null
          this.blogTitle = null
          this.$store.commit('getAllQuestions')
          this.$router.push({name: 'QuestionDetail', params: {id: this.id}})
        })
        .catch(err => {
          console.log(err)
        })
    },
    getQuestion () {
      this.$axios({
        method: 'get',
        url: `/questions/${this.$route.params.id}`,
        headers: {token: localStorage.token}
      })
        .then(response => {
          this.blogTitle = response.data.data.title
          this.blogContent = response.data.data.content
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.getQuestion()
  }

}
</script>

<style>

</style>

