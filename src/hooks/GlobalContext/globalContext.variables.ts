import { ContextType, GlobalContextType } from 'hooks/types/globalContext'

export const defaultContextValues: ContextType = {
  bar: 0,
  foo: 0,
  foobar: 0,
  robot: 2,
}

export const defaultContext: GlobalContextType = {
  ...defaultContextValues,
  setContext: () => {
    // set Context
  },
}
