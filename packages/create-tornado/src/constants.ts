import { blue, cyan, green, lightBlue, lightGreen, lightRed } from 'kolorist'

import type { Framework } from './types'

export const FRAMEWORKS: Framework[] = [
  {
    name: 'react',
    display: 'React',
    color: cyan,
    templates: [
      {
        name: 'react-starter',
        display: 'React TypeScript Starter (React + TypeScript + antd + TailwindCSS)',
        color: blue
      }
    ]
  },
  {
    name: 'vue',
    display: 'Vue',
    color: green,
    templates: [
      {
        name: 'vue-starter',
        display: 'Vue TypeScript Starter (Vue + TypeScript + Naive UI + TailwindCSS)',
        color: green
      }
    ]
  },
  {
    name: 'next',
    display: 'Next',
    color: lightBlue,
    templates: [
      {
        name: 'next-starter',
        display: 'Next TypeScript Starter (Next + TypeScript + TailwindCSS)',
        color: lightBlue
      }
    ]
  },
  {
    name: 'nuxt',
    display: 'Nuxt',
    color: lightGreen,
    templates: [
      {
        name: 'nuxt-starter',
        display: 'Nuxt TypeScript Starter (Nuxt + TypeScript + TailwindCSS)',
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
        name: 'rspress-starter',
        display: 'Rspress Starter (Rspress + TypeScript)',
        color: lightBlue
      }
    ]
  },
  {
    name: 'nest',
    display: 'Nest',
    color: lightRed,
    templates: [
      {
        name: 'nest-starter',
        display: 'Nest TypeScript Starter (Nest + TypeScript + Prisma + PostgreSQL)',
        color: lightRed
      }
    ]
  }
]

export const TEMPLATES = FRAMEWORKS.map((f) => f.templates?.map((t) => t.name) || [f.name]).reduce(
  (a, b) => a.concat(b),
  []
)

export const DEFAULT_TARGET_DIR = 'tornado-app'
