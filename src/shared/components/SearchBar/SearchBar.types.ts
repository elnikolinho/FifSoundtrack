export interface ISearchBarProps {
  data?: string
  placeholder?: string
  id?: string
}

export interface ISearchItem {
  author: string
  country: string
  imageLink: string
  language: string
  link: string
  pages: number
  title: string
  year: number
}
