import defaultTheme from 'shared/styles/theme.styles'

// return breakpoint to update the state ie: setBreakpoint(setDevice())
export const setDevice = () => {
  const sizes = defaultTheme.breakPoints
  const windowWidth = window.innerWidth
  let bp = ''

  // Sort breakpoints to force them into correct order
  const sortedSizes = Object.keys(sizes).sort((a, b) => {
    return sizes[a] - sizes[b]
  })

  const firstBreakpoint = sortedSizes[0]
  const lastBreakpoint = sortedSizes[sortedSizes.length - 1]
  const inMobile: string[] = [sortedSizes[0], sortedSizes[1]]
  const inTablet: string[] = [sortedSizes[2]]
  const inDesktop: string[] = [sortedSizes[3], sortedSizes[4]]
  const inDesktopLarge: string[] = [sortedSizes[4]]

  if (windowWidth < sizes[firstBreakpoint]) {
    bp = sortedSizes[0]
  } else if (windowWidth >= sizes[lastBreakpoint]) {
    bp = lastBreakpoint
  } else {
    sortedSizes.forEach((size, idx: number) => {
      if (
        windowWidth > sizes[size] - 1 &&
        windowWidth < sizes[sortedSizes[idx + 1]]
      ) {
        bp = size
      }
    })
  }

  return {
    activeBreakpoint: bp,
    isMobile: inMobile.includes(bp),
    isTablet: inTablet.includes(bp),
    isDesktop: inDesktop.includes(bp),
    isDesktopLarge: inDesktopLarge.includes(bp),
  }
}

/**
 * This method check if the current year is leapYear or not,
 * If it is a leap year it will return true else false
 * @param NA
 */

/**
 * return the public path set in webpack
 * @param
 */

export function getBasePath() {
  return process.env.PUBLIC_URL
}

/**
 * return the number of words
 * @param value
 * @returns number
 */
export function getWordCount(value: string) {
  return value.split(/\s+/).filter((item) => item !== '').length
}

/**
 * return updated JavaScript object with no key with undefined or null value
 * It will work for any level of nested object
 * @param value
 * @returns number
 */
export function deleteNullAndUndefinedKey(obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    return obj
  }
  for (const key in obj) {
    if (obj[key] !== null && typeof obj[key] === 'object') {
      deleteNullAndUndefinedKey(obj[key])
    } else if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
      delete obj[key]
    }
  }
  return obj
}

/**
 * Set given path to fromLocation in session storage
 * @param {string} path - Requested future planner path by user
 * @returns void
 */

export const setFromLocation = (path: string): void => {
  if (typeof Storage !== 'undefined') {
    sessionStorage.setItem('fromLocation', path)
  }
}

/**
 * This method asynchronously delete the data from localStorage for given key
 * @param { string } key to delete from localStorage
 * @returns void
 */

export const removeLocalStoragedata = (key = 'molSessionData'): void => {
  setTimeout(() => {
    localStorage.removeItem(key)
  }, 0)
}

// Parse float and round to 2 decimal places.
export const parseFloatAndRoundTo2DecimalPlaces = (value: number) => {
  // Converted to string because parseFloat needs a string type parameter.
  const valueToString = value.toString()
  return Math.round(parseFloat(valueToString) * 1e2) / 1e2
}
