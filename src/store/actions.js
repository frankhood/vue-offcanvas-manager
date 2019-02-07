/* Import dependencies */
import * as types from './mutation_types'

export default {
  saveScroll ({ commit, state }, position) {
    return new Promise((resolve, reject) => {
      commit(types.SAVE_SCROLL, position)
      resolve(state.lastScrollPosition)
    })
  },
  setMainPanel ({ commit }, el) {
    return new Promise((resolve, reject) => {
      commit(types.SET_MAIN_PANEL, el)
      resolve()
    })
  },
  addOffcanvas ({ commit }, oc) {
    return new Promise((resolve, reject) => {
      try {
        commit(types.ADD_OFFCANVAS, oc)
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  },
  updateOffcanvas ({ commit }, oc) {
    return new Promise((resolve, reject) => {
      try {
        commit(types.UPDATE_OFFCANVAS, oc)
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  },
  setOpeningState ({ commit }, { offcanvas, openingState }) {
    return new Promise((resolve, reject) => {
      commit(types.SET_OFFCANVAS_STATE, { offcanvas, openingState })
      resolve()
    })
  }
}
