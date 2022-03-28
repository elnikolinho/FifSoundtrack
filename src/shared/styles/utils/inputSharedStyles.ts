import { css } from 'styled-components'

export const inputSharedBorder = () => {
  return css`
    border: 1px solid ${({ theme }) => theme.colors.keylines};
    transition: border-color 0.3s;

    &:hover {
      border-color: ${({ theme }) => theme.colors.purple};
    }
  `
}
