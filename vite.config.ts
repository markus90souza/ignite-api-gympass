import { defineConfig } from 'vitest/config'

import vitestConfigPaths from 'vitest-tsconfig-paths'

export default defineConfig({
  plugins: [vitestConfigPaths()],
})
