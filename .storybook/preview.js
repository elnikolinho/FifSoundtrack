import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { StylesProvider } from '@material-ui/styles'
import { ThemeProvider } from 'styled-components'

import { store } from '../src/store'

import GlobalStyles from '../src/shared/styles/global.styles'
import defaultTheme from '../src/shared/styles/theme.styles'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'purple',
        value: '#7127e0',
      },
      {
        name: 'white',
        value: '#ffffff',
      },
      {
        name: 'grey',
        value: '#f8f8f8',
      },
    ],
  },
}

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <BrowserRouter>
        <StylesProvider injectFirst>
          <ThemeProvider theme={defaultTheme}>
            <GlobalStyles />
            <Story />
          </ThemeProvider>
        </StylesProvider>
      </BrowserRouter>
    </Provider>
  ),
]
