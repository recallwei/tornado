import { blue, cyan, green, lightBlue, lightGreen } from 'kolorist'

import type { Framework } from './types'

export const FRAMEWORKS: Framework[] = [
  {
    name: 'vue',
    display: 'Vue',
    color: green,
    templates: [
      {
        name: 'vue-ts-starter-template',
        display:
          'Vue TypeScript Starter Template (Vue + TypeScript + Naive UI + TailwindCSS)',
        color: green
      }
    ]
  },
  {
    name: 'react',
    display: 'React',
    color: cyan,
    templates: [
      {
        name: 'react-ts-starter-template',
        display:
          'React TypeScript Starter Template (React + TypeScript + antd + TailwindCSS)',
        color: blue
      }
    ]
  },
  {
    name: 'nuxt',
    display: 'Nuxt',
    color: lightGreen,
    templates: [
      {
        name: 'nuxt-ts-starter-template',
        display:
          'Nuxt TypeScript Starter Template (Nuxt + TypeScript + TailwindCSS)',
        color: lightGreen
      }
    ]
  },
  {
    name: 'rspress',
    display: 'Rspress',
    color: lightBlue,
    templates: [
      {
        name: 'rspress-starter-template',
        display: 'Rspress Starter Template (Rspress + TypeScript)',
        color: lightBlue
      }
    ]
  }
]

export const TEMPLATES = FRAMEWORKS.map(
  (f) => f.templates?.map((t) => t.name) || [f.name]
).reduce((a, b) => a.concat(b), [])

export const DEFAULT_TARGET_DIR = 'tornado-app'
