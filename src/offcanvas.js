import { TweenLite } from 'gsap'
import isFunction from 'lodash/isFunction'
import { noop } from './utils'

class Offcanvas {
  constructor (el, name, options) {
    this._el = el
    this._name = name
    this._isOpen = false
    this._isAnimating = false

    const optionKeys = options
      ? Object.keys(options) : []

    optionKeys.forEach((key) => {
      if (options.hasOwnProperty(key)) {
        if (isFunction(options[key])) {
          this[key] = options[key]
        } else {
          this[`_${key}`] = options[key]
        }
      }
    })

    // Pre-populate non assigned parameters
    if (!this.hasOwnProperty('_position')) {
      this._position = 'top'
    }
    if (!this.hasOwnProperty('_openAnimation')) {
      this._openAnimation = 'fade-in'
    }
    if (!this.hasOwnProperty('_closeAnimation')) {
      this._closeAnimation = 'fade-out'
    }
    if (!this.hasOwnProperty('_duration')) {
      this._duration = 500
    }
    if (!this.hasOwnProperty('_lockScroll')) {
      this._lockScroll = false
    }

    // Animation hooks
    if (!this.hasOwnProperty('beforeEnter')) {
      this.beforeEnter = noop
    }
    if (!this.hasOwnProperty('afterEnter')) {
      this.afterEnter = noop
    }
    if (!this.hasOwnProperty('beforeLeave')) {
      this.beforeLeave = noop
    }
    if (!this.hasOwnProperty('afterLeave')) {
      this.afterLeave = noop
    }

    this.pushAway()
  }

  pushAway () {
    return new Promise((resolve, reject) => {
      TweenLite.set(this._el, {
        position: 'fixed',
        left: -9999,
        top: -9999,
        onComplete () {
          resolve()
        }
      })
    })
  }

  setAnimationState (state) {
    return new Promise((resolve, reject) => {
      this._isAnimating = state
      resolve()
    })
  }

  get name () {
    return this._name
  }

  get el () {
    return this._el
  }

  get isOpen () {
    return this._isOpen
  }

  set isOpen (state) {
    this._isOpen = state
  }

  get isAnimating () {
    return this._isAnimating
  }

  get position () {
    return this._position
  }

  set position (value) {
    this._position = value
  }

  get openAnimation () {
    return this._openAnimation
  }

  set openAnimation (value) {
    this._openAnimation = value
  }

  get closeAnimation () {
    return this._closeAnimation
  }

  set closeAnimation (value) {
    this._closeAnimation = value
  }

  get duration () {
    return this._duration
  }

  set duration (value) {
    this._duration = value
  }

  get lockScroll () {
    return this._lockScroll
  }

  set lockScroll (value) {
    this._lockScroll = value
  }
}

export default Offcanvas
