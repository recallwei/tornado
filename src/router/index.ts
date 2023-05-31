import NProgress from 'nprogress'
import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'

import { siteMetaData } from '@/constants'

import { routes } from './routes'

NProgress.configure({ showSpinner: false })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const processTargetRoute = (to: RouteLocationNormalized) => {
  const { AppName } = siteMetaData
  document.title = to.path === '/' ? AppName : `${to.meta.title} - ${AppName}` // Change the title of the document
}

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }
  processTargetRoute(to)
  next()
})
router.afterEach(() => NProgress.done())

export default router
