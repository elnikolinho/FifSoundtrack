import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  Categories,
  IGlobalState,
  IDeviceBreakpoints,
  IQuizState,
} from 'shared/constants'

export const deviceBreakpointsInitialState: IDeviceBreakpoints = {
  activeBreakpoint: '',
  isMobile: false,
  isTablet: false,
  isDesktop: false,
  isDesktopLarge: false,
}

export const quizInitialState: IQuizState = {
  totalNumberOfQuiz: 0,
  currentQuizNo: 1,
  currentQuestionCategory: Categories.PersonalDetails,
}

export const initialState: IGlobalState = {
  deviceBreakpoints: deviceBreakpointsInitialState,
  quiz: quizInitialState,
}

const globalSliceReducer = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setBreakPoint(state, action) {
      state.deviceBreakpoints = action.payload
    },
    setTotalNumberOfQuiz(state, action: PayloadAction<number>) {
      state.quiz.totalNumberOfQuiz = action.payload
    },
    setQuestionCategory(state, action: PayloadAction<Categories>) {
      state.quiz.currentQuestionCategory = action.payload
    },
  },
})

export const { setBreakPoint, setTotalNumberOfQuiz, setQuestionCategory } =
  globalSliceReducer.actions

export default globalSliceReducer.reducer
