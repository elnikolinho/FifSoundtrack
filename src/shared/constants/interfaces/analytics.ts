export interface IClickEventAction {
  data: any
  eventName: string
}

export interface IClickEventDataProps {
  linkName: string
  linkEvent?: string
  buttonText?: string
  pageName?: string
}

export interface IPageLoadDataParams {
  pagePath: string
  [propName: string]: string
}

export interface IPageLoadData {
  pagePath: string
  pageURL: string
  [propName: string]: string
}
