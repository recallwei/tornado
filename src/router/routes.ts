import { siteMetaData } from '@/constants'

const { AppName } = siteMetaData

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home'),
    meta: {
      title: AppName
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/Signup'),
    meta: {
      title: 'signup'
    }
  },
  {
    path: '/403',
    name: 'forbidden',
    component: () => import('@/views/Forbidden'),
    meta: {
      title: '403'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound'),
    meta: {
      title: '404'
    }
  }
]
