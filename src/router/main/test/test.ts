import { Iroute } from '@/router/types/types'
const test: Iroute = {
  path: '/main/test',
  name: 'test',
  component: () => import('@/views/main/main.vue'),
  children: []
}

export default test
