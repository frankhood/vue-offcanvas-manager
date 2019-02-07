/* Mutations, actions and getters */
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: true,
  state: {
    lastScrollPosition: null,
    mainPanel: null,
    offCanvasElements: {}
  },
  actions,
  mutations,
  getters
}
