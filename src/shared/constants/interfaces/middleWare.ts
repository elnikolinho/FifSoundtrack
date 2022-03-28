import { Categories } from '..'

export interface IAction<P> {
  type: string
  payload: P
}

export interface IDeviceBreakpoints {
  activeBreakpoint: string
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isDesktopLarge: boolean
}

export interface IQuizState {
  totalNumberOfQuiz: number
  currentQuizNo: number
  currentQuestionCategory: Categories
}

export interface IGlobalState {
  quiz: IQuizState
  deviceBreakpoints?: IDeviceBreakpoints
}
