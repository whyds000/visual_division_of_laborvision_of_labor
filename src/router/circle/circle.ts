import { Iroute } from '@/router/types/types'
const circle: Iroute = {
  path: '/circle',
  name: 'circle',
  component: () => import('@/views/circle/circle.vue'),
  children: []
}

export default circle
