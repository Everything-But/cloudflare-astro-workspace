import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files'
import type { CodegenConfig } from '@graphql-codegen/cli'

// (1)
const config: CodegenConfig = {
  schema: 'src/graphql/schema/**/schema.graphql', // (2)
  generates: {
    'src/graphql/schema': defineConfig({
      // (3)
      resolverGeneration: 'minimal', // (4)
    }),
  },
}
export default config
