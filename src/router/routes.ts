import type { RouteRecordRaw } from 'vue-router'

import login from './login/login'
import main from './main/main'
import notFound from './not-found/not-found'
import useAddRoute from './useAddRoutes'
useAddRoute(main)
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  login,
  main,
  notFound
]

export default routes
