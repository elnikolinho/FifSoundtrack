import styled from 'styled-components'

import { rem, minMedia } from 'shared/styles/utils'

export const Wrapper = styled.div`
  background-color: #fc9fe3;
  padding: ${rem(10)} ${rem(50)};

  ${minMedia.tablet} {
    padding: ${rem(150)} ${rem(100)};
  }
`

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  ${minMedia.tablet} {
    flex-direction: row;
    justify-content: space-between;
  }
`

export const SectionItem = styled.div`
  font-size: ${({ theme }) => rem(theme.fonts.size.default)};
  font-family: ${({ theme }) => theme.fonts.family.sailecLight};
  margin: ${rem(10)};
  color: #9ffcf3;

  h1 {
    font-size: ${rem(30)};
    font-family: ${({ theme }) => theme.fonts.family.sailecBold};
  }

  ${minMedia.tablet} {
    margin: 0;
  }
`
