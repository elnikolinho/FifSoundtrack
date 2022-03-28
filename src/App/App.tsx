import { useEffect, FC } from 'react'
import { StylesProvider } from '@material-ui/core/styles'
import { ThemeProvider } from 'styled-components'
import { History } from 'history'
import Routes from 'routes'
import debounce from 'lodash/debounce'
import { setBreakPoint } from 'shared/reducers/global'
import { useAppDispatch } from 'store/hooks'
import GlobalStyles from 'shared/styles/global.styles'
import defaultTheme from 'shared/styles/theme.styles'
import { setDevice } from 'shared/utils/helpers'

interface IAppProps {
  history: History
}

const App: FC<IAppProps> = ({ history }) => {
  const dispatch = useAppDispatch()

  // Breakpoints
  useEffect(() => {
    const updateActiveBreakpoint = () => {
      dispatch(setBreakPoint(setDevice()))
    }
    updateActiveBreakpoint()

    // set breakpoint when device resizes
    window.addEventListener('resize', debounce(updateActiveBreakpoint, 200))

    // Fix android resize bug when it doesn't change the header views when
    // orientation is changed
    window.addEventListener(
      'orientationchange',
      debounce(updateActiveBreakpoint, 200),
      false,
    )
  }, [dispatch])

  return (
    // Using injectFirst: https://material-ui.com/styles/advanced/#css-injection-order
    <StylesProvider injectFirst>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <Routes history={history} />
      </ThemeProvider>
    </StylesProvider>
  )
}

export default App
