interface Iroute {
  path: string
  name: string
  component: () => Promise<typeof import('*.vue')>
  children?: Iroute[]
}
export { Iroute }
