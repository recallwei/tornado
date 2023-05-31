import { siteMetaData } from '@/constants'

const { AppName } = siteMetaData

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home'),
    meta: { title: AppName }
  }
]
