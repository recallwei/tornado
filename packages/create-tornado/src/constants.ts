import { blue, cyan, green, lightBlue, lightMagenta, yellow } from 'kolorist'

import type { Framework } from './types'

export const FRAMEWORKS: Framework[] = [
  {
    name: 'vue',
    display: 'Vue',
    color: green,
    templates: [
      {
        name: 'vue-ts-element-unocss',
        display: 'Vue + TypeScript + Element Plus + UnoCss',
        color: lightBlue
      },
      {
        name: 'vue-ts-naive-tailwindcss',
        display: 'Vue + TypeScript + Naive UI + TailwindCSS',
        color: green
      },
      {
        name: 'vitepress-ts-unocss',
        display: 'VitePress + TypeScript + UnoCSS',
        color: lightMagenta
      }
    ]
  },
  {
    name: 'react',
    display: 'React',
    color: cyan,
    templates: [
      {
        name: 'react-ts-antd-unocss',
        display: 'React + TypeScript + Ant Design + UnoCSS (In progress...)',
        color: blue
      },
      {
        name: 'react-ts-antd-unocss',
        display:
          'React + TypeScript + Ant Design + TailwindCSS (In progress...)',
        color: lightBlue
      },
      {
        name: 'react-ts-chakra-panda',
        display: 'React + TypeScript + Chakra UI + PandaCSS (In progress...)',
        color: yellow
      }
    ]
  }
]

export const TEMPLATES = FRAMEWORKS.map(
  (f) => (f.templates && f.templates.map((t) => t.name)) || [f.name]
).reduce((a, b) => a.concat(b), [])

export const DEFAULT_TARGET_DIR = 'tornado-project'
