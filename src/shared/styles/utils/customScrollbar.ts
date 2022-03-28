import { css } from 'styled-components'
import { rem } from './rem'

/**
 * Custom scrollbar
 * Limited support on certain browsers
 * Webkit browsers: https://webkit.org/blog/363/styling-scrollbars/ [1]
 * Firefox: https://drafts.csswg.org/css-scrollbars-1/ [2]
 */
export const customScrollbar = () => {
  return css`
    /* [1] SCROLL BAR - CHROME */
    /* width */
    &::-webkit-scrollbar {
      width: ${rem(8)};
    }
    /* Track */
    &::-webkit-scrollbar-track {
      border-radius: 0;
      background-color: ${({ theme }) => theme.colors.keylines};
    }
    /* Handle */
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.purple};
      border-radius: 0;
    }

    /* [2] SCROLL BAR - FIREFOX */
    ${({ theme }) =>
      `scrollbar-color: ${theme.colors.purple} ${theme.colors.keylines};`}
  `
}
