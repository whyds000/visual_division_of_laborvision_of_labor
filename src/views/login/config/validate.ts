const validateAccount = (rule: any, value: string, callback: any) => {
  const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  if (!phoneReg.test(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}
export { validateAccount }
