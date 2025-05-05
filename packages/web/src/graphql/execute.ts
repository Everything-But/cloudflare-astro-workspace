import type { TypedDocumentString } from './graphql'

const execute = async <TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) => {
  try {
    const response = await fetch('http://localhost:8787/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/graphql-response+json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json() as TResult
  } catch (error) {
    return { errors: [error] }
  }
}

export { execute }
