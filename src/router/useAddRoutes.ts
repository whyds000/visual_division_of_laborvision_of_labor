import { Iroute } from './types/types'

const useAddRoute = (route: Iroute) => {
  const routeFiles = import.meta.globEager('./main/**/*.ts')

  for (let key in routeFiles) {
    if (key === './main/main.ts') {
      delete routeFiles[key]
    }
  }

  Object.values(routeFiles).forEach((it) => {
    route.children!.push(it.default)
  })
  console.log(route)
}
export default useAddRoute
