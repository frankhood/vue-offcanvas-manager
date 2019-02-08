import { TweenLite } from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import Offcanvas from './offcanvas'
import offcanvasStoreModule from './store'
import { toCamelCase } from './utils'
import * as animations from './animations'

// GsapPlugins import, avoiding tree-shaking
// eslint-disable-next-line no-unused-vars
const GsapPlugins = [ScrollToPlugin]

const VueOffcanvas = {
  install: function (Vue, options) {
    if (!options || !options.store) {
      throw new Error('Vue Offcanvas: please, provide a Vuex store in the options object')
    }
    options.store.registerModule('vueOffcanvasManager', offcanvasStoreModule)

    /* Vue instance properties */
    Vue.prototype.$mainPanel = undefined
    Vue.prototype.$offCanvasElements = {}

    /* Vue instance methods */

    // Save and recover scroll position
    Vue.prototype.$lockScroll = function () {
      const scrollPos = window.scrollY ||
        window.scrollTop ||
        document.getElementsByTagName('html')[0].scrollTop
      this.$store.dispatch('vueOffcanvasManager/saveScroll', scrollPos)
        .then((savedScroll) => {
          TweenLite.set(document.body, {
            position: 'fixed',
            left: 0,
            top: -savedScroll
          })
        })
    }

    Vue.prototype.$recoverScroll = function () {
      TweenLite.set(document.body, {
        position: 'static'
      })
      TweenLite.set(window, { scrollTo: this.$store.state.vueOffcanvasManager.lastScrollPosition })
      this.$store.dispatch('vueOffcanvasManager/saveScroll', null)
    }

    // Open offcanvas
    Vue.prototype.$openOffcanvas = function (element) {
      return new Promise((resolve, reject) => {
        const $oc = this.$store.getters['vueOffcanvasManager/getOffcanvas'](element)

        const animationFn = toCamelCase($oc.openAnimation)

        if ($oc.lockScroll && !this.$store.state.vueOffcanvasManager.lastScrollPosition) {
          this.$lockScroll()
        }

        new Promise((resolve, reject) => {
          try {
            $oc.beforeEnter.call(this)
            resolve()
          } catch (e) {
            reject(e)
          }
        })
          .then(() => animations[animationFn]($oc))
          .then(() => this.$store.dispatch('vueOffcanvasManager/setOpeningState', {
            offcanvas: $oc,
            openingState: true
          }))
          .then(() => new Promise((resolve, reject) => {
            try {
              $oc.afterEnter.call(this)
              resolve()
            } catch (e) {
              reject(e)
            }
          }))
          .then(resolve)
          .catch(resolve)
      })
    }

    // Close offcanvas
    Vue.prototype.$closeOffcanvas = function (element) {
      return new Promise((resolve, reject) => {
        const $oc = this.$store.getters['vueOffcanvasManager/getOffcanvas'](element)

        const animationFn = toCamelCase($oc.closeAnimation)

        // Check if other scroll-locking panels are open
        // TODO simplify finding other open scroll-locking panels
        const ocDict = this.$store.state.vueOffcanvasManager.offCanvasElements

        const ocList = Object.keys(ocDict)

        const otherLockingOpen = ocList.reduce((acc, key) => {
          if (ocDict.hasOwnProperty(key)) {
            const $ocObj = ocDict[key]
            if ($ocObj.isOpen && $ocObj.lockScroll && $ocObj.name !== $oc.name) {
              return acc || true
            }
            return acc || false
          }
          return acc || false
        }, false)

        if ($oc.lockScroll && !$oc.isAnimating && !otherLockingOpen) {
          this.$recoverScroll()
        }

        new Promise((resolve, reject) => {
          try {
            $oc.beforeLeave.call(this)
            resolve()
          } catch (e) {
            reject(e)
          }
        })
          .then(() => animations[animationFn]($oc))
          .then(() => $oc.pushAway())
          .then(() => this.$store.dispatch('vueOffcanvasManager/setOpeningState', {
            offcanvas: $oc,
            openingState: false
          }))
          .then(() => new Promise((resolve, reject) => {
            try {
              $oc.afterLeave.call(this)
              resolve()
            } catch (e) {
              reject(e)
            }
          }))
          .then(resolve)
          .catch(resolve)
      })
    }

    // Toggle offcanvas
    Vue.prototype.$toggleOffcanvas = function (element) {
      return new Promise((resolve, reject) => {
        const $oc = this.$store.getters['vueOffcanvasManager/getOffcanvas'](element)

        if ($oc.isOpen) {
          this.$closeOffcanvas($oc)
            .then(resolve)
        } else {
          this.$openOffcanvas($oc)
            .then(resolve)
        }
      })
    }

    Vue.prototype.$removeOffcanvas = function (element) {
      return new Promise((resolve, reject) => {
        const $oc = this.$store.getters['vueOffcanvasManager/getOffcanvas'](element)

        if ($oc.isOpen) {
          this.$closeOffcanvas($oc)
            .then(() => this.$store.dispatch('vueOffcanvasManager/removeOffcanvas', $oc))
            .then(resolve)
        } else {
          this.$store.dispatch('vueOffcanvasManager/removeOffcanvas', $oc)
            .then(resolve)
        }
      })
    }

    /* Directives */

    // Configure the main app panel
    Vue.directive('main-panel', {
      bind (el, binding, vnode) {
        if (vnode.context.$store.state.vueOffcanvasManager.mainPanel) {
          throw new Error('More than a main panel has been defined')
        } else {
          // vnode.context.$mainPanel = el
          vnode.context.$store.dispatch('vueOffcanvasManager/setMainPanel', el)
        }
      }
    })

    // Configure secondary panels
    // Vue.directive('panel', {
    //   bind(el, binding, vnode) {
    //     let panels = vnode.context.$panels,
    //       name = binding.arg;
    //
    //     if(panels.hasOwnProperty(name)) {
    //       throw new Error(`A panel named '${name}' already exists`)
    //     } else {
    //       panels[name] = el;
    //     }
    //   }
    // });

    // Configure the offcanvas elements
    Vue.directive('offcanvas', {
      bind (el, binding, vnode) {
        const name = binding.arg

        const parameters = binding.value
        vnode.context.$store.dispatch(
          'vueOffcanvasManager/addOffcanvas',
          new Offcanvas(el, name, parameters)
        )
      },

      update (el, binding, vnode, oldVnode) {
        const name = binding.arg
        const parameters = binding.value
        let $oc
        let newParams = {}

        try {
          $oc = vnode.context.$store.getters['vueOffcanvasManager/getOffcanvas'](name)
          Object.keys(parameters)
            .forEach(par => {
              if ($oc[par] !== parameters[par]) {
                newParams[par] = parameters[par]
              }
            })
          if (Object.keys(newParams).length > 0) {
            console.log(newParams)
            vnode.context.$store.dispatch('vueOffcanvasManager/updateOffcanvas', {
              name,
              params: newParams
            })
          }
        } catch (e) {}
      }
    })
  }
}

export default VueOffcanvas
