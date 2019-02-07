import { TweenLite } from 'gsap'
import { parsePosition, outOfCanvasStyles } from './utils'

export const fadeIn = function ($offcanvas) {
  let $el = $offcanvas.el

  let position = $offcanvas.position

  let duration = $offcanvas.duration / 1000

  return new Promise((resolve, reject) => {
    if (!$offcanvas.isAnimating) {
      $offcanvas.setAnimationState(true)
        .then(() => {
          TweenLite.fromTo($el, duration, {
            autoAlpha: 0,
            ...parsePosition(position)
          }, {
            autoAlpha: 1,
            ...parsePosition(position),
            onComplete: () => {
              $offcanvas.setAnimationState(false)
                .then(resolve)
            }
          })
        })
    } else {
      reject(new Error('Element already animating'))
    }
  })
}

export const fadeOut = function ($offcanvas) {
  let $el = $offcanvas.el

  let position = $offcanvas.position

  let duration = $offcanvas.duration / 1000

  return new Promise((resolve, reject) => {
    if (!$offcanvas.isAnimating) {
      $offcanvas.setAnimationState(true)
        .then(() => {
          TweenLite.fromTo($el, duration, {
            autoAlpha: 1,
            ...parsePosition(position)
          }, {
            autoAlpha: 0,
            ...parsePosition(position),
            onComplete: () => {
              $offcanvas.setAnimationState(false)
                .then(resolve)
            }
          })
        })
    } else {
      reject(new Error('Element already animating'))
    }
  })
}

export const slideIn = function ($offcanvas) {
  let $el = $offcanvas.el

  let position = $offcanvas.position

  let duration = $offcanvas.duration / 1000

  return new Promise((resolve, reject) => {
    if (!$offcanvas.isAnimating) {
      $offcanvas.setAnimationState(true)
        .then(() => {
          let finalPosition = parsePosition(position)

          let initialPosition = outOfCanvasStyles(finalPosition)

          TweenLite.fromTo($el, duration, {
            autoAlpha: 1,
            ...initialPosition
          }, {
            autoAlpha: 1,
            ...finalPosition,
            onComplete: () => {
              $offcanvas.setAnimationState(false)
                .then(resolve)
            }
          })
        })
    } else {
      reject(new Error('Element already animating'))
    }
  })
}

export const slideOut = function ($offcanvas) {
  let $el = $offcanvas.el

  let position = $offcanvas.position

  let duration = $offcanvas.duration / 1000

  return new Promise((resolve, reject) => {
    if (!$offcanvas.isAnimating) {
      $offcanvas.setAnimationState(true)
        .then(() => {
          let initialPosition = parsePosition(position)

          let finalPosition = outOfCanvasStyles(initialPosition)

          TweenLite.fromTo($el, duration, {
            autoAlpha: 1,
            ...initialPosition
          }, {
            autoAlpha: 1,
            ...finalPosition,
            onComplete: () => {
              $offcanvas.setAnimationState(false)
                .then(resolve)
            }
          })
        })
    } else {
      reject(new Error('Element already animating'))
    }
  })
}
