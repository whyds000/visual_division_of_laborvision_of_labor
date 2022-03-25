import { validateAccount } from './validate'
const rules = {
  phone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    {
      validator: validateAccount,
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 18,
      message: '请输入6到18位的密码',
      trigger: 'blur'
    }
  ]
}
export default rules
