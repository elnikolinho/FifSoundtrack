import defaultTheme from '../theme.styles'

const baseSize = defaultTheme.fonts.size.base

/**
 * rem converter
 * @param size should be the pixel value, without units
 *
 * Usage: font-size: rem(16)
 * returns: 1.6rem
 */
export const rem = (size: number) => {
  return size / baseSize + 'rem'
}
