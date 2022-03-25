interface Account {
  phone: string
  password: string
}
enum LoginApi {
  AccountLogin = '/login'
}
export { Account, LoginApi }
