import { css } from 'styled-components'

/**
 * Card Box Shadow Hover
 *
 * To create a consistent Box Shadow for Card components
 */
export const cardShadowHover = () => {
  return css`
    transition: box-shadow 0.2s;

    &:hover {
      ${cardShadow()}
    }
  `
}

export const cardShadow = (blur = 8) => {
  return css`
    box-shadow: 0px 4px ${blur}px ${(props) => props.theme.colors.black25};
  `
}
