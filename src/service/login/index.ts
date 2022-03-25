import { rlRequest } from '@/service'
import { Account, LoginApi } from './types'
const accountLoginRequest = (account: Account) => {
  return rlRequest.post({
    url: LoginApi.AccountLogin,
    data: account
  })
}
export { accountLoginRequest }
