export const noop = () => {
}

export const toCamelCase = (str) => {
  return str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase()
  })
}

export const findOffcanvas = (offCanvasDict, query) => {
  let $oc
  if (typeof query === 'string') {
    $oc = offCanvasDict[query]
  } else if (typeof query === 'object') {
    $oc = offCanvasDict[query.name]
  } else {
    throw new Error('Wrong input when opening offcanvas')
  }
  if (!$oc) {
    throw new Error('Offcanvas element not found')
  }
  return $oc
}

export const parsePosition = (position) => {
  switch (position) {
    case 'top':
      return {
        top: 0,
        left: '50%',
        bottom: 'auto',
        right: 'auto',
        xPercent: -50,
        yPercent: 0
      }

    case 'bottom':
      return {
        bottom: 0,
        left: '50%',
        top: 'auto',
        right: 'auto',
        xPercent: -50,
        yPercent: 0
      }

    case 'right':
      return {
        bottom: 'auto',
        left: 'auto',
        top: '50%',
        right: 0,
        xPercent: 0,
        yPercent: -50
      }

    case 'left':
      return {
        bottom: 'auto',
        left: 0,
        top: '50%',
        right: 'auto',
        xPercent: 0,
        yPercent: -50
      }

    case 'top-left':
      return {
        bottom: 'auto',
        right: 'auto',
        top: 0,
        left: 0,
        xPercent: 0,
        yPercent: 0
      }

    case 'top-right':
      return {
        bottom: 'auto',
        right: 0,
        top: 0,
        left: 'auto',
        xPercent: 0,
        yPercent: 0
      }

    case 'bottom-left':
      return {
        bottom: 0,
        right: 'auto',
        top: 0,
        left: 'auto',
        xPercent: 0,
        yPercent: 0
      }

    case 'bottom-right':
      return {
        bottom: 0,
        right: 0,
        top: 'auto',
        left: 'auto',
        xPercent: 0,
        yPercent: 0
      }

    default:
      throw new Error('Unrecognized positioning')
  }
}

export const outOfCanvasStyles = (inCanvasStyles) => {
  let outStyles = { ...inCanvasStyles }

  Object.keys(inCanvasStyles).forEach(key => {
    if (inCanvasStyles.hasOwnProperty(key)) {
      let val = inCanvasStyles[key]
      switch (key) {
        case 'top':
          val === 0
            ? outStyles.yPercent = -100 : noop()
          break

        case 'bottom':
          val === 0
            ? outStyles.yPercent = 100 : noop()
          break

        case 'left':
          val === 0
            ? outStyles.xPercent = -100 : noop()
          break

        case 'right':
          val === 0
            ? outStyles.xPercent = 100 : noop()
          break
      }
    }
  })

  return outStyles
}
