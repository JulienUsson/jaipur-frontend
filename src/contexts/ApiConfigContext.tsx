import React, { ReactNode, useContext, useEffect, useMemo, useState } from 'react'

import { Configuration, GameApi } from '../api'

type ConfigContext = [Configuration, (configuration: Configuration) => void]
const BASE_PATH_KEY = 'BASE_PATH'

export const ApiConfigContext = React.createContext<ConfigContext>([
  new Configuration(),
  (_configuration: Configuration) => {},
])

export function useApiConfig() {
  return useContext(ApiConfigContext)
}

export function useGameApi() {
  const [config] = useApiConfig()
  return useMemo(() => new GameApi(config), [config])
}

export function ApiConfigProvider({ children }: { children: ReactNode }) {
  const state = useState<Configuration>(() => {
    const storedBasePAth = localStorage.getItem(BASE_PATH_KEY)
    if (storedBasePAth) {
      return new Configuration({ basePath: storedBasePAth })
    } else {
      return new Configuration()
    }
  })

  useEffect(() => {
    const basePath = state[0].basePath
    localStorage.setItem(BASE_PATH_KEY, basePath)
  }, [state])

  return <ApiConfigContext.Provider value={state}>{children}</ApiConfigContext.Provider>
}
