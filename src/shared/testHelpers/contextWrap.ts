import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import { shallow, mount } from 'enzyme'
import { shape } from 'prop-types'

const browserRouter: Router = new Router({ history: createBrowserHistory() })

const router = {
  history: browserRouter,
  route: {
    location: {},
    match: {},
  },
}

const createContext = () => ({
  context: { router },
  childContextTypes: { router: shape({}) },
})

export function mountWrap(node: JSX.Element) {
  return mount(node, createContext())
}

export function shallowWrap(node: JSX.Element) {
  return shallow(node, createContext())
}
