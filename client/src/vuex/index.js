import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import state from './state'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions,
  mutations,
  state,
  getters
})

export default store
