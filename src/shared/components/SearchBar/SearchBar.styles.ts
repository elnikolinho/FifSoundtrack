import styled from 'styled-components'

export const SearchWrapper = styled.div`
  margin: 6rem;
`

export const SearchInput = styled.div`
  background-color: #fc9fe3;
  display: flex;

  input {
    border: 0;
    border-radius: 2px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    font-size: 18px;
    padding: 15px;
    height: 50px;
    width: 300px;

    &:focus {
      outline: #fc9fe3 auto 1px;
    }
  }
`

export const SearchResults = styled.div`
  background-color: #fc9fe3;
  margin-top: 5px;
  width: 300px;
  height: 200px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  overflow: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const SearchItem = styled.a`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  color: black;

  p {
    margin-left: 15px;
  }

  &:hover {
    background-color: lightgrey;
  }
`

export const SearchIconStyled = styled.div`
  height: 50px;
  width: 50px;
  background-color: white;
  display: grid;
  place-items: center;

  svg {
    height: 35px;
  }
`
