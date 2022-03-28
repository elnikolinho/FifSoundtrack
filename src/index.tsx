import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch, Router } from 'react-router'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { store } from 'store'
import App from './App'

const history = createBrowserHistory()
const persistor = persistStore(store)

const render = () => {
  ReactDOM.render(
    <StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router history={history}>
            <Switch>
              <Route path={`(.html)?`}>
                <App history={history} />
              </Route>
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    </StrictMode>,
    document.getElementById('app-root'),
  )
}

if (process.env.NODE_ENV !== 'production') {
  import('react-axe').then((axe) => {
    axe.default(React, ReactDOM, 1000)
    render()
  })
} else {
  render()
}

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App', function () {
    import('react-axe').then((axe) => {
      axe.default(React, ReactDOM, 1000)
      render()
    })
  })
}
