import { fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { presetUno } from 'unocss'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      presets: [presetUno()]
    }),
    AutoImport({
      dts: './src/types/auto-import.d.ts',
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      imports: [
        'vue',
        'vue-router',
        {
          'vue-router': ['RouterLink', 'RouterView'],
          '@vueuse/core': ['useToggle', 'useEventListener', 'useDebounceFn'],
          axios: [['default', 'axios']],
          dayjs: [['default', 'dayjs']]
        },
        { from: '@/constants', imports: [] }
      ],
      dirs: ['src/api', 'src/hooks', 'src/store', 'src/tools', 'src/utils']
    }),
    Components({
      dts: './src/types/components.d.ts',
      resolvers: [],
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView']
        }
      ],
      dirs: ['src/components']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
