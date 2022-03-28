import { FC } from 'react'
import { History } from 'history'
import { Router, Route, Switch, useRouteMatch } from 'react-router'
import loadable from '@loadable/component'
import { useLocationBlocker } from 'shared/utils/hooks'

const LandingPage = loadable(
  () => import(/* webpackChunkName: "landingPage" */ 'pages/LandingPage'),
)

interface IRoutesProps {
  history: History
}

const Routes: FC<IRoutesProps> = ({ history }) => {
  const { url } = useRouteMatch()
  useLocationBlocker()
  return (
    <Router history={history}>
      <main>
        <Switch>
          <Route exact path={`${url}`} component={LandingPage} />
          {/* <Route path={`${url}/${Documents}`} component={DocumentsPage} /> */}
        </Switch>
      </main>
    </Router>
  )
}

export default Routes
