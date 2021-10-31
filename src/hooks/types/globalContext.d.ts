type ContextType = {
  foo: number
  bar: number
  foobar: number
  robot: number
}
export type GlobalContextType = ContextType & {
  setContext: (context: ContextType) => void
}
