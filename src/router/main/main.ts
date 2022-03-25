import { Iroute } from '../types/types'
const main: Iroute = {
  path: '/main',
  name: 'main',
  component: () => import('@/views/main/main.vue'),
  children: []
}

export default main
