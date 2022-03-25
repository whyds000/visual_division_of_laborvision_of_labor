import { rlRequest as request } from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import cache from '@/utils/cache'
const rlRequest = new request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = cache.getCache('token')
      if (token) {
        if (config.headers) {
          config.headers.Authorization = token
        }
      }

      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (data) => {
      return data
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})
export { rlRequest }
