type ContextType = {
  foo: number
  bar: number
  foobar: number
  robots: number
}
export type GlobalContextType = ContextType & {
  setContext: (context: ContextType) => void
}
