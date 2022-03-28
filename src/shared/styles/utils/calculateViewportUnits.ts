import { rem } from '.'

/**
 * Calculate Viewport Unit
 *
 * Common function for vh and vw to use
 *
 * @param measurementValue width or height value, taken from the design. e.g. 1440, 880
 * @param value This is the margin/padding/whatever value from designs
 * @param measurementType width or height
 * @param doNotExceed Do not exceed the given value, even if vh unit calculates higher
 */
export const calcViewportUnit = (
  measurement: number,
  value: number,
  measurementType: string,
  doNotExceed?: boolean,
): string => {
  const vUnit = `${(value / measurement) * 100}${measurementType}`

  if (doNotExceed) {
    return `min(${vUnit}, ${rem(value)})`
  } else {
    return vUnit
  }
}

/**
 * Calculate vh (Viewport Height) units
 *
 * Creates a flexible value based on viewport height
 *
 * @param height This would be the height value taken from deisgn, e.g. 880
 * @param value This is the margin/padding/whatever value from designs
 * @param doNotExceed Do not exceed the given value, even if vh unit calculates higher
 *
 * Use Case:
 * We would use this when we want the margin/padding to be relative to the viewport,
 * e.g. smaller devices get smaller margin/padding, larger devices get larger margin/padding
 * - You could use doNotExceed when you want this functionality, but don't want the margin/padding
 *   growing larger than the value given.
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/min()
 *
 */
export const calcVhUnit = (
  height: number,
  value: number,
  doNotExceed?: boolean,
): string => {
  return calcViewportUnit(height, value, 'vh', doNotExceed)
}

/**
 * Calculate vw (Viewport Width) units
 *
 * Creates a flexible value based on viewport width
 *
 * @param width This would be the width value taken from deisgn, e.g. 880
 * @param value This is the margin/padding/whatever value from designs
 * @param doNotExceed Do not exceed the given value, even if vh unit calculates higher
 *
 * Use Case:
 * We would use this when we want the margin/padding to be relative to the viewport,
 * e.g. smaller devices get smaller margin/padding, larger devices get larger margin/padding
 * - You could use doNotExceed when you want this functionality, but don't want the margin/padding
 *   growing larger than the value given.
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/min()
 *
 */
export const calcVwUnit = (
  width: number,
  value: number,
  doNotExceed?: boolean,
): string => {
  return calcViewportUnit(width, value, 'vw', doNotExceed)
}
