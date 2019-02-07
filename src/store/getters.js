import { findOffcanvas } from '../utils'

export default {
  getOffcanvas: (state) => (query) => {
    return findOffcanvas(state.offCanvasElements, query)
  },
  offcanvasOpeningState: (state) => (query) => {
    try {
      return state.offCanvasElements[query].isOpen
    } catch (e) {
      return false
    }
  }
}
