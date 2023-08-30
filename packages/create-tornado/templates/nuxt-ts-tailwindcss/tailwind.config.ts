import { getIconCollections, iconsPlugin } from '@egoist/tailwindcss-icons'
import type { Config } from 'tailwindcss'

const DEFAULT_FONTS =
  'system-ui, -apple-system, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif'

export default <Partial<Config>>{
  // content: ['content/**/*.md'], // NOTE: Enable this when using Nuxt Content.
  theme: {
    extend: {
      fontFamily: {
        default: [DEFAULT_FONTS]
      },
      textColor: {
        muted: '#999999'
      }
    }
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(['mdi', 'line-md'])
    })
  ],
  darkMode: ['class', '[data-theme="dark"]']
}
