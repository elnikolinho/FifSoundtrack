import { initialAppState } from 'store/mockAppState'
import {
  initialState as initialGlobalState,
  quizInitialState,
} from '../reducers/global'
import { IApplicationState } from 'store/interfaces'
import { selectors } from '.'

describe('getTotalNumberOfQuiz Selector', () => {
  it('should return value of totalNumberOfQuiz', () => {
    const mockTotalNumberOfQuiz = 10
    const mockAppState: IApplicationState = {
      ...initialAppState,
      global: {
        ...initialGlobalState,
        quiz: {
          ...quizInitialState,
          totalNumberOfQuiz: mockTotalNumberOfQuiz,
        },
      },
    }
    const totalNumberOfQuiz: number =
      selectors.getTotalNumberOfQuiz(mockAppState)
    expect(totalNumberOfQuiz).toEqual(mockTotalNumberOfQuiz)
  })
})

describe('getCurrentQuizNo Selector', () => {
  it('should return value of currentQuizNo', () => {
    const mockCurrentQuizNo = 5
    const mockAppState: IApplicationState = {
      ...initialAppState,
      global: {
        ...initialGlobalState,
        quiz: {
          ...quizInitialState,
          currentQuizNo: mockCurrentQuizNo,
        },
      },
    }
    const currentQuizNo: number = selectors.getCurrentQuizNo(mockAppState)
    expect(currentQuizNo).toEqual(mockCurrentQuizNo)
  })
})
