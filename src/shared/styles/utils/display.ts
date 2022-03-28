import { css } from 'styled-components'

/**
 * Screenreaders only
 *
 * Hide visually, but have it available for screen readers
 *
 *  1. For long content, line feeds are not interpreted as spaces and
 *     small width causes content to wrap 1 word per line:
 *     https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe
 *  2. Prevent voice over mac from reading styled uppercase as abbreviations
 *     Eg. ADD as A, D, D... should be 'add' || US as U, S... should be 'us'
 */
export const srOnly = () => {
  return css`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
    border: 0;
    white-space: nowrap; /* [1] */
    text-transform: none; /* [2] */
  `
}
