import { FC, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'

import SearchData from 'shared/constants/data.json'
import {
  SearchWrapper,
  SearchInput,
  SearchResults,
  SearchIconStyled,
  SearchItem,
} from './SearchBar.styles'
import { ISearchBarProps, ISearchItem } from './SearchBar.types'

const SearchBar: FC<ISearchBarProps> = ({ placeholder, data, id }) => {
  const [filteredData, setFilteredData] = useState([] as any)
  const [wordEntered, setWordEntered] = useState('')

  const handleFilter = (event) => {
    const searchWord = event.target.value
    setWordEntered(searchWord)
    const newFilter: ISearchItem[] = SearchData.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase())
    })

    if (searchWord === '') {
      setFilteredData([])
    } else {
      setFilteredData(newFilter)
    }
  }

  const resetFilter = () => {
    setFilteredData([])
    setWordEntered('')
  }
  return (
    <SearchWrapper>
      <SearchInput>
        <input
          placeholder={placeholder}
          type="text"
          onChange={(e) => handleFilter(e)}
          value={wordEntered}
        />
        <SearchIconStyled>
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon onClick={() => resetFilter()} />
          )}
        </SearchIconStyled>
      </SearchInput>
      {filteredData.length !== 0 && (
        <SearchResults id={id}>
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <SearchItem key={key} href={value.link} target="_blank">
                <p>{value.title}</p>
              </SearchItem>
            )
          })}
        </SearchResults>
      )}
    </SearchWrapper>
  )
}

export default SearchBar
