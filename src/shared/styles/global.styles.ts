import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { rem } from './utils'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './fonts.css'

const GlobalStyles = createGlobalStyle`
  ${reset};

  /* A. More sensible default box sizing.
  Resource: css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice */

  html,
  body {
    height: 100%;
    margin: 0;
  }

  /* 1. This sets 1rem = 10px.
      Resource: http://snook.ca/archives/html_and_css/font-size-with-rem */
  html {
      box-sizing: border-box; /* [A] */
      text-size-adjust: 100%;
      font-size: 62.5%; /* [1] */
      font-size: ${({ theme }) =>
        (theme.fonts.size.base / 16) * 100}%; /* [1] */
  }

  *,
  *::before,
  *::after,
  .MuiInputBase-root,
  .MuiInputBase-input {
      box-sizing: inherit; /* [A] */
  }

  /* 1. For white text on dark bg */
  /* 2. Stop horizontal scrollbars appearing */
  body {
    -webkit-font-smoothing: antialiased; /* [1] */
    -moz-osx-font-smoothing: grayscale; /* [1] */
    overflow-x: hidden; /* [2] */
    font-size: ${({ theme }) => rem(theme.fonts.size.default)};
    font-family: ${({ theme }) => theme.fonts.family.sailecRegular};
    margin: 0;
  }

  strong, b {
    font-weight: 700;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  main {
    background-color: ${({ theme }) => theme.colors.white};
    height: 100%;
  }

  /* Icon displayed next to txt on external links */
  .icon-external-link {
    width: ${rem(22)};
    height: ${rem(21)};
    vertical-align: middle;
    margin-left: 5px;
  }
`
export default GlobalStyles
