import { createClient, cacheExchange, fetchExchange } from '@urql/core'
import { type ReactNode } from 'react'
import { Provider } from 'urql'

const client = createClient({
  url: 'http://localhost:8787/graphql',
  exchanges: [cacheExchange, fetchExchange],
})

const UrqlProvider = ({ children }: { children: ReactNode }) => {
  return <Provider value={client}>{children}</Provider>
}

export { UrqlProvider as default, client }
