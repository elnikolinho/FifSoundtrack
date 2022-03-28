import { IDeviceBreakpoints, IGlobalState } from 'shared/constants'
import reducer, {
  initialState,
  quizInitialState,
  setBreakPoint,
  setTotalNumberOfQuiz,
} from './global'

describe('setBreakpoint reducer', () => {
  it('should captures a dispatch to set active break point', () => {
    const mockBreakPoints: IDeviceBreakpoints = {
      activeBreakpoint: 'desktopLarge',
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isDesktopLarge: true,
    }
    expect(reducer(initialState, setBreakPoint(mockBreakPoints))).toEqual({
      ...initialState,
      deviceBreakpoints: mockBreakPoints,
    })
  })
})

describe('setTotalNumberOfQuiz reducer', () => {
  it('should set the value of totalNumberOfQuiz', () => {
    const mockTotalNumberOfQuiz = 10
    const mockState: IGlobalState = {
      ...initialState,
      quiz: {
        ...quizInitialState,
        totalNumberOfQuiz: mockTotalNumberOfQuiz,
      },
    }
    expect(
      reducer(initialState, setTotalNumberOfQuiz(mockTotalNumberOfQuiz)),
    ).toEqual(mockState)
  })
})
