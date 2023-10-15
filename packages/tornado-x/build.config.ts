import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/index'],
  outDir: 'dist',
  clean: true,
  rollup: {
    inlineDependencies: true,
    esbuild: {
      target: 'node18',
      minify: true
    },
    emitCJS: true,
    cjsBridge: true
  },
  alias: {
    prompts: 'prompts/lib/index.js'
  }
})
