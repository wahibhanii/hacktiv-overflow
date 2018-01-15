// import jwt from 'jsonwebtoken'
import axios from 'axios'
const baseURL = 'http://54.147.77.204'

const mutations = {

  setLoginStatus () {
    console.log('login status')
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
      console.log('no search')
      axios({
        method: 'get',
        url: `${baseURL}/questions`,
        headers: {token: localStorage.token}
      })
        .then(response => {
          console.log('get data ok')
          this.state.allQuestions = response.data.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

}

export default mutations
