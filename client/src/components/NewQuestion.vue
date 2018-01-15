<template>
  <div>
    <v-container class="pa-2">
      <v-container class="cyan" elevation-3>
        <v-layout  row class="pt-3 pb-5">
           <h1 class="display-2">New Question</h1>
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
            <v-icon>add</v-icon>Post
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
  methods: {
    postBlog () {
      console.log('posting blog')
      this.$axios({
        method: 'post',
        url: `/questions/`,
        headers: {
          token: localStorage.token
        },
        data: {
          title: this.blogTitle,
          content: this.blogContent
        }
      })
        .then(response => {
          console.log(response)
          this.blogContent = null
          this.blogTitle = null
          this.$store.commit('getAllQuestions')
          this.$router.push(`article/${response.data.data._id}`)
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

