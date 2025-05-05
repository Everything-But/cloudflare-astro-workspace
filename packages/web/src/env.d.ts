type EventEntrypoint = import('../../api/src/index').EventEntrypoint
type UserEntrypoint = import('../../api/src/index').UserEntrypoint
type Runtime = import('@astrojs/cloudflare').Runtime<{ EVENT: Service<EventEntrypoint>; USER: Service<UserEntrypoint> }>

declare namespace App {
  interface Locals extends Runtime {}
}

declare module '*.gql' {
  const content: string
  export default content
}

declare module '*.graphql' {
  const content: string
  export default content
}
