/*
 * Shared redux selectors
 */
import { createSelector } from '@reduxjs/toolkit'

import { IApplicationState } from 'store/interfaces'
import { Categories } from 'shared/constants'

const globalSelector = (state: IApplicationState) => state.global

const getActiveBreakpoint = createSelector(
  [globalSelector],
  ({ deviceBreakpoints }) => deviceBreakpoints!,
)

const quizSelector = (state: IApplicationState) => state.global.quiz

const getTotalNumberOfQuiz = createSelector(
  [quizSelector],
  ({ totalNumberOfQuiz }): number => totalNumberOfQuiz,
)

const getCurrentQuizNo = createSelector(
  [quizSelector],
  ({ currentQuizNo }): number => currentQuizNo,
)

const getQuestionCategory = createSelector(
  [quizSelector],
  ({ currentQuestionCategory }): Categories => currentQuestionCategory,
)

const selectors = {
  getActiveBreakpoint,
  getTotalNumberOfQuiz,
  getCurrentQuizNo,
  getQuestionCategory,
}

export { selectors }
