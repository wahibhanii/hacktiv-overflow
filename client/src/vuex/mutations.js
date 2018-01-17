// import jwt from 'jsonwebtoken'
import axios from 'axios'
const baseURL = 'https://api.hackflow.wahibhanii.xyz'

const mutations = {

  setLoginStatus () {
    if (localStorage.token !== undefined) {
      this.state.isLoggedIn = true
    } else {
      this.state.isLoggedIn = false
    }
  },

  getAllQuestions () {
    if (this.state.isSearch) {
      // console.log('with search', this.state.searchField)
      // axios({
      //   method: 'get',
      //   url: `${baseURL}/questions/search?field=${this.state.searchField}`,
      //   headers: {token: localStorage.token}
      // })
      // .then(response => {
      //   this.state.allProps = response.data
      // })
      // .catch(err => {
      //   console.log(err)
      // })
    } else {
      axios({
        method: 'get',
        url: `${baseURL}/questions`,
        headers: {token: localStorage.token}
      })
        .then(response => {
          this.state.allQuestions = response.data.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

}

export default mutations
