import { ThemeProvider } from 'styled-components'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'

import defaultTheme from 'shared/styles/theme.styles'
import Routes from './index'

const mockDispatch = jest.fn()
const mockSelector = jest.fn()
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector,
}))

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useRouteMatch: () => ({ url: '/join' }),
  useLocation: () => ({ pathname: '/join' }),
}))

test('Routes renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <ThemeProvider theme={defaultTheme}>
      <Routes history={createBrowserHistory()} />
    </ThemeProvider>,
    div,
  )
  ReactDOM.unmountComponentAtNode(div)
})
