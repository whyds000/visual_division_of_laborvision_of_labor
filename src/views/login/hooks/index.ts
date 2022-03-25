import useLoginStore from '@/store/login/login'

const useSubmit = (ruleFormRef: any, account: any) => {
  const store = useLoginStore()

  //登录
  const submitForm = (): void => {
    ruleFormRef.value?.validate(async (valid: boolean) => {
      if (valid) {
        await store.userLogin(account)
      }
    })
  }
  return submitForm
}
export default useSubmit
