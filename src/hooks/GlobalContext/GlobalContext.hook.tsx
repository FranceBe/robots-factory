import { defaultContext } from 'hooks/GlobalContext/globalContext.variables'
import { GlobalContextType } from 'hooks/types/globalContext'
import { createContext, useContext } from 'react'

export const GlobalContext = createContext<GlobalContextType>(defaultContext)
export const useGlobalContext = () => useContext(GlobalContext)