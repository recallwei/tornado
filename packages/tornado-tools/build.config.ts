import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/'],
  outDir: 'dist',
  clean: true,
  rollup: {
    inlineDependencies: true,
    esbuild: {
      target: 'node18',
      minify: true
    }
  },
  alias: {
    prompts: 'prompts/lib/index.js'
  }
})
