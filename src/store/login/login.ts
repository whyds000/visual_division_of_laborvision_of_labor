import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import { accountLoginRequest } from '@/service/login'
import { loginPayoad } from './types'
import { ElMessage } from 'element-plus'

const useLoginStore = defineStore(
  'login',
  () => {
    const token = ref<string>()
    const name = ref<string>('卢本伟')
    const userLogin = async (loginInfo: loginPayoad) => {
      const res: any = await accountLoginRequest(loginInfo)
      if (Object.prototype.toString.call(res) === '[object Error]') {
        ElMessage.error('账号或密码错误')
      } else {
        token.value = res.data.token
        ElMessage({
          message: '欢迎登录' + '  ' + name.value + '!!!',
          type: 'success'
        })
        router.push('/main')
      }
    }

    return { name, userLogin, token }
  },
  {
    // 开启数据缓存
    persist: {
      enabled: true,
      strategies: [
        {
          storage: sessionStorage,
          paths: ['token']
        }
      ]
    }
  }
)
export default useLoginStore
