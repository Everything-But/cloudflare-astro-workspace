// import type { CodegenConfig } from '@graphql-codegen/cli'

// const config: CodegenConfig = {
//   schema: 'http://localhost:8787/graphql',
//   documents: ['src/**/*.tsx'],
//   ignoreNoDocuments: true,
//   generates: {
//     './src/graphql/': {
//       preset: 'client',
//       config: {
//         documentMode: 'string',
//         useTypeImports: true,
//       },
//     },
//     './schema.graphql': {
//       plugins: ['schema-ast'],
//       config: {
//         includeDirectives: true,
//       },
//     },
//   },
// }

// export default config

// -----------------------------------    urql    ------------------------------------------------------------

import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:8787/graphql',
  documents: ['src/**/*.tsx'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/gql/': {
      config: {
        useTypeImports: true,
      },
      preset: 'client',
      plugins: [],
    },
  },
}

export default config
