import { GlobalStyle } from '../src/styles/global-styles'
import { withReactContext } from 'storybook-react-context'
import React from 'react'

export const decorators = [
  withReactContext,
  (Story) => (
    <>
      <GlobalStyle />
      <Story />
    </>
  ),
]
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
