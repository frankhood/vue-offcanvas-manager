import Vue from 'vue'
import * as types from './mutation_types'

export default {
  [types.SAVE_SCROLL] (state, position) {
    state.lastScrollPosition = position
  },
  [types.SET_MAIN_PANEL] (state, el) {
    state.mainPanel = el
  },
  [types.ADD_OFFCANVAS] (state, offCanvas) {
    if (state.offCanvasElements.hasOwnProperty(offCanvas.name)) {
      throw new Error(`An offcanvas named '${offCanvas.name}' already exists`)
    } else {
      Vue.set(state.offCanvasElements, offCanvas.name, offCanvas)
      // state.offCanvasElements[offCanvas.name] = offCanvas
    }
  },
  [types.UPDATE_OFFCANVAS] (state, offCanvas) {
    if (!state.offCanvasElements.hasOwnProperty(offCanvas.name)) {
      throw new Error(`Error in offcanvas update hook: no offcanvas named '${offCanvas.name}' was found`)
    } else {
      // Vue.set(state.offCanvasElements, offCanvas.name, offCanvas)
    }
  },
  [types.SET_OFFCANVAS_STATE] (state, { offcanvas, openingState }) {
    state.offCanvasElements[offcanvas.name].isOpen = openingState
  }
}
