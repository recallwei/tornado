import { blue, cyan, green, yellow } from 'kolorist'

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
        color: blue
      },
      {
        name: 'vue-ts-naive-tailwindcss',
        display: 'Vue + TypeScript + Naive UI + TailwindCSS',
        color: yellow
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
        display: 'React + TypeScript + Ant Design UnoCSS',
        color: blue
      }
    ]
  }
]

export const TEMPLATES = FRAMEWORKS.map(
  (f) => (f.templates && f.templates.map((t) => t.name)) || [f.name]
).reduce((a, b) => a.concat(b), [])

export const DEFAULT_TARGET_DIR = 'tornado-project'
