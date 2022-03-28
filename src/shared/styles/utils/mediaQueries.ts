import defaultTheme from '../theme.styles'

const breakPoints = defaultTheme.breakPoints

/**
 *
 *
 * Usage example:
 *
 * ${minMedia.tablet} {
 *   background: red;
 * }
 *
 */
const createMinMedia = (minWidth: number) => {
  return `@media (min-width: ${minWidth}px)`
}
const createMaxMedia = (maxWidth: number) => {
  return `@media (max-width: ${maxWidth - 1}px)`
}

export const minMedia = {
  xs: createMinMedia(breakPoints.xs),
  mobile: createMinMedia(breakPoints.mobile),
  tablet: createMinMedia(breakPoints.tablet),
  desktop: createMinMedia(breakPoints.desktop),
  desktopLarge: createMinMedia(breakPoints.desktopLarge),
}

export const maxMedia = {
  xs: createMaxMedia(breakPoints.xs),
  mobile: createMaxMedia(breakPoints.mobile),
  tablet: createMaxMedia(breakPoints.tablet),
  desktop: createMaxMedia(breakPoints.desktop),
  desktopLarge: createMaxMedia(breakPoints.desktopLarge),
}
